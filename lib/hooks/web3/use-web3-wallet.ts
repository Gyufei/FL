import { useCallback } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export function useWeb3Wallet() {
  const { openConnectModal: connectWallet } = useConnectModal();

  const toConnectWallet = useCallback(() => {
    // reportEvent("click", { value: "toConnectWallet" });
    if (connectWallet) {
      connectWallet();
    }
  }, [connectWallet]);

  return {
    toConnectWallet,
  };
}
