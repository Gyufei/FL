import Image from "next/image";
import { IPoint } from "@/lib/types/token";
import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export function PointTokenSelectDisplay({
  points,
  point,
  setPoint,
}: {
  points: Array<IPoint> | undefined;
  point: IPoint | null;
  setPoint: (_t: IPoint) => void;
}) {
  const t = useTranslations("Common");
  const [popOpen, setPopOpen] = useState(false);

  const handleSelectPoint = (t: IPoint) => {
    setPoint(t);
    setPopOpen(false);
  };

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredPoints = useMemo(
    () =>
      searchText
        ? (points || []).filter(
            (pt) =>
              pt.marketplace.market_name
                .toLocaleUpperCase()
                .includes(searchText.toLocaleUpperCase()) ||
              pt.marketplace.market_symbol
                .toLocaleUpperCase()
                .includes(searchText.toLocaleUpperCase()),
          )
        : points,
    [points, searchText],
  );

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <div className="flex cursor-pointer items-center rounded-full bg-[#F0F1F5] p-2">
          {point ? (
            <>
              <Image
                width={24}
                height={24}
                src={point?.logoURI || ""}
                alt="select token"
                className="mr-2 rounded-full"
              ></Image>
              <div className="overflow-x-hidden whitespace-nowrap pr-[4px] text-sm leading-5 text-black">
                {point?.symbol || ""}
              </div>
            </>
          ) : (
            <>
              <Skeleton className="mr-2 h-6 w-6 rounded-full" />
              <div className="h-5 w-6"></div>
            </>
          )}
          <div className="flex h-6 w-6 items-center justify-center">
            <Image src="/icons/down.svg" width={16} height={16} alt="arrow" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-[103] flex w-[240px] flex-col items-stretch border-0 bg-white p-2"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        <div className="relative mb-3 border-b border-[#fafafa] pb-3">
          <Image
            src={
              isInputFocused ? "/icons/search.svg" : "/icons/search-gray.svg"
            }
            width={20}
            height={20}
            alt="search"
            className="absolute left-[7px] top-[10px]"
          />
          <Input
            placeholder={t("Search")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="h-10 rounded-lg border-none bg-[#fafafa] pl-8"
          />
        </div>
        {(filteredPoints || []).map((t) => (
          <div
            key={t.symbol}
            onClick={() => handleSelectPoint(t)}
            className="not(first):mt-2 flex cursor-pointer rounded-lg px-2 py-2 first:mt-0 hover:bg-[#fafafa]"
          >
            <Image
              width={40}
              height={40}
              src={t?.logoURI || ""}
              alt="select token"
              className="mr-2 rounded-full"
            ></Image>
            <div className="ml-[10px] flex flex-col">
              <div className="text-sm leading-[20px] text-black">
                {t.symbol}
              </div>
              <div
                style={{
                  width: "150px",
                }}
                className="mt-[2px] w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-[18px] text-gray"
              >
                {t.marketplace.market_name}
              </div>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
