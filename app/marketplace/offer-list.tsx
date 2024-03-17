"use client";

import Image from "next/image";
import { useState } from "react";
import { IOfferType, OfferTypeSelect } from "../../components/share/offer-type-select";
import { ISortDir, ISortField, SortSelect } from "../../components/share/sort-select";
import SearchInput from "./search-input";
import { OfferCard } from "./offer-card";

export default function OfferList() {
  const offerDetails = [
    {
      id: 1,
      avatar: "/img/avatar-placeholder-2.png",
      name: "Points",
      no: 123456,
      progress: 0.5,
      offer: 1800,
      offerValue: 0.0232,
      for: 2.2,
      forValue: 240.8,
      pointPrice: 18.84,
      filled: false,
      time: 15,
      type: "sell",
      seller: "DL8K2m3nt2WbWiJZTzD8AhqamRovkeSYJy7iYnUoA3Hi",
      buyer: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
      token: {
        logoURI: "/icons/solana.svg",
      },
      stableToken: {
        logoURI: "/icons/usdc.svg",
      },
      maker: "DL8K2m3nt2WbWiJZTzD8AhqamRovkeSYJy7iYnUoA3Hi",
      order: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
    },
    {
      id: 2,
      avatar: "/img/avatar-placeholder-2.png",
      name: "Points",
      no: 3323212,
      progress: 0.75,
      offer: 1800,
      offerValue: 0.0232,
      for: 2.2,
      forValue: 240.8,
      pointPrice: 18.84,
      filled: false,
      time: 15,
      type: "buy",
      seller: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
      buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
      token: {
        logoURI: "/icons/solana.svg",
      },
      stableToken: {
        logoURI: "/icons/usdc.svg",
      },
      maker: "DL8K2m3nt2WbWiJZTzD8AhqamRovkeSYJy7iYnUoA3Hi",
      order: "7Kb5oAJKedXejv2YXBrYuVPZ7bP2Lipj1sfqkJsKV8BA",
    },
  ];

  const [offerType, setOfferType] = useState<IOfferType>("buy");

  const [sortField, setSortField] = useState<ISortField>("Collateral");
  const [sortDir, setSortDir] = useState<ISortDir>("Descending");

  const [layout, setLayout] = useState<"grid" | "list">("grid");

  function handleTypeChange(t: IOfferType) {
    setOfferType(t);
  }

  function handleSortFieldChange(field: ISortField) {
    setSortField(field);
  }

  function handleSortDirChange(dir: ISortDir) {
    setSortDir(dir);
  }

  function handleSearch(text: string) {
    console.log(text);
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-[#fafafa] p-5">
      <div className="flex items-center justify-between border-b border-[#d8d8d8] py-5">
        <div className="flex items-center space-x-4">
          <OfferTypeSelect
            type={offerType}
            handleTypeChange={handleTypeChange}
          />
          <SortSelect
            sortField={sortField}
            sortDir={sortDir}
            handleSortFieldChange={handleSortFieldChange}
            handleSortDirChange={handleSortDirChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <SearchInput handleSearch={handleSearch} />
          <div
            data-active={layout === "list"}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full data-[active=true]:bg-white"
          >
            <Image
              src={
                layout === "list" ? "/icons/menu.svg" : "/icons/menu-gray.svg"
              }
              width={20}
              height={20}
              alt="menu"
              onClick={() => setLayout("list")}
            />
          </div>
          <div
            data-active={layout === "grid"}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full data-[active=true]:bg-white"
          >
            <Image
              src={
                layout === "grid" ? "/icons/grid.svg" : "/icons/grid-gray.svg"
              }
              width={20}
              height={20}
              alt="menu"
              onClick={() => setLayout("grid")}
            />
          </div>
        </div>
      </div>

      <div className="no-scroll-bar mt-5 grid flex-1 grid-cols-2 gap-5 overflow-y-auto">
        {offerDetails.map((offerDetail) => (
          <OfferCard offerDetail={offerDetail} key={offerDetail.id} />
        ))}
      </div>
    </div>
  );
}