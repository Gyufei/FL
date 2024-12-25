"use client";

import { Check, Gift } from "lucide-react";
import Image from "next/image";

export default function ProjectOptions() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6 text-[14px]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E8FF81] text-[16px]" />
        <h1 className="text-[16px]">Finish All Steps</h1>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {/* Step 1 - Completed */}
        <div className="flex items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8FF81]">
            <Check className="h-5 w-5" />
          </div>
          <span className="font-medium">Intro to Backpack</span>
        </div>

        {/* Step 2 - Current */}
        <div className="flex items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8FF81]">
            <span className="font-medium">2</span>
          </div>
          <span className="font-medium">Use Backpack Wallet</span>
        </div>

        {/* Step 3 - Locked */}
        <div
          className="flex items-center gap-3 rounded-xl bg-[#fafafa] p-3 shadow-sm"
          style={{ opacity: 0.6 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F1F5]">
            <span className="font-medium">3</span>
          </div>
          <span className="flex-grow">Transact using Backpack</span>
          <Image
            src="/icons/locks-close.svg"
            alt="locks"
            width={28}
            height={28}
            className="h-[28px] w-[28px]"
          />
        </div>

        {/* Step 4 - Locked */}
        <div
          className="flex items-center gap-3 rounded-xl bg-[#fafafa] p-3 shadow-sm"
          style={{ opacity: 0.6 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F1F5]">
            <Gift className="h-5 w-5" />
          </div>
          <span className="flex-grow font-medium">Claim Credits</span>
          <div className="flex items-center justify-center rounded-lg">
            <Image
              src="/icons/locks-close.svg"
              alt="locks"
              width={28}
              height={28}
              className="h-[28px] w-[28px]"
            />
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="rounded-xl bg-[#fafafa] p-5">
        <div className="mb-1 text-[#99A0AF]">Rewards</div>
        <div className="text-[16px] text-[#2D2E33]">tldBack 24</div>
      </div>

      {/* Participants Section */}
      <div className="flex items-center justify-between  rounded-xl bg-[#fafafa] p-5 ">
        <span className="">Participants</span>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <Image
              src="/img/mock/矩形 1321@1x (1).png"
              alt="Avatar 1"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <Image
              src="/img/mock/矩形 1321@1x.png"
              alt="Avatar 2"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-white"
            />
          </div>
          <span className="font-medium">10K</span>
        </div>
      </div>
    </div>
  );
}
