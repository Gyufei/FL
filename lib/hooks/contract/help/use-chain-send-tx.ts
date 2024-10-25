import { ChainType } from "@/lib/types/chain";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useSendTransaction } from "wagmi";

export function useChainSendTx(chain: ChainType) {
  const { sendTransactionAsync } = useSendTransaction();
  const { sendTransaction } = useWallet();

  const sendTx: any = useMemo(() => {
    if (chain === ChainType.ETH || chain === ChainType.BNB) {
      return sendTransactionAsync;
    }

    if (chain === ChainType.SOLANA) {
      return sendTransaction;
    }

    return sendTransactionAsync;
  }, [chain, sendTransaction, sendTransactionAsync]);

  return {
    sendTx,
  };
}
