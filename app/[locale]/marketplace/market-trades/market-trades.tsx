"use client";

import { useState } from "react";
import { ITradeType, TradeTypeSelect } from "./trade-type-select";
import { TradesTable } from "./trades-table";
import CreateOfferBtn from "../create-offer-btn";
import MarketCharts from "../chart/market-charts";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";

export default function MarketTrades({
  marketplace,
  onCreateSuccess,
  isLoading = false,
}: {
  marketplace: IMarketplace | undefined;
  onCreateSuccess: () => void;
  isLoading?: boolean;
}) {
  const t = useTranslations("Marketplace");
  const isLoadingFlag = !marketplace || isLoading;
  const [tradeType, setTradeType] = useState<ITradeType>("All");

  function handleTradeTypeChange(t: ITradeType) {
    setTradeType(t);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-[30px] items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">{t("MarketTrades")}</div>
        </div>
        <TradeTypeSelect
          type={tradeType}
          handleTypeChange={handleTradeTypeChange}
        />
      </div>

      <TradesTable
        type={tradeType}
        marketplace={marketplace}
        isLoading={isLoadingFlag}
      />

      <div className="h-[80px] py-4">
        {marketplace && (
          <CreateOfferBtn
            marketplace={marketplace}
            onSuccess={onCreateSuccess}
          />
        )}
      </div>

      {marketplace && <MarketCharts marketplace={marketplace} />}
    </div>
  );
}
