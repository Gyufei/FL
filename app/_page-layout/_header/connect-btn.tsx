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
import { useAtom, useSetAtom } from "jotai";
import { useUserState } from "@/lib/hooks/api/use-user-state";
import { useSignInAction } from "@/lib/hooks/web3/use-sign-in-action";
// import { SignInBtn } from "./sign-in-btn";
import { ShowSignDialogAtom } from "@/lib/states/user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let signInFlag = false;

export default function ConnectBtn() {
  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  const openWalletSelectDialog = useCallback(() => {
    setWalletSelectDialogVisible(true);
  }, [setWalletSelectDialogVisible]);

  const { publicKey, connected, connecting } = useWallet();

  const address = toPubString(publicKey);

  const { data: userState, mutate: refreshUserState } = useUserState(address);
  const { signInAction } = useSignInAction();

  const [shortAddr, setShortAddr] = useState("");

  async function signIn() {
    signInFlag = true;
    await signInAction();
    refreshUserState();
    signInFlag = false;
  }

  useEffect(() => {
    if (!address) return;
    const sa = truncateAddr(address, {
      nPrefix: 6,
      nSuffix: 4,
    });

    setShortAddr(sa);

    if (userState && !userState.is_sign_in && !signInFlag) {
      signIn();
    }
  }, [address, userState]);

  const [showSignIn, setShowSignIn] = useAtom(ShowSignDialogAtom);

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
        <button className="shadow-25 h-10 rounded-full border border-[#d3d4d6] px-6 text-base leading-6 text-black transition-all hover:brightness-75 sm:h-12">
          <div className="flex items-center">
            {!shortAddr || connecting || !userState?.is_sign_in ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <div>{shortAddr}</div>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        showClose={false}
        className="flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
      >
        {/* <div className="text-xl leading-[30px] text-black">
          You&apos;re signed out
        </div>
        <div className="text-center text-sm leading-5 text-black">
          Sign a message in your wallet to verify
          <br /> that you&apos;re the owner of the connected <br />
          address
        </div>
        <SignInBtn /> */}
        <Disconnect />
      </DialogContent>
    </Dialog>
  );
}

function Disconnect() {
  const { disconnect } = useWallet();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="mt-2 w-full">
      <button
        onClick={handleDisconnect}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#F0F1F5] text-lightgray"
      >
        Disconnect
      </button>
    </div>
  );
}
