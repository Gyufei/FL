"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";

import LeaderBoard from "@/app/[locale]/marketplace/[...name]/leader-board/leader-board";
import AdBanner from "./ad-banner";
import OfferList from "@/app/[locale]/marketplace/[...name]/offer-list/offer-list";
import MarketplaceCard from "./marketplace-card";
import OfferDetailDrawer from "./offer-detail/offer-detail-drawer";
import CreateOfferBtn from "./create-offer-btn";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";
import MarketTrades from "@/app/[locale]/marketplace/[...name]/market-trades/market-trades";
import MarketCharts from "./chart/market-charts";

import useTge from "@/lib/hooks/marketplace/useTge";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { useMarketOffers } from "@/lib/hooks/api/use-market-offers";
import { IOffer } from "@/lib/types/offer";

import { IMarketplace } from "@/lib/types/marketplace";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function MarketplaceContent({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  const mt = useTranslations("pn-Marketplace");

  const { isMobile } = useDeviceSize();
  const [activePanel, setActivePanel] = useState("Transaction");

  function checkIsActive(name: string) {
    if (!isMobile) return true;

    return activePanel === name;
  }

  const {
    data: offers,
    mutate: refreshOffers,
    isLoading: isOffersLoading,
  } = useMarketOffers({
    marketSymbol: marketplace?.market_symbol || "",
    marketChain: marketplace.chain,
  });

  const canBuyOffers = useMemo(() => {
    const showOffer = (offers || [])?.filter((ord: IOffer) =>
      ["virgin", "ongoing", "filled"].includes(ord.status),
    );
    const sortO = sortBy(showOffer, "status");

    return sortO;
  }, [offers]);

  const { anchor: offerId } = useAnchor();

  const anchorOffer = useMemo(() => {
    return offers?.find((o) => String(o.entry.id) === offerId);
  }, [offers, offerId]);

  const { checkIsAfterTge } = useTge();

  const isAfterTge = useMemo(() => {
    if (!marketplace) return false;
    return checkIsAfterTge(
      marketplace.tge,
      Number(marketplace.settlement_period),
    );
  }, [marketplace, checkIsAfterTge]);

  if (marketplace && offers && offerId && !anchorOffer) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center sm:h-[calc(100vh-96px)]">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-96px)]">
      <div className="relative block sm:hidden">
        {marketplace && (
          <CreateOfferBtn marketplace={marketplace} onSuccess={refreshOffers} />
        )}
      </div>
      <div className="flex flex-1 items-stretch pt-4 sm:pt-0">
        {checkIsActive("Transaction") && (
          <div className="flex w-full flex-col space-y-6 px-6 sm:w-[328px]">
            <MarketplaceCard
              className="basic-[180px] h-[180px] shrink-0 grow-0"
              marketplace={marketplace}
            />
            <LeaderBoard
              marketplaceId={marketplace.market_place_account}
              chain={marketplace.chain}
              className="shrink grow"
            />
            <AdBanner className="shrink grow-0" />
          </div>
        )}
        {checkIsActive("Items") && (
          <div
            className="flex-1"
            style={{
              minHeight: isMobile
                ? "calc(100vh - 175px)"
                : "min(calc(100vh - 156px), 691px)",
              maxHeight: isMobile
                ? "calc(100vh - 175px)"
                : "min(calc(100vh - 156px), 691px)",
              // "max(calc(100vh - 156px), 691px)",
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
                <OfferList
                  offers={canBuyOffers || []}
                  isLoading={isOffersLoading}
                />
                <OfferDetailDrawer
                  offers={offers || []}
                  onSuccess={refreshOffers}
                />
              </>
            )}
          </div>
        )}
        {(checkIsActive("MarketTrades") || checkIsActive("Charts")) && (
          <div className="flex w-full flex-col px-6 sm:w-[368px]">
            {checkIsActive("MarketTrades") && (
              <MarketTrades marketplace={marketplace} />
            )}

            <div className="hidden h-[80px] py-4 sm:block">
              {marketplace && (
                <CreateOfferBtn
                  marketplace={marketplace}
                  onSuccess={refreshOffers}
                />
              )}
            </div>

            {checkIsActive("Charts") && marketplace && (
              <MarketCharts marketplace={marketplace} />
            )}
          </div>
        )}
      </div>
      <PageFooter className="hidden sm:flex" />
      <MobileFooter activePanel={activePanel} setActivePanel={setActivePanel} />
    </div>
  );
}

function MobileFooter({
  activePanel,
  setActivePanel,
}: {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}) {
  const pt = useTranslations("page-MarketList");
  const isActiveTx = activePanel === "Transaction";
  const isActiveItems = activePanel === "Items";
  const isActiveTrades = activePanel === "MarketTrades";
  const isActiveChart = activePanel === "Charts";

  return (
    <div
      className="flex h-14 w-full justify-between bg-white py-2 sm:hidden"
      style={{
        boxShadow: "0px -10px 20px 0px rgba(14, 4, 62, 0.02)",
      }}
    >
      <div
        onClick={() => setActivePanel("Transaction")}
        className="flex flex-1 flex-col items-center justify-center gap-y-[2px]"
      >
        <Image
          src={"/icons/items.svg"}
          width={20}
          height={20}
          alt="tx"
          data-active={isActiveTx}
          className="data-[active=false]:opacity-40"
        />
        <div
          data-active={isActiveTx}
          className="w-fit text-xs leading-[18px] text-[#2D2E33] data-[active=false]:opacity-40"
        >
          {pt("menu-Transaction")}
        </div>
      </div>
      <div
        onClick={() => setActivePanel("Items")}
        className="flex flex-1 flex-col items-center justify-center gap-y-[2px]"
      >
        <Image
          src={"/icons/items.svg"}
          width={20}
          height={20}
          alt="items"
          data-active={isActiveItems}
          className="data-[active=false]:opacity-40"
        />
        <div
          data-active={isActiveItems}
          className="w-fit text-xs leading-[18px] text-[#2D2E33] data-[active=false]:opacity-40"
        >
          {pt("menu-Items")}
        </div>
      </div>
      <div
        onClick={() => setActivePanel("MarketTrades")}
        className="flex flex-1 flex-col items-center justify-center gap-y-[2px]"
      >
        <Image
          src={"/icons/trades.svg"}
          width={20}
          height={20}
          alt="trades"
          data-active={isActiveTrades}
          className="data-[active=false]:opacity-40"
        />
        <div
          data-active={isActiveTrades}
          className="w-fit text-xs leading-[18px] text-[#2D2E33] data-[active=false]:opacity-40"
        >
          {pt("menu-MarketTrades")}
        </div>
      </div>
      <div
        onClick={() => setActivePanel("Charts")}
        className="flex flex-1 flex-col items-center justify-center gap-y-[2px]"
      >
        <Image
          src={"/icons/charts.svg"}
          width={20}
          height={20}
          alt="trending-assets"
          data-active={isActiveChart}
          className="data-[active=false]:opacity-40"
        />
        <div
          data-active={isActiveChart}
          className="w-fit text-xs leading-[18px] text-[#2D2E33] data-[active=false]:opacity-40"
        >
          {pt("menu-Charts")}
        </div>
      </div>
    </div>
  );
}
