"use client";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";

import MarketTrades from "@/app/[locale]/marketplace/[...name]/market-trades/market-trades";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";
import OrderList from "@/app/[locale]/marketplace/[...name]/order-list/order-list";
import LeaderBoard from "@/app/[locale]/marketplace/[...name]/leader-board/leader-board";

import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import useTge from "@/lib/hooks/marketplace/useTge";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { useMarketOffers } from "@/lib/hooks/api/use-market-offers";
import { IOffer } from "@/lib/types/offer";

import MarketplaceCard from "./marketplace-card";
import OfferDetailDrawer from "./offer-detail/offer-detail-drawer";
import CreateOfferBtn from "./create-offer-btn";
import MarketCharts from "./chart/market-charts";

export default function Marketplace({ params }: { params: { name: string } }) {
  const mt = useTranslations("pn-Marketplace");
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
  } = useMarketOffers({
    marketAccount: marketplace?.market_place_id || "",
  });

  const canBuyOrders = useMemo(() => {
    const showOrder = (orders || [])?.filter((order: IOffer) =>
      ["virgin", "ongoing", "filled"].includes(order.offer_status),
    );
    const sortO = sortBy(showOrder, "status");

    return sortO;
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
              className="basic-[180px] h-[180px] shrink-0 grow-0"
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
                  {mt("txt-ThisProjectIsUnderSettlement")} <br />
                  {mt("txt-NoOfferIsAvailable")}
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
              isLoading={isMarketLoading}
            />

            <div className="h-[80px] py-4">
              {marketplace && (
                <CreateOfferBtn
                  marketplace={marketplace}
                  onSuccess={refreshOrders}
                />
              )}
            </div>

            {marketplace && <MarketCharts marketplace={marketplace} />}
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
}
