import { ISettleMode } from "@/lib/types/offer";
import { useChainSendTx } from "./help/use-chain-send-tx";
import { useEndPoint } from "../api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import { useDataApiTransactionRecord } from "../api/use-transactionRecord";
import useTxStatus from "./help/use-tx-status";
import { useChainWallet } from "../web3/use-chain-wallet";
import { ChainType } from "@/lib/types/chain";

export function useCreateOffer(marketSymbol: string, chain: ChainType) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const { address } = useChainWallet();

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

    console.log("create offer api res:", res);

    const callParams = {
      ...res,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await submitTransaction({
      chain,
      txHash,
      txType: "createOffer",
      txData: reqData,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
