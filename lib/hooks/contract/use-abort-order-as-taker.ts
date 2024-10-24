import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "../api/use-endpoint";
import { useDataApiTransactionRecord } from "../api/use-transactionRecord";
import { useChainSendTx } from "./help/use-chain-send-tx";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "./help/use-tx-status";

export function useAbortOrderAsTaker(chain: ChainType) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);

  const txAction = async (args: { offerId: string }) => {
    const { offerId } = args;
    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/confirm_abort?chain=${chain}`,
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

    await submitTransaction({
      chain,
      txHash,
      txType: "abortOrderAsTaker",
      txData: null,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
