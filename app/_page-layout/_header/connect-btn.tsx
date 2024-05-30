"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Skeleton } from "../../../components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { truncateAddr } from "@/lib/utils/web3";
import WalletSelectDialog, {
  WalletSelectDialogVisibleAtom,
} from "@/components/share/wallet-select-dialog";
import toPubString from "@/lib/utils/pub-string";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { SignInBtn } from "./sign-in-btn";
import { AccessTokenAtom, ShowSignDialogAtom } from "@/lib/states/user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const token = useAtomValue(AccessTokenAtom);
  const [showSignIn, setShowSignIn] = useAtom(ShowSignDialogAtom);

  useEffect(() => {
    if (!address) return;
    const sa = truncateAddr(address, {
      nPrefix: 6,
      nSuffix: 4,
    });

    setShortAddr(sa);

    if (!token) setShowSignIn(true);
  }, [address, setShowSignIn, setShortAddr, token]);

  if (!connected) {
    return (
      <>
        <button
          className="shadow-25 h-10 rounded-full bg-[#f0f1f5] px-4 text-base leading-6 transition-all sm:h-12 sm:px-[22px]"
          onClick={() => openWalletSelectDialog()}
        >
          <span className="hidden sm:inline-block">Connect Wallet</span>
          <span className="inline-block sm:hidden">Connect</span>
        </button>
        <WalletSelectDialog />
      </>
    );
  }

  return (
    <Dialog open={showSignIn} onOpenChange={(isOpen) => setShowSignIn(isOpen)}>
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
      >
        <div className="mb-3 text-xl leading-[30px] text-black">
          {!token ? "You're signed out" : "You're signed in"}
        </div>
        <div className="text-center text-sm leading-5 text-black">
          Sign a message in your wallet to verify
          <br /> that you&apos;re the owner of the connected <br />
          address
        </div>
        {token ? <SignOutBtn /> : <SignInBtn />}
      </DialogContent>
    </Dialog>
  );
}

function SignOutBtn() {
  const { disconnect } = useWallet();
  const setToken = useSetAtom(AccessTokenAtom);

  const handleDisconnect = () => {
    disconnect();
    setToken("");
  };

  return (
    <div className="mt-10 w-full">
      <button
        onClick={handleDisconnect}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#F0F1F5] text-lightgray"
      >
        Sign Out
      </button>
    </div>
  );
}
