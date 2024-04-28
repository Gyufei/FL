"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import HoverIcon from "../../components/share/hover-icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../../components/ui/input";
import { IMarketplace } from "@/lib/types/marketplace";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import TokenImg from "@/components/share/token-img";
import MarketplaceOverview from "@/components/share/market-place-overview";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/common";

export default function MarketplaceCard({
  marketplace,
  className,
}: {
  marketplace: IMarketplace;
  className?: string;
}) {
  const [isStar, setIsStar] = useState(false);
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  function handleStar() {
    if (isStar) {
      setIsStar(false);
    } else {
      setIsStar(true);
    }
  }

  const handleCopy = () => {
    if (!marketplace.market_place_name) return;

    navigator.clipboard.writeText(marketplace.market_place_name);

    setGlobalMessage({
      type: "success",
      message: "Copied to clipboard",
    });
  };

  const handleGoTwitter = () => {};

  const handleGoDiscord = () => {};

  return (
    <div
      className={cn(
        className,
        "relative mt-4 rounded-3xl bg-[#F0F1F5] p-5 pt-3",
      )}
    >
      <TokenImg
        tokenAddr={marketplace.token_mint}
        width={73}
        height={73}
        className="absolute -top-4 rounded-3xl"
      />

      <div className="flex items-center justify-between pl-[84px]">
        <div className="relative flex items-center space-x-3 ">
          <div className="flex flex-col">
            <div className="w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-lg leading-[28px] text-black">
              {marketplace.market_place_name}
            </div>
            <OverviewIcons
              isStar={isStar}
              handleStar={handleStar}
              handleCopy={handleCopy}
              handleGoTwitter={handleGoTwitter}
              handleGoDiscord={handleGoDiscord}
            />
          </div>
        </div>
        <FoldPop />
      </div>

      <MarketplaceOverview marketplace={marketplace} />
    </div>
  );
}

function OverviewIcons({
  isStar,
  handleStar,
  handleCopy,
  handleGoTwitter,
  handleGoDiscord,
}: {
  isStar: boolean;
  handleStar: () => void;
  handleCopy: () => void;
  handleGoTwitter: () => void;
  handleGoDiscord: () => void;
}) {
  return (
    <div className="flex items-center space-x-1">
      <HoverIcon
        onClick={handleCopy}
        src="/icons/copy-gray.svg"
        hoverSrc="/icons/copy.svg"
        width={20}
        height={20}
        alt="copy"
      />

      <HoverIcon
        onClick={handleGoTwitter}
        src="/icons/twitter-gray.svg"
        hoverSrc="/icons/twitter.svg"
        width={20}
        height={20}
        alt="x"
      />

      <HoverIcon
        onClick={handleGoDiscord}
        src="/icons/discord-gray.svg"
        hoverSrc="/icons/discord.svg"
        width={20}
        height={20}
        alt="discord"
      />

      {isStar ? (
        <Image
          onClick={handleStar}
          src="/icons/stared.svg"
          width={20}
          height={20}
          alt="stared"
          className="cursor-pointer"
        />
      ) : (
        <HoverIcon
          onClick={handleStar}
          src="/icons/star-gray.svg"
          hoverSrc="/icons/star.svg"
          width={20}
          height={20}
          alt="star"
        />
      )}
    </div>
  );
}

function FoldPop() {
  const { data: marketplaceData } = useMarketplaces();
  const { data: tokens } = useTokens();

  const router = useRouter();

  const [popOpen, setPopOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");

  const cateList = useMemo(() => {
    return (marketplaceData || []).map((marketplace) => {
      return {
        name: marketplace.market_place_name,
        tokenLogo: tokens?.find((token) => {
          token.address === marketplace.token_mint;
        })?.logoURI,
        link: marketplace.market_place_id,
      };
    });
  }, [marketplaceData, tokens]);

  const filteredCateList = useMemo(
    () =>
      searchText
        ? cateList.filter((cate) =>
            cate.name
              .toLocaleUpperCase()
              .includes(searchText.toLocaleUpperCase()),
          )
        : cateList,
    [cateList, searchText],
  );

  function handleGo(name: string) {
    router.push(`/marketplace/${name}`);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Image
            src={popOpen ? "/icons/fold.svg" : "/icons/fold-gray.svg"}
            width={20}
            height={20}
            alt="fold"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[210px] flex-col items-stretch border-none bg-white p-1"
      >
        <div className="relative mb-2 border-b border-[#fafafa] pb-2">
          <Image
            src={
              isInputFocused ? "/icons/search.svg" : "/icons/search-gray.svg"
            }
            width={20}
            height={20}
            alt="search"
            className="absolute top-[7px] left-[7px]"
          />
          <Input
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="h-8 rounded-lg border-none bg-[#fafafa] pl-8"
          />
        </div>
        {filteredCateList.map((cate) => (
          <div
            className="flex cursor-pointer rounded-lg px-2 py-[6px] hover:bg-[#fafafa]"
            onClick={() => handleGo(cate.name)}
            key={cate.name}
          >
            <Image
              src={cate.tokenLogo || "/img/token-placeholder.png"}
              width={32}
              height={32}
              alt="avatar"
              className="rounded-full"
            />
            <div className="ml-2 flex flex-col">
              <div className="text-xs leading-[18px] text-black">
                {cate.name}
              </div>
              <div
                style={{
                  width: "150px",
                }}
                className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] leading-4 text-gray"
              >
                {cate.link}
              </div>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
