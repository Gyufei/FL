import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "../api/use-endpoint";
import { useDataApiTransactionRecord } from "../api/use-transactionRecord";
import { useChainSendTx } from "./help/use-chain-send-tx";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "./help/use-tx-status";

export function useList(chain: ChainType) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const txAction = async (args: {
    price: string;
    totalItemAmount: string;
    entryIds: Array<string>;
  }) => {
    const { price, totalItemAmount, entryIds } = args;
    const reqData = {
      price,
      total_item_amount: totalItemAmount,
      entry_ids: entryIds,
    };
    const res = await dataApiFetcher(`${dataApiEndPoint}/holding/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    const callParams = {
      ...res,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await submitTransaction({
      chain,
      txHash,
      txType: "list",
      txData: reqData,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
