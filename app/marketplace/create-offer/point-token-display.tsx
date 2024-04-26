import Image from "next/image";
import { IToken } from "@/lib/types/token";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PointTokenSelectDisplay({
  token,
  setToken,
}: {
  token: IToken;
  setToken: (_t: IToken) => void;
}) {
  const tokens = [
    {
      symbol: "POINTS",
      logoURI: "/icons/point.svg",
    },
  ] as Array<IToken>;
  const [popOpen, setPopOpen] = useState(false);

  const handleSelectToken = (t: IToken) => {
    setToken(t);
    setPopOpen(false);
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <div className="flex cursor-pointer items-center rounded-full bg-[#F0F1F5] p-2">
          <Image
            width={24}
            height={24}
            src={token.logoURI}
            alt="select token"
            className="mr-2"
          ></Image>
          <div className="overflow-x-hidden whitespace-nowrap pr-[4px] text-sm leading-5 text-black">
            {token.symbol}
          </div>
          <div className="flex h-6 w-6 items-center justify-center">
            <Image src="/icons/down.svg" width={16} height={16} alt="arrow" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-[103] flex w-[140px] flex-col items-stretch border-0 bg-white p-2"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {tokens.map((t) => (
          <div
            key={t.symbol}
            onClick={() => handleSelectToken(t)}
            className="flex h-8 cursor-pointer items-center rounded-xl px-1 text-sm text-black hover:bg-[#f5f6f7]"
          >
            <Image
              width={24}
              height={24}
              src={token.logoURI}
              alt="select token"
              className="mr-2"
            ></Image>
            {t.symbol}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
