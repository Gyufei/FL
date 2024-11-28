import { useCallback, useEffect } from "react";
import { ChainType } from "@/lib/types/chain";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useTranslations } from "next-intl";

export function useWeb3Wallet() {
  const { openConnectModal: connectWallet, connectModalOpen } =
    useConnectModal();
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);
  const T = useTranslations("Header");

  useEffect(() => {
    let timer: any;
    if (connectModalOpen) {
      timer = setTimeout(() => {
        setGlobalMessage({
          type: "warning",
          message: T("btn-ConnectWalletConfirmWarning"),
          bottom: "30%",
          duration: 3000000,
          zIndex: 999999999999,
        });
      }, 60000);
    } else {
      setGlobalMessage(null);
    }
    return () => clearTimeout(timer);
  }, [connectModalOpen]);

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
