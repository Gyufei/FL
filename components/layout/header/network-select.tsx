"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Skeleton } from "../../ui/skeleton";
import { useAtom } from "jotai";
import { ClusterAtom, ClusterType } from "@/lib/states/cluster";

export default function NetworkSelect() {
  const [cluster, setCluster] = useAtom(ClusterAtom);

  const [popOpen, setPopOpen] = useState(false);

  const handleSelectNet = async (c: ClusterType) => {
    if (c === cluster) return;
    setCluster(c);
    setPopOpen(false);
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
        className="flex w-[160px] flex-col items-stretch space-y-2 border-none bg-white p-2"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        align="start"
      >
        <div
          onClick={() => handleSelectNet(ClusterType.Mainnet)}
          data-state={ClusterType.Mainnet === cluster ? "active" : "inactive"}
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
          onClick={() => {}}
          data-state={ClusterType.Devnet === cluster ? "active" : "inactive"}
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
