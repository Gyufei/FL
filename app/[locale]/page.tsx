"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";
import MobilePageFooter, {
  IMobilePanel,
} from "@/app/[locale]/_page-layout/_page-footer/page-footer-mobile";

import PointMarket from "@/app/[locale]/[market]/point-market";
import GemsMarket from "@/app/[locale]/[market]/gems-market";
import TrendingAsset from "@/app/[locale]/[market]/trending-asset";

export default function Marketplace() {
  const { isMobileSize } = useDeviceSize();

  const pt = useTranslations("page-MarketList");

  const mobilePanels: Array<IMobilePanel> = useMemo(
    () => [
      {
        name: "market",
        icon: "/icons/point-market.svg",
        label: pt("cap-PointMarket"),
      },
      {
        name: "assets",
        icon: "/icons/trending-assets.svg",
        label: pt("cap-TrendingAssets"),
      },
    ],
    [pt],
  );

  const [activePanel, setActivePanel] = useState(mobilePanels[0].name);

  function checkIsActive(name: string) {
    if (!isMobileSize) return true;

    return activePanel === name;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-96px)]">
      {/* <MobileMarketBreadcrumb /> */}
      <div className="flex flex-1 items-stretch">
        {checkIsActive("market") && (
          <div className="flex flex-1 flex-col overflow-auto border-r border-[#EEEEEE] pl-4 sm:pl-6 sm:pr-5">
            <PointMarket />
            <GemsMarket />
          </div>
        )}
        {checkIsActive("assets") && (
          <div className="flex w-full flex-col px-4 sm:w-[368px] sm:px-6">
            <TrendingAsset />
          </div>
        )}
      </div>
      <PageFooter className="hidden sm:flex" />
      <MobilePageFooter
        panels={mobilePanels}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
    </div>
  );
}
