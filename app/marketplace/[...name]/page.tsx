"use client";
import Image from "next/image";
import MarketTrades from "@/app/marketplace/market-trades";
import PageFooter from "@/app/_page-layout/_page-footer";
import OrderList from "@/app/marketplace/order-list";
import LeaderBoard from "@/app/marketplace/leader-board";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplaceCard from "../marketplace-card";
import useTge from "@/lib/hooks/marketplace/useTge";
import { useMemo } from "react";

export default function Marketplace({ params }: { params: { name: string } }) {
  const marketplaceName = decodeURIComponent(params.name[0]);

  const { data: marketplaceData } = useMarketplaces();

  const marketplace = marketplaceData?.find(
    (marketplace) => marketplace.market_place_name === marketplaceName,
  );

  const { checkIsAfterTge } = useTge();

  const isAfterTge = useMemo(() => {
    if (!marketplace) return false;
    return checkIsAfterTge(marketplace.tge);
  }, [marketplace, checkIsAfterTge]);

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
        <div className="max-h-[748px] flex-1">
          {isAfterTge ? (
            <div className="flex h-full items-center justify-center rounded-3xl bg-[#fafafa] p-5">
              <div className="text-center text-xl leading-8 text-gray">
                This project is under settlement. <br />
                No offer is available.
              </div>
            </div>
          ) : (
            <OrderList marketplace={marketplace} />
          )}
        </div>
        <div className="w-[368px] px-6">
          <MarketTrades marketplace={marketplace} />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
