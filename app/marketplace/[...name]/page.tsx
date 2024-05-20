"use client";
import Image from "next/image";
import MarketTrades from "@/app/marketplace/market-trades/market-trades";
import PageFooter from "@/app/_page-layout/_page-footer";
import OrderList from "@/app/marketplace/order-list/order-list";
import LeaderBoard from "@/app/marketplace/leader-board/leader-board";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplaceCard from "../marketplace-card";
import useTge from "@/lib/hooks/marketplace/useTge";
import { useMemo } from "react";
import OfferDetailDrawer from "../offer-detail/offer-detail-drawer";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { useMarketplaceOffers } from "@/lib/hooks/api/use-marketplace-offers";
import { IOffer } from "@/lib/types/order";

export default function Marketplace({ params }: { params: { name: string } }) {
  const marketplaceName = decodeURIComponent(params.name[0]);

  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const marketplace = marketplaceData?.find(
    (marketplace) => marketplace.market_id === marketplaceName,
  );

  const {
    data: orders,
    mutate: refreshOrders,
    isLoading: isOrdersLoading,
  } = useMarketplaceOffers({
    marketAccount: marketplace?.market_place_id || "",
  });

  const canBuyOrders = useMemo(() => {
    return (orders || [])?.filter((order: IOffer) =>
      ["virgin", "ongoing"].includes(order.offer_status),
    );
  }, [orders]);

  const { anchor: orderId } = useAnchor();

  const anchorOrder = useMemo(() => {
    return orders?.find((o) => o.offer_id === orderId);
  }, [orders, orderId]);

  const { checkIsAfterTge } = useTge();

  const isAfterTge = useMemo(() => {
    if (!marketplace) return false;
    return checkIsAfterTge(
      marketplace.tge,
      Number(marketplace.settlement_period),
    );
  }, [marketplace, checkIsAfterTge]);

  if (
    marketplaceData &&
    (!marketplace || (marketplace && orders && orderId && !anchorOrder))
  ) {
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
              isLoading={isMarketLoading}
            />
            <LeaderBoard isLoading={isMarketLoading} className="shrink grow" />
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
              <>
                <OfferDetailDrawer
                  orders={orders || []}
                  onSuccess={refreshOrders}
                />
                <OrderList
                  orders={canBuyOrders || []}
                  isLoading={isMarketLoading || isOrdersLoading}
                />
              </>
            )}
          </div>
          <div className="flex w-[368px] flex-col px-6">
            <MarketTrades
              marketplace={marketplace}
              onCreateSuccess={refreshOrders}
              isLoading={isMarketLoading}
            />
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
}
