"use client";
import { useState } from "react";
import {
  ISortDir,
  ISortField,
  SortSelect,
} from "../../../components/share/sort-select";
import { range } from "lodash";
import StockCard from "../../../components/dashboard/stock-card";

export default function MyStocks() {
  const stockDetail = {
    id: 1029831,
    avatar: "/img/avatar-placeholder-2.png",
    token: {
      logoURI: "/icons/solana.svg",
    },
    name: "Points",
    no: 123456,
    offer: 644,
    offerPrice: 0.0232,
    for: 2.2,
    forAmount: 240.8,
    listedTimes: 4,
    status: "notList",
    stableToken: {
      name: "USDC",
      logoURI: "/icons/usdc.svg",
    },
    type: "sell",
    date: "21:01, Feb 2 2023",
  };

  const [sortField, setSortField] = useState<ISortField>("Collateral");
  const [sortDir, setSortDir] = useState<ISortDir>("Descending");

  function handleSortFieldChange(field: ISortField) {
    setSortField(field);
  }

  function handleSortDirChange(dir: ISortDir) {
    setSortDir(dir);
  }

  return (
    <div className="ml-5 flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="text-xl leading-[30px] text-black">My Stocks</div>
        <SortSelect
          sortField={sortField}
          sortDir={sortDir}
          handleSortFieldChange={handleSortFieldChange}
          handleSortDirChange={handleSortDirChange}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 border-t border-[#eee] pt-5 sm:grid-cols-3 md:grid-cols-4">
        {range(9).map((i) => (
          <StockCard key={i} stockDetail={stockDetail} />
        ))}
      </div>
    </div>
  );
}
