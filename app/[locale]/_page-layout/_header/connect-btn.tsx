"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useWeb3Wallet } from "@/lib/hooks/web3/use-web3-wallet";
import { useState } from "react";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConnectBtn() {
  const t = useTranslations("Header");

  const { isMobile } = useDeviceSize();
  const { toConnectWallet } = useWeb3Wallet();
  // TODO: Connect To get all wallet info;
  const { shortAddr, connected, connecting } = useChainWallet();
  const [showSignIn, setShowSignIn] = useState(false);

  function handleConnect() {
    if (connected) {
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
      toConnectWallet();
    }
  }

  if (!connected) {
    if (isMobile) {
      return (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d3d4d6] bg-white "
          onClick={() => handleConnect()}
        >
          <Image src="/icons/wallet.svg" width={20} height={20} alt="wallet" />
        </button>
      );
    }

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
      <Dialog
        open={showSignIn}
        onOpenChange={(isOpen) => {
          setShowSignIn(isOpen);
        }}
      >
        <VisuallyHidden asChild>
          <DialogTitle>Connect Dialog</DialogTitle>
        </VisuallyHidden>
        <DialogTrigger asChild>
          <button className="shadow-25 h-10 rounded-full border border-[#d3d4d6] px-6 text-base leading-6 text-black transition-all hover:border-transparent hover:bg-yellow sm:h-12">
            <div className="flex items-center">
              {!shortAddr || connecting ? (
                <Skeleton className="h-5 w-24" />
              ) : (
                <div>{shortAddr}</div>
              )}
            </div>
          </button>
        </DialogTrigger>
        <DialogContent
          showClose={false}
          className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
          style={{
            boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
          }}
          aria-describedby={undefined}
        >
          <SignOutBtn />
        </DialogContent>
      </Dialog>
    </>
  );
}

function SignOutBtn() {
  const t = useTranslations("Header");
  const { disconnect } = useChainWallet();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <>
      <div className="mb-3 text-xl leading-[30px] text-black">
        {t("cap-YouAreSignedIn")}
      </div>
      <div className="min-h-10 px-5 text-center text-sm leading-5 text-black"></div>
      <div className="mt-10 w-full">
        <button
          onClick={handleDisconnect}
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-red bg-white text-red hover:bg-red hover:text-white"
        >
          {t("btn-SignOut")}
        </button>
      </div>
    </>
  );
}
