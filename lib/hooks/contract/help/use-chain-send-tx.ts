import { ChainConfigs } from "@/lib/const/chain-config";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useWriteContract } from "wagmi";

export function useChainSendTx(chain: string) {
  const { writeContractAsync } = useWriteContract();
  const { sendTransaction } = useWallet();

  const sendTx: any = useMemo(() => {
    if (chain === ChainConfigs.eth.alias || chain === ChainConfigs.bnb.alias) {
      return writeContractAsync;
    }

    if (chain === ChainConfigs.solana.alias) {
      return sendTransaction;
    }

    return writeContractAsync;
  }, [chain, sendTransaction, writeContractAsync]);

  return {
    sendTx,
  };
}
