"use client";

import { useState } from "react";
import { ITradeType, TradeTypeSelect } from "./trade-type-select";
import { TradesTable } from "./trades-table";
import CreateOfferBtn from "./create-offer-btn";
import KLineChart from "./k-line-chart";
import { IMarketplace } from "@/lib/types/marketplace";

const data = [
  {
    time: 60,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    amount: 12312,
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
  {
    time: 21,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    amount: 12312,
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
  {
    time: 3600,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    amount: 12312,
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
];

const trades = new Array(10).fill(data).flat();

export default function MarketTrades({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  const [tradeType, setTradeType] = useState<ITradeType>("All");

  function handleTradeTypeChange(t: ITradeType) {
    setTradeType(t);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">Market Trades</div>
        </div>
        <TradeTypeSelect
          type={tradeType}
          handleTypeChange={handleTradeTypeChange}
        />
      </div>
      <TradesTable trades={trades} />

      <div className="py-6">
        <CreateOfferBtn marketplace={marketplace} />
      </div>

      <KLineChart />
    </div>
  );
}
