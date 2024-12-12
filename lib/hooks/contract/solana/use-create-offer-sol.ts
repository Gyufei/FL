import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { ISettleMode } from "@/lib/types/offer";
import { useChainSendTx } from "../help/use-chain-send-tx";
import { useEndPoint } from "../../api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import { useDataApiTransactionRecord } from "../../api/use-transactionRecord";
import { useChainWallet } from "../../web3/use-chain-wallet";
// import { useGasEth } from "../help/use-gas-eth";
import { ChainType } from "@/lib/types/chain";
import { useConnection } from "@solana/wallet-adapter-react";

import { VersionedMessage } from "@solana/web3.js";

export function useCreateOfferSol({
  marketSymbol,
  chain,
}: {
  marketSymbol: string;
  chain: ChainType;
}) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);
  // const { ApiCallGas } = useGasEth();

  const { address } = useChainWallet(chain);
  const { connection } = useConnection();

  const txAction = async (args: {
    direction: "buy" | "sell";
    price: string;
    total_item_amount: number;
    payment_token: string;
    collateral_ratio: number;
    settle_mode: ISettleMode;
    trade_tax_pct: number;
  }) => {
    const reqData = {
      ...args,
      creator: address,
    };
    const res = await dataApiFetcher(
      `${dataApiEndPoint}/market/${marketSymbol}/create_offer?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    // if (!res.tx_data) {
    //   throw new Error("Invalid transaction data");
    //   return null;
    // }

    const resData =
      "02010712bb238bed6d923d8aca39d1d60061579bddcfb45b65862f2831311db07c4b0110380dd7d125821607b306e38c4cb761b1404ae57f6dbaf4681900cf0a768ea41c079e5f8b198291a499a76eefb4bf5f7014c2908169084c2b1baa427bee7cfbc92706109bffb0f760d09c1b7e440ed9790b81575386ecc40a2595856409b7b96d4792cc315b5e5aebccd2a8a6589de33cbdc57b3596b7aecdfd4d63783b7118b87ebfb983b2cf0ffd16a5601099ac6777ec5d62f3f973b8deb4535fc358157ec8a0809623ad0480ecc9ff2736c4eaa81139ffb3c26d1b9caf849d7793be412466a8b8fdf15e521b8c173039a055fc98d342af805e6b36da037ffd97d5ffd8d8c6c486d2243414601f5a2102b2d317c78e5486f104c3124a3ec9aba8badd962005df52fd84fe4c0de000bea123e05cbfc57c154bac2396c9606577924d184bfe06fed853c1c48314b8244f5d61c4122c01d5e851a0cea7039121e29e5f8192502e000000000000000000000000000000000000000000000000000000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a906ddf6e1ee758fde18425dbce46ccddab61afc4d83b90d27febdf928d8a18bfc072e2ebc0a17835adf1a063d4ed2d92905a36b895c11faced6ecd55c00b4cd731c90eb348e64da57ea735006ecd161b7344a198328e252b2be74925d56e57e188c97258f4e2489f1bb3d1029148e0d830b5a1399daff1084048e7bd8dbe9f859bae2db8ac6b6dd04756905b6bdf31821258e7c54d681ec697907ab6c956afd700000000000000000000000000000000000000000000000000000000000000000010e1100010f05090411060c0d100b070a0203082aede9c0a8f807f9f1e8030000000000008096980000000000102700000000000000000000000000000000";

    const versionedMessage = VersionedMessage.deserialize(
      Uint8Array.from(Buffer.from(resData, "hex")),
    );
    console.log("🚀 ~ versionedMessage:", versionedMessage);

    const callParams = {
      ...res.tx_data,
      data: resData,
      // ...ApiCallGas,
    };

    const txHash = await sendTx(callParams);

    await submitTransaction({
      chain,
      txHash,
      txType: "createOffer",
      txData: {
        wallet: reqData.creator,
        market_symbol: marketSymbol,
        total_item_amount: reqData.total_item_amount,
      },
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
