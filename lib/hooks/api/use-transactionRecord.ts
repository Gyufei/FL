import { Paths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import fetcher from "@/lib/fetcher";

export interface IAddParams {
  tx_hash: string;
  transaction_note: string;
}

export function useTransactionRecord() {
  const { apiEndPoint } = useEndPoint();

  function parsedAddParams({ txHash, note }: { txHash: string; note: string }) {
    return {
      tx_hash: txHash,
      transaction_note: note,
    } as IAddParams;
  }

  async function addTransaction(transactionParams: IAddParams) {
    const addResult = await fetcher(`${apiEndPoint}${Paths.addTransaction}`, {
      method: "post",
      body: JSON.stringify(transactionParams),
    });

    return addResult;
  }

  async function recordTransaction({
    txHash,
    note,
  }: {
    txHash: string;
    note: string;
  }) {
    const addParams = parsedAddParams({
      txHash,
      note,
    });

    await addTransaction(addParams);

    return true;
  }

  return {
    recordTransaction,
  };
}
