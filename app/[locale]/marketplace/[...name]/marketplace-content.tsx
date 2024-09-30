"use client";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";

import LeaderBoard from "@/app/[locale]/marketplace/[...name]/leader-board/leader-board";
import AdBanner from "./ad-banner";
import OrderList from "@/app/[locale]/marketplace/[...name]/order-list/order-list";
import MarketplaceCard from "./marketplace-card";
import OfferDetailDrawer from "./offer-detail/offer-detail-drawer";
import CreateOfferBtn from "./create-offer-btn";
// import MarketTrades from "@/app/[locale]/marketplace/[...name]/market-trades/market-trades";
// import MarketCharts from "./chart/market-charts";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";

import useTge from "@/lib/hooks/marketplace/useTge";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { useMarketOffers } from "@/lib/hooks/api/use-market-offers";
import { IOffer } from "@/lib/types/offer";

import { IMarketplace } from "@/lib/types/marketplace";

export default function MarketplaceContent({
  marketplace,
  isMarketLoading,
}: {
  marketplace: IMarketplace;
  isMarketLoading: boolean;
}) {
  const mt = useTranslations("pn-Marketplace");

  const {
    data: orders,
    mutate: refreshOrders,
    isLoading: isOrdersLoading,
  } = useMarketOffers({
    marketAccount: marketplace?.market_place_id || "",
  });

  const canBuyOrders = useMemo(() => {
    const showOrder = (orders || [])?.filter((ord: IOffer) =>
      ["virgin", "ongoing", "filled"].includes(ord.offer_status),
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

  if (marketplace && orders && orderId && !anchorOrder) {
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
            <div className="h-fit">
              {marketplace && (
                <CreateOfferBtn
                  marketplace={marketplace}
                  onSuccess={refreshOrders}
                />
              )}
            </div>
            <LeaderBoard isLoading={isMarketLoading} className="shrink grow" />
            <AdBanner className="shrink grow-0" />
          </div>
          <div
            className="flex-1"
            style={{
              minHeight: "min(calc(100vh - 156px), 691px)",
              maxHeight: "max(calc(100vh - 156px), 691px)",
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
                <OrderList
                  orders={canBuyOrders || []}
                  isLoading={isMarketLoading || isOrdersLoading}
                />
                <OfferDetailDrawer
                  orders={orders || []}
                  onSuccess={refreshOrders}
                />
              </>
            )}
          </div>
          {/* <div className="flex w-[368px] flex-col px-6">
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
          </div> */}
        </div>
        <PageFooter />
      </div>
    );
  }
}
