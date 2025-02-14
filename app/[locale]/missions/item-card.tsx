"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/common";
import { getFormatUnit } from "@/lib/utils/number";

export default function BackpackHeader({
  bgColor,
  participants,
  logo,
  showParticipants,
  taskNum,
  name,
  click,
}: any) {
  return (
    <div className="cursor-pointer text-[#2D2E33]">
      <div
        className={cn(
          "rounded-lg bg-white p-4 transition-shadow hover:shadow-lg",
          bgColor,
        )}
        onClick={click}
      >
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={logo}
              alt="Backpack icon"
              className="rounded-lg object-contain"
              fill
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[14px] text-[#2D2E33] sm:text-[18px]">
              {name}
            </h2>
            {showParticipants ? (
              <div className="text-muted-foreground flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-white">
                    <Image
                      src="/img/mock/矩形 1321@1x (1).png"
                      alt="Participant 1"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-white">
                    <Image
                      src="/img/mock/矩形 1321@1x.png"
                      alt="Participant 2"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-[12px] text-[#99A0AF] sm:text-[14px]">
                  {getFormatUnit(participants).number +
                    getFormatUnit(participants).unit}{" "}
                  Participants
                </span>
              </div>
            ) : (
              <div className="flex items-center text-[12px] text-[#99A0AF] sm:text-[14px]">
                {taskNum} Bounties
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
