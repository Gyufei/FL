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
    (marketplace) => marketplace.market_id === marketplaceName,
  );

  const { checkIsAfterTge } = useTge();

  const isAfterTge = useMemo(() => {
    if (!marketplace) return false;
    return checkIsAfterTge(
      marketplace.tge,
      Number(marketplace.settlement_period),
    );
  }, [marketplace, checkIsAfterTge]);

  if (!marketplaceData) {
    return null;
  } else if (!marketplace) {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  } else {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full flex-col">
        <div className="flex flex-1 items-stretch">
          <div className="flex w-[328px] flex-col space-y-6 px-6">
            <MarketplaceCard
              className="basic-[218px] h-[218px] shrink-0 grow-0"
              marketplace={marketplace}
            />
            <LeaderBoard className="shrink grow" />
            <div className="shrink-0 grow-0">
              <Image
                src="/img/ad-placeholder-1.png"
                width={280}
                height={160}
                alt="ad1"
                className="rounded-2xl"
              />
            </div>
          </div>
          <div
            className="flex-1"
            style={{
              minHeight: "min(calc(100vh - 156px), 619px)",
              maxHeight: "max(calc(100vh - 156px), 619px)",
            }}
          >
            {isAfterTge ? (
              <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-[#fafafa] p-5">
                <div>
                  <Image
                    src="/img/under-settlement.svg"
                    width={200}
                    height={200}
                    alt="under settlement"
                  />
                </div>
                <div className="text-center text-xl leading-8 text-gray">
                  This project is under settlement. <br />
                  No offer is available.
                </div>
              </div>
            ) : (
              <OrderList marketplace={marketplace} />
            )}
          </div>
          <div className="flex w-[368px] flex-col px-6">
            <MarketTrades marketplace={marketplace} />
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
}
