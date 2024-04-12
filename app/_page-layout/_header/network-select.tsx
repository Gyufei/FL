"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Skeleton } from "../../../components/ui/skeleton";
import { useAtom } from "jotai";
import { ClusterAtom } from "@/lib/states/cluster";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export default function NetworkSelect() {
  const [cluster, setCluster] = useAtom(ClusterAtom);

  const [popOpen, setPopOpen] = useState(false);

  const handleSelectNet = async (c: WalletAdapterNetwork) => {
    if (c === cluster) return;
    setCluster(c);
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="relative flex h-12 w-40 cursor-pointer items-center justify-between rounded-full border border-[#D3D4D6] bg-transparent px-2">
          <CurrChainLogo />
          <div
            data-state={popOpen ? "open" : "close"}
            className="flex items-center justify-center data-[state=open]:rotate-180"
          >
            <Image
              width={20}
              height={20}
              src="/icons/down.svg"
              alt="down"
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
        <div
          onClick={() => handleSelectNet(WalletAdapterNetwork.Mainnet)}
          data-state={
            WalletAdapterNetwork.Mainnet === cluster ? "active" : "inactive"
          }
          className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
        >
          <Image
            width={24}
            height={24}
            src="/icons/solana.svg"
            alt="chain logo"
            className="z-10 bg-white"
          />
          <div className="flex-1 text-sm">Solana</div>
        </div>
        <div
          onClick={() => handleSelectNet(WalletAdapterNetwork.Devnet)}
          data-state={
            WalletAdapterNetwork.Devnet === cluster ? "active" : "inactive"
          }
          className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
        >
          <Image
            width={24}
            height={24}
            src="/icons/solana.svg"
            alt="chain logo"
            className="z-10 bg-white"
          />
          <div className="flex-1 text-sm">Solana Dev</div>
        </div>
        <DevnetCard isActive={WalletAdapterNetwork.Devnet === cluster} />
        <div
          onClick={() => {}}
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
          <div className="flex-1 text-sm">EVMs</div>
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

const CurrChainLogo = dynamic(() => import("./curr-chain-logo"), {
  loading: () => <Skeleton className="h-10 w-10 rounded-full" />,
});

function DevnetCard({ isActive }: { isActive: boolean }) {
  function goClaimTestToken() {}

  function goHelp() {}

  return (
    <div
      data-active={isActive}
      className="rounded-xl bg-[#fafafa] p-4 zoom-in-50 data-[active=false]:hidden"
    >
      <div className="text-sm leading-5 text-[rgba(153,160,175,0.5)]">
        Try Testnet
      </div>
      <div className="mt-4 flex justify-between">
        <div
          onClick={goClaimTestToken}
          className="flex cursor-pointer items-center text-[#99a0af] hover:text-[#2D2E33]"
        >
          <div className="mr-1 h-1 w-1 rounded-full bg-current"></div>
          <div className="text-xs leading-[18px]">Claim test tokens</div>
        </div>
        <div
          onClick={goHelp}
          className="flex cursor-pointer items-center text-[#99a0af] hover:text-[#2D2E33]"
        >
          <div className="mr-1 h-1 w-1 rounded-full bg-current"></div>
          <div className="text-xs leading-[18px] ">Help</div>
        </div>
      </div>
    </div>
  );
}
