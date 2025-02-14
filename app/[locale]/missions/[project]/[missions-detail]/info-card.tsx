"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import HoverIcon from "@/components/share/hover-icon";

import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketInfo } from "@/lib/hooks/api/use-market-info";
import { ChainType } from "@/lib/types/chain";

export default function ProjectInfoCard({
  data,
  className,
  closeDetail,
  clickChain,
}: any) {
  const isLoadingFlag = false;
  const marketplace = useMemo(
    () => ({
      active_wallets: "33193",
      all_time_high_price: "18.58272729131",
      avg_bid: "0.0521540509368",
      chain: "solana",
      change_rate_24h: "833.8",
      filled_orders: "3",
      floor_price: "0.00001",
      id: 9,
      initial_listing_price: "0.0000704545",
      is_fungible: false,
      item_name: "Backpack",
      last_price: "0.185827272727272727272727272727272727",
      last_price_24h_ago: "0.0199",
      listed_supply: "1013",
      market_catagory: "onchain_nonfungible_point",
      market_name: "Backpack",
      market_place_account: "5pPmxTnLhEjkZCnHLrwwDkjXc3mFvrriKeikzA7PwxfH",
      market_symbol: "backpack",
      minimum_price: "0.734893281234782608695652173913043477",
      project_token_addr: "11111111111111111111111111111111",
      require_collateral: false,
      settlement_period: "0",
      status: "online",
      tge: "0",
      token_per_item: "0",
      total_vol: "34.75387274594",
      trading_ends_at: "0",
      vol_24h: "22.77407274594",
      projectLogo: "/img/mock/矩形 1321@1x.png",
    }),
    [],
  );
  const [isStar, setIsStar] = useState(false);
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const { data: marketInfos } = useMarketInfo("solana" as ChainType);

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
        "relative mt-4 rounded-3xl bg-[#fafafa] p-5 pt-3 text-[12px]",
      )}
    >
      {isLoadingFlag ? (
        <Skeleton className="absolute -top-5 h-[73px] w-[73px] rounded-full bg-[#fafafa]" />
      ) : (
        <div className="absolute -top-3">
          <Image
            src={data.projectLogo}
            width={64}
            height={64}
            alt="logo"
            className=" h-[64px] w-[64px] rounded-full object-contain"
            onClick={closeDetail}
          />
        </div>
      )}

      <div className="flex items-start justify-between pl-[74px]">
        <div className="relative flex items-center space-x-3 ">
          <div className="flex flex-col">
            {isLoadingFlag ? (
              <>
                <Skeleton className="my-[2px] h-4 w-[100px] rounded-sm bg-[#fafafa]" />
                <Skeleton className="my-[2px] h-4 w-[80px] rounded-sm bg-[#fafafa]" />
              </>
            ) : (
              <>
                <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[20px] text-black font-[500]">
                  {data.projectName}
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
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-white px-2 py-1">
        <Image
          src="/icons/winter.svg"
          alt="Winter"
          className="h-4 w-4"
          width={16}
          height={16}
        />
        <span className="text-sm font-medium">{data.name}</span>
      </div>
      <p className="mt-4 text-[#99A0AF]">{data.desc}</p>
      <div className="mt-6 flex gap-2">
        {data.steps.map((chain: { chain: string; icon: string }) => (
          <div
            key={chain.chain}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-2 py-1"
            onClick={() => {
              clickChain(chain.chain);
            }}
          >
            <Image
              src={chain.icon}
              alt="Solana Icon"
              className="h-4 w-4"
              width={16}
              height={16}
            />
            <span className="text-sm">{chain.chain}</span>
          </div>
        ))}
      </div>
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
    if (!discord) return;
    window.open(discord, "_blank");
  };

  return (
    <div className="flex h-5 items-center space-x-1">
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
    </div>
  );
}
