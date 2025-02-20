import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ChainConfigs, IChainConfig } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function NetworkSelect({
  selectedChain,
  handleChainChange,
}: {
  selectedChain: ChainType;
  handleChainChange: (_chains: ChainType) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  const currentChainObj = useMemo(() => {
    return ChainConfigs[selectedChain];
  }, [selectedChain]);

  function handleClickOpt(chain: ChainType) {
    if (selectedChain !== chain) {
      handleChainChange(chain);
    }

    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div
          data-open={popOpen}
          className="flex cursor-pointer items-center space-x-1 rounded-full border border-[#D3D4D6] px-[16px] py-[5px] outline-none data-[open=true]:border-theme data-[open=true]:bg-theme"
        >
          <Image
            src={currentChainObj?.logo}
            width={20}
            height={20}
            alt="chain icon"
          />
          <div data-open={popOpen} className="data-[open=true]:text-white overflow-hidden text-clip whitespace-nowrap text-sm leading-5 text-black">
            {currentChainObj?.name}
          </div>
          <Image
            data-open={popOpen}
            src={popOpen ? "/icons/arrow-down-white.svg" : "/icons/arrow-down.svg"}
            width={16}
            height={16}
            alt="arrow"
            className="data-[open=true]:rotate-180"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-[160px] flex-col items-stretch border-0 bg-white p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {Object.entries(ChainConfigs).map(
          ([key, chain]: [string, IChainConfig]) => (
            <div
              key={key}
              data-checked={selectedChain === key}
              className="flex cursor-pointer items-center rounded-xl px-3 py-2 data-[checked=true]:bg-[#FAFAFA]"
              onClick={() => handleClickOpt(key as ChainType)}
            >
              <Image src={chain.logo} width={20} height={20} alt="chain icon" />
              <div className="flex flex-1 items-center justify-between">
                <div
                  data-checked={selectedChain === key}
                  className="ml-[5px] text-xs leading-[18px] data-[checked=false]:text-gray data-[checked=true]:text-black"
                >
                  {chain.name}
                </div>
                <Checkbox
                  checked={selectedChain === key}
                  onCheckedChange={() => handleClickOpt(key as ChainType)}
                  className="rounded-full"
                />
              </div>
            </div>
          ),
        )}
      </PopoverContent>
    </Popover>
  );
}
