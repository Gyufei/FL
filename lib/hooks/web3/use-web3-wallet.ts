import { useCallback, useEffect } from "react";
import { ChainType } from "@/lib/types/chain";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useTranslations } from "next-intl";
import { reportEvent } from "@/lib/utils/analytics";

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
          duration: 60000,
          zIndex: 999999999999,
        });
        reportEvent("connectWalletFail", { value: "longTime" });
      }, 90000);
    } else {
      setGlobalMessage(null);
    }
    return () => {
      clearTimeout(timer);
      setGlobalMessage(null);
    };
  }, [connectModalOpen]);

  const toConnectWallet = useCallback(
    (chain?: ChainType) => {
      console.log(chain);
      // reportEvent("click", { value: "toConnectWallet" });
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
