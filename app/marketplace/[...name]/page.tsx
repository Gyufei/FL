"use client";
import Image from "next/image";
import MarketTrades from "@/app/marketplace/market-trades";
import PageFooter from "@/app/_page-layout/_page-footer";
import OrderList from "@/app/marketplace/order-list";
import LeaderBoard from "@/app/marketplace/leader-board";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplaceCard from "../marketplace-card";

export default function Marketplace({ params }: { params: { name: string } }) {
  const marketplaceName = decodeURIComponent(params.name[0]);

  const { data: marketplaceData } = useMarketplaces();

  const marketplace = marketplaceData?.find(
    (marketplace) => marketplace.market_place_name === marketplaceName,
  );

  if (!marketplace) return null;

  return (
    <div className="flex h-[calc(100vh-156px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="flex w-[348px] flex-col space-y-6 px-6">
          <MarketplaceCard marketplace={marketplace} />
          <LeaderBoard />
          <div>
            <Image
              src="/img/ad-placeholder-1.png"
              width={280}
              height={160}
              alt="ad1"
              className="rounded-2xl"
            />
          </div>
        </div>
        <div className="max-h-[748px] flex-1 ">
          <OrderList marketplace={marketplace} />
        </div>
        <div className="w-[368px] px-6">
          <MarketTrades marketplace={marketplace} />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
