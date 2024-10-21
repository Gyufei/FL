import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "../api/use-endpoint";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useChainSendTx } from "./help/use-chain-send-tx";
import fetcher from "@/lib/fetcher";
import useTxStatus from "./help/use-tx-status";

export function useCreateTakerOrder(chain: ChainType) {
  const { recordTransaction } = useTransactionRecord();
  const { apiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const txAction = async (args: { offerId: string; itemAmount: string }) => {
    const { offerId, itemAmount } = args;
    const res = await fetcher(
      `${apiEndPoint}/offer/${offerId}/take?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_amount: itemAmount,
        }),
      },
    );

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
