"use client";
import Image from "next/image";
import MarketTrades from "@/app/marketplace/market-trades";
import PageFooter from "@/app/_page-layout/_page-footer";
import OrderList from "@/app/marketplace/order-list";
import LeaderBoard from "@/app/marketplace/leader-board";
import { useSearchParams } from "next/navigation";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useRouter } from "next/navigation";
import MarketplaceCard from "./marketplace-card";

export default function Marketplace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const marketplaceId = searchParams.get("marketplaceId");

  const { data: marketplaceData } = useMarketplaces();

  if (!marketplaceId && marketplaceData) {
    router.push(
      `/marketplace?marketplaceId=${marketplaceData[0].market_place_id}`,
    );
  }

  const marketplace = marketplaceData?.find(
    (marketplace) => marketplace.market_place_id === marketplaceId,
  );

  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="flex w-[368px] flex-col space-y-6 px-6">
          {marketplace && <MarketplaceCard marketplace={marketplace} />}
          <LeaderBoard />
          <div>
            <Image src="/img/point-fi.svg" width={280} height={160} alt="fi" />
          </div>
        </div>
        <div className="max-h-[734px] flex-1 ">
          {marketplace && <OrderList marketplace={marketplace} />}
        </div>
        <div className="w-[368px] px-6">
          <MarketTrades />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
