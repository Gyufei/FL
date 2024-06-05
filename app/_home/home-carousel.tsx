"use client";

import Image from "next/image";

export default function HomeCarousel() {
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

      <div className="text-xl leading-[30px] text-lightgray mt-10">
        FASTEST DATA · DEEPEST LIQUIDITY · FUN REWARDS
      </div>

      <div>
        <div>Get Start</div>
        <div>
          <div className="text-sm leading-5 text-lightgray">Read</div>
          <Image src="/icons/right-go.svg" width={16} height={16} alt="read" />
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <div>Item ID</div>
          <div>Asset</div>
          <div>Value</div>
        </div>
        <div>
          <div>79818182</div>
          <div></div>
          <div>Value</div>
        </div>
      </div>
    </div>
  );
}
