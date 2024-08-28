"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Skeleton } from "@/components/ui/skeleton";
import { useSetAtom } from "jotai";
import { DevnetRow } from "./devnet-row";
import { isPreview, isProduction } from "@/lib/PathMap";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ENetworks, NetworkAtom } from "@/lib/states/network";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

function UseSolanaNetworkSelect() {
  const setNetwork = useSetAtom(NetworkAtom);

  const [popOpen, setPopOpen] = useState(false);

  const { isSolana } = useCurrentChain();

  const handleSelectNet = async () => {
    if (!isSolana) {
      setNetwork(ENetworks.Solana);
    }
  };

  return {
    popOpen,
    setPopOpen,
    handleSelectNet,
  };
}

function useEthNetworkSelect() {
  const setNetwork = useSetAtom(NetworkAtom);
  const { open: wcModalOpen } = useWeb3Modal();

  const { isEth } = useCurrentChain();

  function handleConnectEth() {
    if (isEth) return;
    setNetwork(ENetworks.Eth);
    wcModalOpen();
  }

  return {
    handleConnectEth,
  };
}

const CurrChainLogo = dynamic(() => import("./curr-chain-logo"), {
  loading: () => <Skeleton className="h-10 w-10 rounded-full" />,
});

export function NetworkSelect() {
  const { popOpen, setPopOpen, handleSelectNet } = UseSolanaNetworkSelect();

  const { handleConnectEth } = useEthNetworkSelect();

  function handleEthAction() {
    handleConnectEth();
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="relative hidden h-12 w-40 cursor-pointer items-center justify-between rounded-full border border-[#D3D4D6] bg-transparent px-2 hover:border-transparent hover:bg-yellow sm:flex">
          <CurrChainLogo />
          <div
            data-state={popOpen ? "open" : "close"}
            className="flex items-center justify-center data-[state=open]:rotate-180"
          >
            <Image
              width={20}
              height={20}
              src="/icons/down.svg"
              alt="network"
              className="rounded-full"
            ></Image>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[248px] flex-col items-stretch space-y-2 border-none bg-white p-2"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        align="start"
      >
        {!isPreview && (
          <div
            onClick={() => handleSelectNet()}
            data-state={isProduction ? "active" : "inactive"}
            className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
          >
            <Image
              width={24}
              height={24}
              src="/icons/solana.svg"
              alt="chain logo"
              className="z-10 rounded-full bg-white"
            />
            <div className="flex-1 text-xs">Solana</div>
          </div>
        )}
        {!isProduction && (
          <DevnetRow
            onClick={() => handleSelectNet()}
            isActive={!isProduction}
          />
        )}
        <div
          onClick={() => handleEthAction()}
          data-state={"inactive"}
          className="flex cursor-pointer items-center justify-start space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-black data-[state=active]:text-yellow"
        >
          <Image
            width={24}
            height={24}
            src="/icons/evms.svg"
            alt="evms"
            className="z-10 rounded-full bg-white"
          ></Image>
          <div className="flex-1 text-xs">EVMs</div>
          <Image
            width={32}
            height={25}
            src="/icons/evm-chains.svg"
            alt="evm chains"
            className="z-10 bg-white"
          ></Image>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function MbNetworkSelect() {
  const { popOpen, setPopOpen, handleSelectNet } = UseSolanaNetworkSelect();

  const { handleConnectEth } = useEthNetworkSelect();

  function handleEthAction() {
    handleConnectEth();
  }

  return (
    <Drawer open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <DrawerTrigger asChild>
        <div className="relative flex h-10  w-10 cursor-pointer items-center justify-between rounded-full border border-[#D3D4D6] bg-black px-2 sm:hidden sm:h-12 sm:w-40 sm:bg-transparent">
          <CurrChainLogo />
          <div className="absolute -right-6 block items-center justify-center sm:hidden">
            <Image
              width={20}
              height={20}
              src="/icons/dot-menu.svg"
              alt="down"
            ></Image>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-2 pt-4">
        <DrawerTitle className="text-center">Network switching</DrawerTitle>
        <div
          onClick={() => handleSelectNet()}
          data-state={isProduction ? "active" : "inactive"}
          className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
        >
          <Image
            width={24}
            height={24}
            src="/icons/solana.svg"
            alt="chain logo"
            className="z-10 bg-white"
          />
          <div className="flex-1 text-xs">Solana</div>
        </div>
        <DevnetRow onClick={() => handleSelectNet()} isActive={!isProduction} />
        <div
          onClick={() => handleEthAction()}
          data-state={"inactive"}
          className="flex cursor-pointer items-center justify-start space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-black data-[state=active]:text-yellow"
        >
          <Image
            width={24}
            height={24}
            src="/icons/evms.svg"
            alt="evms"
            className="z-10 bg-white"
          ></Image>
          <div className="flex-1 text-xs">EVMs</div>
          <Image
            width={32}
            height={25}
            src="/icons/evm-chains.svg"
            alt="evm chains"
            className="z-10 bg-white"
          ></Image>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
