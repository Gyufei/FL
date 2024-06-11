"use client";

import Image from "next/image";
import NewestItemCard from "./newest-item-card";

export default function HomeBanner() {
  return (
    <div
      className="flex h-[680px] flex-col items-center pt-[156px]"
      style={{
        backgroundImage: "url(/img/home-bg-1.png)",
      }}
    >
      <div className="text-7xl leading-[72px] text-black">
        The First Pre SuperMarket
      </div>

      <div className="mt-10 text-xl leading-[30px] text-lightgray">
        FASTEST DATA · DEEPEST LIQUIDITY · FUN REWARDS
      </div>

      <div className="mt-10 flex items-center space-x-5">
        <div className="flex h-12 w-[160px] items-center justify-center rounded-xl bg-yellow text-lg leading-6">
          Get Start
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-lg leading-6 text-black">Read the docs</div>
          <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
        </div>
      </div>

      <NewestItemCard />

    </div>
  );
}
