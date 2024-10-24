import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "../api/use-endpoint";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useChainSendTx } from "./help/use-chain-send-tx";
import fetcher from "@/lib/fetcher";
import useTxStatus from "./help/use-tx-status";

export function useAbortOrderAsTaker(chain: ChainType) {
  const { recordTransaction } = useTransactionRecord();
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const txAction = async (args: { offerId: string }) => {
    const { offerId } = args;
    const res = await fetcher(
      `${apiEndPoint}/offer/${offerId}/confirm_abort?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
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
