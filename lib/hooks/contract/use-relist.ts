import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "../api/use-endpoint";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useChainSendTx } from "./help/use-chain-send-tx";
import fetcher from "@/lib/fetcher";
import useTxStatus from "./help/use-tx-status";

export function useRelist(chain: ChainType) {
  const { recordTransaction } = useTransactionRecord();
  const { apiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const txAction = async (args: {
    price: string;
    totalItemAmount: string;
    entryIds: Array<string>;
  }) => {
    const { price, totalItemAmount, entryIds } = args;
    const res = await fetcher(`${apiEndPoint}/holding/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        total_item_amount: totalItemAmount,
        entry_ids: entryIds,
      }),
    });

    const callParams = {
      ...res,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
