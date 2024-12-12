import { ChainType } from "@/lib/types/chain";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";
import { useMemo } from "react";
import { useSendTransaction } from "wagmi";

export function useChainSendTx(chain: ChainType) {
  const { sendTransactionAsync } = useSendTransaction();
  const { buildTransaction } = useBuildTransactionSol();

  const sendTx: any = useMemo(() => {
    if (chain === ChainType.ETH || chain === ChainType.BNB) {
      return sendTransactionAsync;
    }

    if (chain === ChainType.SOLANA) {
      return buildTransaction;
    }

    return sendTransactionAsync;
  }, [chain, buildTransaction, sendTransactionAsync]);

  return {
    sendTx,
  };
}
