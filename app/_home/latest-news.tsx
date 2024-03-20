"use client";

import Image from "next/image";
import { range } from "lodash";
import { formatTimestampEn } from "@/lib/utils/time";

export default function LatestNews() {
  const newDetail = {
    date: 1674259200000,
    title: "How Did My Audit Go?",
    subTitle: "A Framework For Evaluating Audit Effectiveness.",
    content:
      "Right now the process of choosing and recommending audit firms in the blockchain space is opaque. Sticking to the values of Web3, we want to demystify the selection process and introduce quantifiable metrics for audit effectiveness, there by enhancing trust and reliability within the blockchain ecosystem.",
  };
  return (
    <div className="mt-[120px] px-[120px]">
      <div className="text-center text-4xl leading-[54px] text-black">
        Latest from Tadle Market
      </div>

      <div className="mt-5 grid grid-cols-2 gap-10">
        {range(2).map((i) => (
          <NewCard newDetail={newDetail} key={i} />
        ))}
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
