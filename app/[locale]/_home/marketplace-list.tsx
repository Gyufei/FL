"use client";

import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { IMarketplace } from "@/lib/types/marketplace";
import MarketplaceOverview from "@/components/share/market-place-overview";
import { useRouter } from "@/app/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useTge from "@/lib/hooks/marketplace/useTge";

export default function MarketplaceList() {
  const t = useTranslations("Home");
  const { data: marketplaceData } = useMarketplaces();
  const { checkIsAfterTge } = useTge();

  const markets = useMemo(() => {
    return (marketplaceData || [])
      .filter((m) => m.status !== "offline")
      .filter((m) => !checkIsAfterTge(m.tge, Number(m.settlement_period)));
  }, [marketplaceData]);

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="text-[40px] leading-10 text-black">
        {t("cap-TrendingProjects")}
      </div>
      <div className="mt-6 flex w-full flex-col items-start gap-x-5 gap-y-9 px-4 py-5 sm:grid sm:grid-cols-4 sm:flex-row sm:items-stretch sm:overflow-x-hidden">
        {(markets || []).map((marketplace) => (
          <ItemCard key={marketplace.market_id} marketplace={marketplace} />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ marketplace }: { marketplace: IMarketplace }) {
  const router = useRouter();

  function handleGo() {
    router.push(`/marketplace/${marketplace.market_id}`);
  }

  return (
    <div
      className="relative min-w-[calc(95vw)] cursor-pointer rounded-3xl p-5 pt-3 sm:w-auto sm:min-w-fit"
      onClick={handleGo}
      style={{
        background:
          "linear-gradient(180deg, #F0F1F5 0%, rgba(240, 241, 245, 0.5) 100%)",
      }}
    >
      <Image
        src={marketplace.projectLogo}
        width={72}
        height={72}
        className="absolute -top-4 left-4 rounded-3xl"
        alt="marketplace"
      />

      <div className="flex items-start justify-between pl-20">
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <div className="w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[20px] text-black">
              {marketplace.market_name}
            </div>
            <div className="h-[18px] text-xs leading-[18px] text-gray">
              {/* <span>Spread:</span>
              <span>{marketplace.trade_spread}%</span> */}
            </div>
          </div>
        </div>

        {/* <Image
          src="/icons/star.svg"
          width={20}
          height={20}
          alt="star"
          className="mt-[3px]"
        /> */}
      </div>

      <MarketplaceOverview marketplace={marketplace} />
    </div>
  );
}
