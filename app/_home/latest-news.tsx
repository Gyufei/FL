"use client";

import Image from "next/image";
import { range } from "lodash";
import { formatTimestampEn } from "@/lib/utils/time";

export default function LatestNews() {
  const postSummary1 = {
    date: 1710057600000,
    title: "Introducing Tax Income",
    subTitle: "Achieve passive income with non-performing assets",
    content:
      "Tax income is implemented on Tadle Market as an incentive for users to contribute liquidity to the market. For instance, consider a scenario where user A holds reward points from a reputable project and places a Sells/Asks order. When another user fulfills this order as a buyer, they will pay a tax income fee to user A. This system encourages participation and liquidity provision, benefiting both buyers and sellers within the marketplace ecosystem. The tax income ratio can be pre-set by the user when providing liquidity and placing post-only orders.",
  };
  const postSummary2 = {
    date: 1707379200000,
    title: "Introducing Flexibility Features",
    subTitle: "Bring Upfront Liquidity to Vesting Allocations",
    content: `
      Users on Tadle Market benefit from extensive flexibility when engaging in trading activities. For instance, a buyer of a specific order can subsequently opt to sell it on the market to optimize their returns. This flexibility empowers users to adapt their strategies according to market conditions and their individual investment objectives, thereby maximizing their potential profits within the Tadle Market ecosystem.
      The tax income and collateral parameters are customizable and can be set in advance during the order creation process. This feature allows users to define specific tax income and collateral requirements according to their preferences and needs, providing greater flexibility and control over their transactions.By parameterizing these aspects, Tadle Market empowers users to tailor their orders to meet specific objectives, whether it's maximizing profits, managing risks, or optimizing liquidity. This customization capability enhances the overall user experience and facilitates seamless execution of trades on the platform. 
      `,
  };
  return (
    <div className="mt-[120px] px-[120px]">
      <div className="text-center text-4xl leading-[54px] text-black">
        Latest from Tadle Market
      </div>

      <div className="mt-5 grid grid-cols-2 gap-10">
        <NewCard newDetail={postSummary1} key={1} />
        <NewCard newDetail={postSummary2} key={2} />
      </div>
    </div>
  );
}

function NewCard({ newDetail }: { newDetail: Record<string, any> }) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute -bottom-5 -right-5 h-full w-full rounded-3xl opacity-60"
        style={{
          background:
            "linear-gradient(180deg, #F0F1F5 0%, rgba(240, 241, 245, 0.2) 100%)",
        }}
      ></div>
      <div
        className="new-border-image-radius z-0 rounded-3xl p-6"
        style={{
          backdropFilter: "blur(100px)",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="text-sm leading-5 text-lightgray">
          {formatTimestampEn(newDetail.date)}
        </div>
        <div className="mt-3 w-fit rounded-lg bg-yellow px-3 pt-2 pb-1 text-2xl leading-9 text-black">
          {newDetail.title}
        </div>
        <div className="mt-2 pr-10 text-2xl leading-9 text-black">
          {newDetail.subTitle}
        </div>
        <div className="mt-[10px] text-sm leading-5 text-lightgray">
          {newDetail.content}
        </div>
        <div className="mt-[22px] flex justify-between">
          <div className="h-1 w-[40px] rounded-full bg-lightgray"></div>
          <div className="flex cursor-pointer items-center space-x-[6px]">
            <div className="text-sm leading-5 text-lightgray">Read</div>
            <Image
              src="/icons/right-go.svg"
              width={16}
              height={16}
              alt="read"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
