"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import HoverIcon from "@/components/share/hover-icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { IMarketplace } from "@/lib/types/marketplace";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplaceOverview from "@/components/share/market-place-overview";
import { useRouter } from "@/app/navigation";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import useTge from "@/lib/hooks/marketplace/useTge";
import { useTranslations } from "next-intl";
import { useMarketInfo } from "@/lib/hooks/api/use-market-info";
import { ChainType } from "@/lib/types/chain";

export default function MarketplaceCard({
  marketplace,
  className,
}: {
  marketplace: IMarketplace | undefined;
  className?: string;
}) {
  const isLoadingFlag = !marketplace;

  const [isStar, setIsStar] = useState(false);
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const { data: marketInfos } = useMarketInfo(
    marketplace?.chain || ChainType.ETH,
  );

  const projectInfo = useMemo(() => {
    if (!marketplace || !marketInfos) return;
    const projectInfo = marketInfos[marketplace.market_symbol];

    return projectInfo;
  }, [marketplace, marketInfos]);

  function handleStar() {
    if (isStar) {
      setIsStar(false);
    } else {
      setIsStar(true);
    }
  }

  const handleCopy = () => {
    if (isLoadingFlag) return;
    if (!marketplace.market_name) return;

    navigator.clipboard.writeText(marketplace.market_name);

    setGlobalMessage({
      type: "success",
      message: "Copied to clipboard",
    });
  };

  return (
    <div
      className={cn(
        className,
        "relative mt-4 rounded-3xl bg-[#F0F1F5] p-5 pt-3",
      )}
    >
      {isLoadingFlag ? (
        <Skeleton className="absolute -top-4 h-[73px] w-[73px] rounded-3xl bg-[#fafafa]" />
      ) : (
        <Image
          src={marketplace.projectLogo}
          width={73}
          height={73}
          className="absolute -top-4 rounded-3xl"
          alt="marketplace"
        />
      )}

      <div className="flex items-start justify-between pl-[84px]">
        <div className="relative flex items-center space-x-3 ">
          <div className="flex flex-col">
            {isLoadingFlag ? (
              <>
                <Skeleton className="my-[2px] h-4 w-[100px] rounded-sm bg-[#fafafa]" />
                <Skeleton className="my-[2px] h-4 w-[80px] rounded-sm bg-[#fafafa]" />
              </>
            ) : (
              <>
                <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[20px] text-black">
                  {marketplace.market_name}
                </div>
                <OverviewIcons
                  isStar={isStar}
                  handleStar={handleStar}
                  handleCopy={handleCopy}
                  twitter={projectInfo?.twitter}
                  discord={projectInfo?.discord}
                />
              </>
            )}
          </div>
        </div>
        {isLoadingFlag ? (
          <Skeleton className="h-8 w-8 rounded-full bg-[#fafafa]" />
        ) : (
          <FoldPop />
        )}
      </div>

      <MarketplaceOverview
        marketplace={marketplace}
        isLoading={isLoadingFlag}
      />
    </div>
  );
}

function OverviewIcons({
  // isStar,
  // handleStar,
  // handleCopy,
  twitter,
  discord,
}: {
  // isStar: boolean;
  // handleStar: () => void;
  // handleCopy: () => void;
  twitter: string | undefined;
  discord: string | undefined;
  [key: string]: any;
}) {
  const handleGoTwitter = () => {
    if (!twitter) return;
    window.open(twitter, "_blank");
  };

  const handleGoDiscord = () => {
    if (discord) return;
    window.open(discord, "_blank");
  };

  return (
    <div className="flex h-5 items-center space-x-1">
      {/* <HoverIcon
        onClick={handleCopy}
        src="/icons/copy-gray.svg"
        hoverSrc="/icons/copy.svg"
        width={20}
        height={20}
        alt="copy"
      /> */}

      {twitter && (
        <HoverIcon
          onClick={handleGoTwitter}
          src="/icons/twitter-gray.svg"
          hoverSrc="/icons/twitter.svg"
          width={20}
          height={20}
          alt="x"
        />
      )}

      {discord && (
        <HoverIcon
          onClick={handleGoDiscord}
          src="/icons/discord-gray.svg"
          hoverSrc="/icons/discord.svg"
          width={20}
          height={20}
          alt="discord"
        />
      )}

      {/* {isStar ? (
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
      )} */}
    </div>
  );
}

function FoldPop() {
  const t = useTranslations("Common");
  const { data: marketplaceData } = useMarketplaces();

  const router = useRouter();

  const [popOpen, setPopOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { checkIsAfterTge } = useTge();

  const cateList = useMemo(() => {
    return (marketplaceData || [])
      .filter((m) => m.status !== "offline")
      .filter((m) => {
        return !checkIsAfterTge(m.tge, Number(m.settlement_period));
      })
      .map((marketplace) => {
        return {
          name: marketplace.market_name,
          id: marketplace.market_symbol,
          tokenLogo: marketplace.projectLogo,
          link: marketplace.market_symbol,
        };
      });
  }, [marketplaceData, checkIsAfterTge]);

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

  function handleGo(id: string) {
    router.push(`/marketplace/${id}`);
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
        className="flex w-[240px] flex-col items-stretch border-none bg-white p-2"
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
        {filteredCateList.map((cate, i) => (
          <div
            className="flex cursor-pointer rounded-lg px-2 py-2 hover:bg-[#fafafa]"
            onClick={() => handleGo(cate.id)}
            key={cate.name}
            style={{
              marginTop: i === 0 ? 0 : 12,
            }}
          >
            <Image
              src={cate.tokenLogo}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full"
            />
            <div className="ml-[10px] flex flex-col">
              <div className="text-sm leading-[20px] text-black">
                {cate.name}
              </div>
              <div
                style={{
                  width: "150px",
                }}
                className="mt-[2px] w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-[18px] text-gray"
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
