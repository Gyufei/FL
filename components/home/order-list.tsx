"use client";

import Image from "next/image";
import { range } from "lodash";
import { formatNum } from "@/lib/utils/number";

export default function OrderList() {
  const orderDetail = {
    avatar: "/img/avatar-placeholder.png",
    name: "Open Solmap",
    spread: -1.74,
    buyNow: 0.18,
    sellNow: 0.19,
    listed: 36811,
    listedPercent: 15,
    marketCap: 44819,
    dayVol: 8821,
  };

  return (
    <div className="mt-6 grid grid-cols-4 gap-x-5 gap-y-9 px-[120px]">
      {range(8).map((i) => (
        <OrderCard key={i} orderDetail={orderDetail} />
      ))}
    </div>
  );
}

function OrderCard({ orderDetail }: { orderDetail: Record<string, any> }) {
  return (
    <div
      className="relative rounded-3xl p-5 pt-3"
      style={{
        background:
          "linear-gradient(180deg, #F0F1F5 0%, rgba(240, 241, 245, 0.5) 100%)",
      }}
    >
      <Image
        src={orderDetail.avatar}
        width={72}
        height={72}
        className="absolute -top-4 left-4 rounded-3xl"
        alt="avatar"
      />

      <div className="flex items-start justify-between pl-20">
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <div className="text-lg leading-[26px] text-black">
              {orderDetail.name}
            </div>
            <div className="text-xs leading-[18px] text-gray">
              <span>Spread:</span>
              <span>{orderDetail.spread}%</span>
            </div>
          </div>
        </div>

        <Image
          src="/icons/star.svg"
          width={20}
          height={20}
          alt="star"
          className="mt-[3px]"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <LabelText>Buy Now</LabelText>
          <div className="leading-6 text-green">{orderDetail.buyNow}</div>
        </div>
        <div>
          <LabelText>Sell Now</LabelText>
          <div className="text-right leading-6 text-red">
            {orderDetail.sellNow}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <LabelText>Listed #</LabelText>
          <div className="leading-6 text-black">{orderDetail.listed}</div>
        </div>
        <div>
          <LabelText>Listed %</LabelText>
          <div className="text-right leading-6 text-black">
            {orderDetail.listedPercent}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <LabelText>Market Cap</LabelText>
          <div className="leading-6 text-black">
            {formatNum(orderDetail.marketCap)}
          </div>
        </div>
        <div>
          <LabelText>24h Volume</LabelText>
          <div className="text-right leading-6 text-black">
            {formatNum(orderDetail.dayVol)}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs leading-[18px] text-gray">{children}</div>
  );
}
