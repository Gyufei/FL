import Image from "next/image";
import { IPoint } from "@/lib/types/token";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

export function PointTokenSelectDisplay({
  points,
  point,
  setPoint,
}: {
  points: Array<IPoint> | undefined;
  point: IPoint | null;
  setPoint: (_t: IPoint) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  const handleSelectPoint = (t: IPoint) => {
    setPoint(t);
    setPopOpen(false);
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <div className="flex cursor-pointer items-center rounded-full bg-[#F0F1F5] p-2">
          {point ? (
            <>
              <Image
                width={24}
                height={24}
                src={point?.logoURI || ""}
                alt="select token"
                className="mr-2 rounded-full"
              ></Image>
              <div className="overflow-x-hidden whitespace-nowrap pr-[4px] text-sm leading-5 text-black">
                {point?.symbol || ""}
              </div>
            </>
          ) : (
            <>
              <Skeleton className="mr-2 h-6 w-6 rounded-full" />
              <div className="h-5 w-6"></div>
            </>
          )}
          <div className="flex h-6 w-6 items-center justify-center">
            <Image src="/icons/down.svg" width={16} height={16} alt="arrow" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-[103] flex w-[140px] flex-col items-stretch border-0 bg-white p-2"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {(points || []).map((t) => (
          <div
            key={t.symbol}
            onClick={() => handleSelectPoint(t)}
            className="flex h-8 cursor-pointer items-center rounded-xl px-1 text-sm text-black hover:bg-[#f5f6f7]"
          >
            <Image
              width={24}
              height={24}
              src={t?.logoURI || ""}
              alt="select token"
              className="mr-2 rounded-full"
            ></Image>
            {t.symbol}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
