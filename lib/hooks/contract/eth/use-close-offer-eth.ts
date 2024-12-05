import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useDataApiTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useChainSendTx } from "@/lib/hooks/contract/help/use-chain-send-tx";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { dataApiFetcher } from "@/lib/fetcher";
import { useGasEth } from "../help/use-gas-eth";
import { useCheckBnbBalance } from "@/lib/hooks/api/use-check-bnb-balance";
export function useCloseOfferEth({ chain }: { chain: ChainType }) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx(chain);
  const { ApiCallGas } = useGasEth();
  const { checkBalance } = useCheckBnbBalance();
  const txAction = async (args: { offerId: string }) => {
    const { offerId } = args;
    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/cancel?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      },
    );

    if (!res.tx_data) {
      throw new Error("Invalid transaction data");
      return null;
    }
    if (!checkBalance("0", String(ApiCallGas.gasPrice))) {
      throw new Error("Insufficient Balance");
    }

    const callParams = {
      ...res.tx_data,
      ...ApiCallGas,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await submitTransaction({
      chain,
      txHash,
      txType: "closeOffer",
      txData: null,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
