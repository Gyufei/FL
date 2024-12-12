"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useWalletModalContext } from "../provider/wallet-modal-provider";
import { useEffect, useState } from "react";
import { ChainType } from "@/lib/types/chain";
import { EvmWallets } from "./evm-wallets";
import SolanaWallets from "./solana-wallets";

export default function WalletsModal() {
  const { isWalletModalOpen, openWalletModal, walletModalChain } =
    useWalletModalContext();
  const [currentTab, setCurrentTab] = useState<"Evm" | "Solana">("Evm");

  useEffect(() => {
    if (walletModalChain) {
      setCurrentTab(walletModalChain === ChainType.SOLANA ? "Solana" : "Evm");
    }
  }, [walletModalChain]);

  return (
    <Dialog
      open={isWalletModalOpen}
      onOpenChange={(isOpen) => openWalletModal(isOpen)}
    >
      <VisuallyHidden asChild>
        <DialogTitle>Connect Wallet</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        showClose={false}
        className="z-[199] flex w-[400px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <div className="flex text-xl capitalize leading-[30px] text-black">
          Connect Wallet
        </div>
        <Tabs
          value={currentTab}
          className="mt-4 w-full"
          onValueChange={(value) => setCurrentTab(value as "Evm" | "Solana")}
        >
          <TabsList className="relative mx-4 flex items-end justify-between p-0">
            <div className="absolute bottom-[0.5px] left-0 right-0 h-px bg-[#eee]"></div>
            <TabsTrigger
              className="z-10 flex flex-1 items-center rounded-none border-b-2 pb-[10px] pl-0 pt-0 leading-6 data-[state=active]:border-lightgray data-[state=inactive]:border-transparent data-[state=active]:text-black data-[state=inactive]:text-lightgray"
              value="Evm"
            >
              Evm
            </TabsTrigger>
            <TabsTrigger
              className="z-10 flex flex-1 items-center rounded-none border-b-2 pb-[10px] pl-0 pt-0 leading-6 data-[state=active]:border-lightgray data-[state=inactive]:border-transparent data-[state=active]:text-black data-[state=inactive]:text-lightgray"
              value="Solana"
            >
              Solana
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Evm">
            <EvmWallets onSelected={() => openWalletModal(false)} />
          </TabsContent>
          <TabsContent value="Solana">
            <SolanaWallets onSelected={() => openWalletModal(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
