import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePrivy, useConnectWallet } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";

import { truncateAddr } from "@/lib/utils/web3";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
interface AddressEntry {
  address: string;
  linked: boolean;
  [key: string]: any;
}

export interface WalletType {
  name: string;
  icon: string;
  addresses: AddressEntry[];
  types: string[];
  chainList: string[];
  selectedChain: string;
}
export default function WalletTypeItem({
  walletType,
  updateSelectedChain,
}: {
  walletType: WalletType;
  updateSelectedChain: (walletType: string, chain: string) => void;
}) {
  const { setActiveWallet } = useSetActiveWallet();
  const { address, switchToTargetChain } = useChainWallet(
    walletType.selectedChain as any,
  );

  console.log("🚀 ~ wallet:", address);

  const [popOpen, setPopOpen] = useState(false);

  const { linkWallet } = usePrivy();
  const { connectWallet } = useConnectWallet({
    onSuccess: (wallet) => {
      console.log(
        "🚀 ~ ChainConfigs[walletType.selectedChain].network:",
        walletType.selectedChain,
        ChainConfigs[walletType.selectedChain].network,
      );
      wallet.switchChain(ChainConfigs[walletType.selectedChain].network);
      console.log("🚀 ~ wallet:", wallet);
    },
  });

  const handleChainSelect = (chain: string) => {
    updateSelectedChain(walletType.name, chain);
    setPopOpen(false); // 选择后关闭下拉菜单
  };

  const handleAddAddress = async () => {
    connectWallet();
    // const res = await linkWallet();
    // console.log("🚀 ~ handleAddAddress ~ res:", res);
    // await switchToTargetChain();
  };

  const handleConnect = (link: any) => {
    console.log("🚀 ~ handleConnect ~ link:", link);
    if (link.linked) {
      if (link.type !== "solana") {
        link.switchChain(ChainConfigs[walletType.selectedChain].network);
      } else {
        switchToTargetChain();
      }

      setActiveWallet(link).then(() => {});
    } else {
      link.loginOrLink();
    }
  };

  return (
    <>
      <div key={walletType.name} className="space-y-3">
        <div className="flex items-center space-x-2">
          <Image
            src={
              walletType.selectedChain
                ? ChainConfigs[walletType.selectedChain]?.logo
                : walletType.icon
            }
            alt={walletType.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-base font-medium">
            {walletType.selectedChain
              ? `${walletType.name}（ ${
                  ChainConfigs[walletType.selectedChain]?.name
                } ）`
              : walletType.name}
          </span>
          {walletType.selectedChain && (
            <Popover
              open={popOpen}
              onOpenChange={(isOpen) => setPopOpen(isOpen)}
            >
              <PopoverTrigger asChild>
                <div
                  data-state={popOpen ? "open" : "close"}
                  className="cursor-pointer data-[state=open]:rotate-180"
                >
                  <ChevronDown className="text-gray-500 h-4 w-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="z-[200] flex w-[218px] flex-col items-stretch space-y-2 border-none bg-white p-2"
                style={{
                  boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
                }}
                align="start"
              >
                {walletType.chainList.map((chain) => (
                  <div
                    key={chain}
                    onClick={() => handleChainSelect(chain)}
                    data-state={
                      chain === walletType.selectedChain ? "active" : "inactive"
                    }
                    className="flex cursor-pointer items-center justify-start space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-[#FAFAFA]"
                  >
                    <Image
                      width={24}
                      height={24}
                      src={ChainConfigs[chain]?.logo}
                      alt="evms"
                      className="z-10 rounded-full bg-white"
                    ></Image>
                    <div className="flex-1 text-xs">
                      {ChainConfigs[chain]?.name}
                    </div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
        {walletType.addresses.map((entry, addressIndex) => (
          <div key={addressIndex} className="flex items-center space-x-3">
            <div className="flex-grow">
              <div className="relative">
                <Input
                  value={truncateAddr(entry.address || "", {
                    nPrefix: 12,
                    nSuffix: 9,
                  })}
                  readOnly
                  className="w-full rounded-xl border-[#FAFAFA] bg-[#FAFAFA] pr-10 focus:border-[#3DD866] focus:bg-white"
                />
                {entry.address && (
                  <Image
                    onClick={() => handleConnect(entry)}
                    src={
                      address === entry.address
                        ? "/icons/rpc-link.svg"
                        : "/icons/disconnect.svg"
                    }
                    width={24}
                    height={24}
                    alt="link"
                    className="absolute right-3 top-2 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="bounded-[12px] h-11 w-11 border-[#D8D8D8]"
              onClick={() => handleAddAddress()}
            >
              <Image
                src="/icons/ac-plus.svg"
                width={24}
                height={24}
                alt="add"
              />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
