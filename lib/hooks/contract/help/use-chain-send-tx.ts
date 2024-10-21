import { ChainType } from "@/lib/types/chain";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useWriteContract } from "wagmi";

export function useChainSendTx(chain: ChainType) {
  const { writeContractAsync } = useWriteContract();
  const { sendTransaction } = useWallet();

  const sendTx: any = useMemo(() => {
    if (chain === ChainType.ETH || chain === ChainType.BNB) {
      return writeContractAsync;
    }

    if (chain === ChainType.SOLANA) {
      return sendTransaction;
    }

    return writeContractAsync;
  }, [chain, sendTransaction, writeContractAsync]);

  return {
    sendTx,
  };
}
