import { ChainType } from "@/lib/types/chain";
import { useDataApiTransactionRecord } from "../api/use-transactionRecord";
import { useEndPoint } from "../api/use-endpoint";
import { useChainSendTx } from "./help/use-chain-send-tx";
import { useChainWallet } from "../web3/use-chain-wallet";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import useTxStatus from "./help/use-tx-status";

export function useWithdrawToken(chain: ChainType) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const { address } = useChainWallet();

  const txAction = async (args: {
    token_symbol: string;
    token_balance_type: string;
  }) => {
    const reqData = {
      wallet: address,
      ...args,
    };

    const res = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.accountWithdraw}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    const callParams = {
      ...res,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await submitTransaction({
      chain,
      txHash,
      txType: "withdraw",
      txData: reqData,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
