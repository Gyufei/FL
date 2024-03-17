"use client";
import { useState } from "react";
import {
  ISortDir,
  ISortField,
  SortSelect,
} from "../../../components/share/sort-select";
import StockCard from "./stock-card";

export default function MyStocks() {
  const stockDetails = [
    {
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
      status: "canList",
      stableToken: {
        name: "USDC",
        logoURI: "/icons/usdc.svg",
      },
      type: "sell",
      date: "21:01, Feb 2 2023",
      maker: "DL8K2m3nt2WbWiJZTzD8AhqamRovkeSYJy7iYnUoA3Hi",
      order: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
      preOrder: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
    },
    {
      id: 1029832,
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
      status: "canList",
      stableToken: {
        name: "USDC",
        logoURI: "/icons/usdc.svg",
      },
      type: "buy",
      date: "21:01, Feb 2 2023",
      maker: "DL8K2m3nt2WbWiJZTzD8AhqamRovkeSYJy7iYnUoA3Hi",
      order: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
      preOrder: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
    },
    {
      id: 1029833,
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
      status: "listed",
      stableToken: {
        name: "USDC",
        logoURI: "/icons/usdc.svg",
      },
      type: "buy",
      date: "21:01, Feb 2 2023",
      maker: "DL8K2m3nt2WbWiJZTzD8AhqamRovkeSYJy7iYnUoA3Hi",
      order: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
      preOrder: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
    },
    {
      id: 1029834,
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
      status: "listing",
      stableToken: {
        name: "USDC",
        logoURI: "/icons/usdc.svg",
      },
      type: "buy",
      date: "21:01, Feb 2 2023",
    },
    {
      id: 1029834,
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
      status: "canSettle",
      stableToken: {
        name: "USDC",
        logoURI: "/icons/usdc.svg",
      },
      type: "buy",
      date: "21:01, Feb 2 2023",
      maker: "DL8K2m3nt2WbWiJZTzD8AhqamRovkeSYJy7iYnUoA3Hi",
      order: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
      preOrder: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
    },
  ];

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
        {stockDetails.map((stockDetail) => (
          <StockCard key={stockDetail.id} stockDetail={stockDetail} />
        ))}
      </div>
    </div>
  );
}
