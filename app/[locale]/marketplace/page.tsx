"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageFooter from "../_page-layout/_page-footer";
import PointMarket from "./point-market";
import TrendingAsset from "./trending-asset";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function Marketplace() {
  const { isMobile } = useDeviceSize();
  const [activePanel, setActivePanel] = useState("market");

  function checkIsActive(name: string) {
    if (!isMobile) return true;

    return activePanel === name;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-96px)]">
      <MobileBreadcrumb />
      <div className="flex flex-1 items-stretch">
        {checkIsActive("market") && (
          <div className="flex flex-1 flex-col pl-4 sm:pl-6">
            <PointMarket />
          </div>
        )}
        {checkIsActive("assets") && (
          <div className="flex w-full flex-col px-4 sm:w-[368px] sm:px-6">
            <TrendingAsset />
          </div>
        )}
      </div>
      <PageFooter className="hidden sm:flex" />
      <MobileFooter activePanel={activePanel} setActivePanel={setActivePanel} />
    </div>
  );
}

function MobileBreadcrumb() {
  const ht = useTranslations("Header");

  return (
    <div className="mb-[10px] mt-4 flex items-center pl-4 sm:hidden">
      <div className="text-base leading-6 text-[#99a0af]">
        {ht("btn-Marketplace")}
        <span className="inline-block px-2">&gt;</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-base leading-6 text-[#2d2e33]">Point</span>
        <Image
          src="/icons/down-arrow.svg"
          width={20}
          height={20}
          alt="down-arrow"
        />
      </div>
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
  const isActiveMarket = activePanel === "market";
  const isActiveAssets = activePanel === "assets";

  return (
    <div
      className="flex h-14 w-full justify-between bg-white sm:hidden"
      style={{
        boxShadow: "0px -10px 20px 0px rgba(14, 4, 62, 0.02)",
      }}
    >
      <div
        onClick={() => setActivePanel("market")}
        className="flex flex-1 flex-col items-center justify-center gap-y-[2px]"
      >
        <Image
          src={"/icons/point-market.svg"}
          width={20}
          height={20}
          alt="point-market"
          data-active={isActiveMarket}
          className="data-[active=false]:opacity-40"
        />
        <div
          data-active={isActiveMarket}
          className="w-fit text-xs leading-[18px] text-[#2D2E33] data-[active=false]:opacity-40"
        >
          {pt("cap-PointMarket")}
        </div>
      </div>
      <div
        onClick={() => setActivePanel("assets")}
        className="flex flex-1 flex-col items-center justify-center gap-y-[2px]"
      >
        <Image
          src={"/icons/trending-assets.svg"}
          width={20}
          height={20}
          alt="trending-assets"
          data-active={isActiveAssets}
          className="data-[active=false]:opacity-40"
        />
        <div
          data-active={isActiveAssets}
          className="w-fit text-xs leading-[18px] text-[#2D2E33] data-[active=false]:opacity-40"
        >
          {pt("cap-TrendingAssets")}
        </div>
      </div>
    </div>
  );
}
