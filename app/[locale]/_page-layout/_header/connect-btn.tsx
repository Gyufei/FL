"use client";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { usePrivyWallet } from "@/lib/hooks/web3/use-privy-wallet";
import { useState } from "react";
import ConnectInfoDrawer from "./connect-info-drawer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConnectBtn() {
  const t = useTranslations("Header");

  const { toConnectWallet } = usePrivyWallet();
  const { connected } = useChainWallet();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!connected) {
    return (
      <>
        <button
          className="shadow-25 h-10 rounded-full bg-[#f0f1f5] px-4 text-base leading-6 transition-all sm:h-12 sm:px-[22px]"
          onClick={() => toConnectWallet()}
        >
          <span className="hidden sm:inline-block">
            {t("btn-ConnectWallet")}
          </span>
          <span className="inline-block sm:hidden">{t("btn-Connect")}</span>
        </button>
      </>
    );
  }

  return (
    <>
      <ConnectInfoDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
