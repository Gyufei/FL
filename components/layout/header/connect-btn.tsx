"use client";

import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

import { Skeleton } from "../../ui/skeleton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useState } from "react";
import { truncateAddr } from "@/lib/utils/web3";
import CopyIcon from "@/components/share/copy-icon";
import WalletSelectDialog, {
  WalletSelectDialogVisibleAtom,
} from "@/components/share/wallet-select-dialog";
import toPubString from "@/lib/utils/pub-string";
import { useSetAtom } from "jotai";

export default function ConnectBtn() {
  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  const openWalletSelectDialog = useCallback(() => {
    setWalletSelectDialogVisible(true);
  }, [setWalletSelectDialogVisible]);

  const { publicKey, connected, connecting } = useWallet();

  const address = toPubString(publicKey);

  const [shortAddr, setShortAddr] = useState("");

  useEffect(() => {
    if (!address) return;
    const sa = truncateAddr(address, {
      nPrefix: 6,
      nSuffix: 4,
    });

    setShortAddr(sa);
  }, [address]);

  const [popOpen, setPopOpen] = useState(false);

  if (!connected) {
    return (
      <>
        <button
          className="h-12 rounded-full bg-[#f0f1f5] px-[22px] text-base leading-6 shadow-25 transition-all"
          onClick={() => openWalletSelectDialog()}
        >
          Connect Wallet
        </button>
        <WalletSelectDialog />
      </>
    );
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <button className="h-12 rounded-full border border-[#d3d4d6] px-6 text-base leading-6 text-black shadow-25 transition-all hover:brightness-75">
          <div className="flex items-center">
            {!shortAddr || connecting ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <div>{shortAddr}</div>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={-20}
        className="m-3 flex w-[320px] flex-col items-stretch border-[2px] border-black bg-white p-6"
      >
        <div className="c-font-text-65 mb-6 leading-[17px] text-[#333]">
          Wallet
        </div>
        <div className="mt-0 mb-6 flex items-center gap-x-3">
          <div className="flex flex-1 flex-col">
            <div className="leading-6 text-black">{shortAddr}</div>
          </div>
          <CopyIcon text={address || ""} />
        </div>
        <Disconnect />
      </PopoverContent>
    </Popover>
  );
}

function Disconnect() {
  const { disconnect } = useWallet();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="border-1 border-t border-lightgray pt-5">
      <div
        className="flex cursor-pointer items-center pb-4"
        onClick={handleDisconnect}
      >
        <Image
          width={20}
          height={20}
          src="/icons/logout.svg"
          alt="logo"
        ></Image>
        <div className="ml-2 text-sm leading-5 text-black">Disconnect</div>
      </div>
      <div className="flex items-center space-x-6 text-xs text-[#666]">
        <span className="cursor-pointer">Terms</span>
        <span className="cursor-pointer">Privacy</span>
        <span className="cursor-pointer">Support</span>
      </div>
    </div>
  );
}
