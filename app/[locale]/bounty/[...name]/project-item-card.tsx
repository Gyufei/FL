"use client";

import React from "react";
import Image from "next/image";

export default function ProjectItemCard({ openDetail }: any) {
  return (
    <div
      className="min-w-80 rounded-lg bg-white p-5 shadow-md"
      onClick={openDetail}
    >
      <div className="relative">
        <Image
          src="/img/mock/image@2x (3).png"
          alt="Project"
          width={320}
          height={200}
          className="w-full rounded-t-lg"
        />
      </div>
      <div className="mt-5 flex w-fit items-center gap-2 rounded-3xl bg-[#EFEFEF] px-2 py-1">
        <Image
          src="/img/mock/矩形 1321@1x.png"
          alt="Base Icon"
          className="h-4 w-4 rounded-full"
          width={16}
          height={16}
        />
        <span className="text-sm font-medium">Backpack</span>
      </div>
      <h2 className="mt-2 text-[18px] text-[#2D2E33]">
        Winter Wonderland: Backpack
      </h2>
      <div className="mt-3 flex items-center ">
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
        <div className="ml-3">
          <div className="">10K </div>
          <div className="text-[#99A0AF]">Participants</div>
        </div>
      </div>
    </div>
  );
}
