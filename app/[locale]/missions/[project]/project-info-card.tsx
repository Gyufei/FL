"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import HoverIcon from "@/components/share/hover-icon";

import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketInfo } from "@/lib/hooks/api/use-market-info";
import { ChainType } from "@/lib/types/chain";
import { getFormatUnit } from "@/lib/utils/number";

export default function ProjectInfoCard({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  const isLoadingFlag = false;
  const [isStar, setIsStar] = useState(false);
  const { data: marketInfos } = useMarketInfo("solana" as ChainType);

  const projectInfo = useMemo(() => {
    if (!data || !marketInfos) return;
    const projectInfo = marketInfos[data.market_symbol];

    return projectInfo;
  }, [data, marketInfos]);

  function handleStar() {
    if (isStar) {
      setIsStar(false);
    } else {
      setIsStar(true);
    }
  }

  return (
    <div
      className={cn(
        className,
        "relative mt-4 rounded-3xl border border-[#E8E8E8] p-5 pt-3 text-[12px]",
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
                <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[20px] text-black font-medium">
                  {data.projectName}
                </div>
                <OverviewIcons
                  isStar={isStar}
                  handleStar={handleStar}
                  twitter={projectInfo?.twitter}
                  discord={projectInfo?.discord}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <p className="mt-5 text-[#99A0AF]">{data.desc}</p>

      <div className="mt-6 flex gap-12">
        <div className="space-y-1">
          <p className="text-[16px] text-[#2D2E33]">{data.taskNum}</p>
          <p className="text-[12px] text-[#99A0AF]">Quests</p>
        </div>
        <div className="space-y-1">
          <p className="text-[16px] text-[#2D2E33]">
            {getFormatUnit(data.finished).number +
              getFormatUnit(data.finished).unit}{" "}
          </p>
          <p className="text-[12px] text-[#99A0AF]">Finished</p>
        </div>
      </div>
    </div>
  );
}

function OverviewIcons({
  twitter,
  discord,
}: {
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
