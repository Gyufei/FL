import Image from "next/image";
import { CircleProgress } from "../../components/share/circle-progress";
import { formatNum } from "@/lib/utils/number";
import HoverIcon from "../../components/share/hover-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import OfferBuyBtn from "./offer-buy-btn";

function formatTime(seconds: number) {
  const secs = seconds % 60;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${secs}s`;
  }
}

export function OfferCard({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  return (
    <div className="h-fit rounded-[20px] bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={offerDetail.avatar}
              width={56}
              height={56}
              alt="avatar"
              className="rounded-full"
            />
            <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-white">
              <Image
                src={offerDetail.token.logoURI}
                width={8.8}
                height={7.2}
                alt="avatar"
                className="rounded-full"
              />
            </div>
          </div>

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {offerDetail.name}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{offerDetail.no}
            </div>
          </div>
        </div>

        <div className="relative">
          <CircleProgress percentage={offerDetail.progress * 100} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs leading-[18px] text-gray">
            {offerDetail.progress * 100}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">Offer</div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(offerDetail.offer, 2, true)}
            <Image
              src={offerDetail.stableToken.logoURI}
              width={16}
              height={16}
              alt="stable"
              className="ml-1"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${offerDetail.offerValue} /Diamond
          </div>
        </div>
        <Image
          src="/icons/arrow-right-gray.svg"
          width={20}
          height={20}
          alt="arrow"
        />
        <div className="flex flex-col items-end">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">For</div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(offerDetail.for, 2, true)}
            <Image
              src={offerDetail.stableToken.logoURI}
              width={16}
              height={16}
              alt="stable"
              className="ml-1"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${offerDetail.forValue}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <div className="text-xs leading-[18px] text-lightgray">
          {formatTime(offerDetail.time)}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#eee]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HoverIcon
                    src="/icons/msg-gray.svg"
                    hoverSrc="/icons/msg.svg"
                    width={16}
                    height={16}
                    alt="msg"
                  />
                </TooltipTrigger>
                <TooltipContent className="w-[200px]">
                  <p className="text-xs leading-[18px]">
                    The seller&apos;s note content is displayed here.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <OfferBuyBtn offerDetail={offerDetail} />
        </div>
      </div>
    </div>
  );
}
