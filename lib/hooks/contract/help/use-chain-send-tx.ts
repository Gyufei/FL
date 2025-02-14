import { ChainType } from "@/lib/types/chain";
import { useMemo } from "react";
import { useSendTransaction } from "wagmi";

export function useChainSendTx(chain: ChainType) {
  const { sendTransactionAsync } = useSendTransaction();

  const sendTx: any = useMemo(() => {
    if (chain === ChainType.ETH || chain === ChainType.BNB) {
      return sendTransactionAsync;
    }

    return sendTransactionAsync;
  }, [chain, sendTransactionAsync]);

  return {
    sendTx,
  };
}
