import { useCallback } from "react";
import { ChainType } from "@/lib/types/chain";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export function useWeb3Wallet() {
  const { openConnectModal: connectWallet } = useConnectModal();

  const toConnectWallet = useCallback(
    (chain?: ChainType) => {
      console.log(chain);
      if (connectWallet) {
        connectWallet();
      }
    },
    [connectWallet],
  );

  return {
    toConnectWallet,
  };
}
