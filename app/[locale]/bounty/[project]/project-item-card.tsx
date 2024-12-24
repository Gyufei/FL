"use client";

import React from "react";
import Image from "next/image";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { cn } from "@/lib/utils/common";

export default function ProjectItemCard({ openDetail }: any) {
  const { isMobileSize } = useDeviceSize();

  return (
    <div
      className=" h-[260px] w-[164px] cursor-pointer rounded-lg bg-[#FAFAFA] sm:h-auto sm:w-auto sm:min-w-80 sm:bg-white sm:p-5"
      onClick={openDetail}
    >
      <div className="">
        <Image
          src="/img/mock/image@2x (3).png"
          alt="Project"
          width={320}
          height={164}
          className="h-[164px] w-auto rounded-t-lg object-cover sm:w-full"
        />
      </div>
      <div
        className={cn(
          isMobileSize
            ? "backdrop-filter-[blur(10px)] -mt-[40px] mb-[20px] flex w-fit items-center gap-2 rounded-3xl bg-[#ffffff33] px-2 py-1 text-[#FFFFFF]"
            : "mt-5 flex w-fit items-center gap-2 rounded-3xl bg-[#EFEFEF] px-2 py-1",
        )}
        style={
          isMobileSize
            ? {
                backdropFilter: "blur(10px)",
              }
            : {}
        }
      >
        <Image
          src="/img/mock/矩形 1321@1x.png"
          alt="Base Icon"
          className="h-4 w-4 rounded-full"
          width={16}
          height={16}
        />
        <span className="text-sm">Backpack</span>
      </div>
      <h2 className="mt-2 text-[14px] text-[#2D2E33] sm:text-[18px]">
        Winter Wonderland: Backpack
      </h2>
      <div className="mt-3 flex items-center ">
        <div className="flex -space-x-2">
          <Image
            src="/img/mock/矩形 1321@1x (1).png"
            alt="Avatar 1"
            width={32}
            height={32}
            className="h-5 w-5 rounded-full border-2 border-white sm:h-8 sm:w-8"
          />
          <Image
            src="/img/mock/矩形 1321@1x.png"
            alt="Avatar 2"
            width={32}
            height={32}
            className="h-5 w-5 rounded-full border-2 border-white sm:h-8 sm:w-8"
          />
        </div>
        <div className="ml-1">
          <div className="text-[12px]">10K </div>
          {!isMobileSize && <div className="text-[#99A0AF]">Participants</div>}
        </div>
      </div>
    </div>
  );
}
