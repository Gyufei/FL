import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useDataApiTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useChainSendTx } from "@/lib/hooks/contract/help/use-chain-send-tx";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { dataApiFetcher } from "@/lib/fetcher";

export function useAbortOrderAsTakerEth({ chain }: { chain: ChainType }) {
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
      ...res.tx_data,
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
