"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { ChainConfigs } from "@/lib/const/chain-config";

export function NetworkSelect() {
  const [popOpen, setPopOpen] = useState(false);

  const {
    isEth,
    isSolana,
    isBnb,
    switchToSolana,
    switchToEth,
    switchToBsc,
    currentChainInfo,
  } = useCurrentChain();

  const [chainInfo, setChainInfo] = useState({
    logo: "/icons/empty.svg",
    name: "",
  });

  useEffect(() => {
    setChainInfo(currentChainInfo);
  }, [currentChainInfo]);

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="relative hidden h-12 w-40 cursor-pointer items-center justify-between rounded-full border border-[#D3D4D6] bg-transparent px-2 hover:border-transparent hover:bg-yellow sm:flex">
          <div className="relative flex items-center justify-center">
            <Image
              width={24}
              height={24}
              src={chainInfo.logo}
              alt="chain name"
              className="z-10 mr-0 rounded-full bg-black sm:mr-2 sm:bg-white"
            ></Image>
            <span className="hidden text-base leading-6 text-black sm:inline-block">
              {chainInfo.name}
            </span>
          </div>
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
        className="flex w-[218px] flex-col items-stretch space-y-2 border-none bg-white p-2"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        align="start"
      >
        <div
          onClick={() => switchToSolana()}
          data-state={isSolana ? "active" : "inactive"}
          className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
        >
          <Image
            width={24}
            height={24}
            src="/icons/solana.svg"
            alt="chain logo"
            className="z-10 rounded-full bg-white"
          />
          <div className="flex-1 text-xs">{ChainConfigs.solana.name}</div>
        </div>
        <div
          onClick={() => switchToEth()}
          data-state={isEth ? "active" : "inactive"}
          className="flex cursor-pointer items-center justify-start space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
        >
          <Image
            width={24}
            height={24}
            src="/icons/evms.svg"
            alt="evms"
            className="z-10 rounded-full bg-white"
          ></Image>
          <div className="flex-1 text-xs">{ChainConfigs.eth.name}</div>
        </div>
        <div
          onClick={() => switchToBsc()}
          data-state={isBnb ? "active" : "inactive"}
          className="flex cursor-pointer items-center justify-start space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
        >
          <Image
            width={24}
            height={24}
            src="/icons/bnb.svg"
            alt="evms"
            className="z-10 rounded-full bg-white"
          ></Image>
          <div className="flex-1 text-xs">{ChainConfigs.bnb.name}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
