import { atom, useAtom } from "jotai";
import Image from "next/image";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

export const WalletSelectDialogVisibleAtom = atom(false);

export default function WalletSelectDialog() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { wallets, select } = useWallet();
  const [walletSelectDialogVisible, setWalletSelectDialogVisible] = useAtom(
    WalletSelectDialogVisibleAtom,
  );

  const { isEth, wcModalOpen, wcModalClose } = useCurrentChain();

  const showWallets = wallets.filter(
    (w: Wallet) => w.adapter.name !== "MetaMask",
  );

  const [hoverWallet, setHoverWallet] = useState<string | null>(null);

  const handleMouseEnter = (w: Wallet) => {
    setHoverWallet(w.adapter.name);
  };

  const handleMouseLeave = () => {
    setHoverWallet(null);
  };

  function goToWallet(w: Wallet) {
    window.open(w.adapter.url, "_blank");
  }

  function onOpenChange(isOpen: boolean) {
    setWalletSelectDialogVisible(isOpen);
  }

  function handleConnect(w: Wallet) {
    if (w.readyState !== WalletReadyState.Installed) {
      goToWallet(w);
    } else {
      select(w.adapter.name);
      onOpenChange(false);
    }
  }

  useEffect(() => {
    if (!isEth) return;

    if (walletSelectDialogVisible) {
      wcModalOpen();
    } else {
      wcModalClose();
    }
  }, [wcModalOpen, walletSelectDialogVisible, wcModalClose, isEth]);

  if (isEth) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog
        open={walletSelectDialogVisible}
        onOpenChange={(isOpen) => onOpenChange(isOpen)}
      >
        <DialogContent className="w-[400px] border-none bg-white p-0 pb-6 md:w-[400px]">
          <DialogTitle className="justify-center px-6 pt-4 pl-[120px] text-xl leading-[30px] text-black">
            Connect a wallet
          </DialogTitle>
          <div className="flex flex-col space-y-4 px-6 pb-4">
            {showWallets.map((wallet) => (
              <div
                onClick={() => handleConnect(wallet)}
                onMouseEnter={() => handleMouseEnter(wallet)}
                onMouseLeave={handleMouseLeave}
                className="flex cursor-pointer items-center justify-between rounded-2xl p-4 hover:bg-[#fafafa]"
                key={wallet.adapter.name}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={wallet.adapter.icon}
                    alt="wallet"
                    width={24}
                    height={24}
                    className="c-image-shadow"
                  />
                  <span className="text-sm font-semibold leading-[17px]">
                    {wallet.adapter.name}
                  </span>
                </div>

                {wallet.readyState !== WalletReadyState.Installed && (
                  <div
                    data-state={hoverWallet === wallet.adapter.name}
                    className="flex cursor-pointer items-center justify-center rounded-full border border-black py-[2px] px-[12px] text-black data-[state=true]:border-yellow data-[state=true]:bg-yellow"
                    onClick={() => goToWallet(wallet)}
                  >
                    <div className="text-sm leading-5 text-black">Install</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer
        open={walletSelectDialogVisible}
        onOpenChange={(isOpen) => setWalletSelectDialogVisible(isOpen)}
      >
        <DrawerContent className="p-2 pt-4">
          <DrawerTitle>Connect a wallet to continue</DrawerTitle>
          <div className="flex flex-col space-y-4 px-4 py-4">
            {showWallets.map((wallet) => (
              <div
                onClick={() => handleConnect(wallet)}
                onMouseEnter={() => handleMouseEnter(wallet)}
                onMouseLeave={handleMouseLeave}
                className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-black p-4 hover:bg-black"
                key={wallet.adapter.name}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={wallet.adapter.icon}
                    alt="wallet"
                    width={24}
                    height={24}
                    className="c-image-shadow"
                  />
                  <span
                    data-state={hoverWallet === wallet.adapter.name}
                    className="text-sm font-semibold leading-[17px] data-[state=true]:text-yellow"
                  >
                    {wallet.adapter.name}
                  </span>
                </div>

                {wallet.readyState !== WalletReadyState.Installed && (
                  <div
                    data-state={hoverWallet === wallet.adapter.name}
                    className="flex cursor-pointer items-center justify-center rounded-full border border-black py-[2px] px-[12px] data-[state=true]:border-yellow"
                    onClick={() => goToWallet(wallet)}
                  >
                    <div
                      data-state={hoverWallet === wallet.adapter.name}
                      className="text-sm leading-5 data-[state=true]:text-yellow"
                    >
                      Install
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
}
