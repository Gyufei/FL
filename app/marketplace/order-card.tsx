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
import OrderBuyBtn from "./order-buy-btn";
import { IOrder } from "@/lib/types/order";
import { IMarketPlace } from "@/lib/types/marketplace";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useOrderFormat } from "@/lib/hooks/use-order-format";

export function OrderCard({
  order,
  marketplace,
}: {
  order: IOrder;
  marketplace: IMarketPlace;
}) {
  const {
    orderType,
    progress,
    offerValue,
    forValue,
    offerLogo,
    forLogo,
    pointPerPrice,
    orderDuration,
    tokenTotalPrice,
  } = useOrderFormat({
    order,
  });

  return (
    <div className="h-fit rounded-[20px] bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TokenPairImg src1={offerLogo} src2={forLogo} />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {marketplace.market_place_name}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{order.order_id}
            </div>
          </div>
        </div>

        <div className="relative">
          <CircleProgress percentage={progress * 100} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs leading-[18px] text-gray">
            {progress * 100}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">Offer</div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(offerValue, 2, true)}
            <Image
              src={offerLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            {orderType === "ask" ? (
              <>${formatNum(pointPerPrice)} /Diamond</>
            ) : (
              <>${formatNum(tokenTotalPrice)}</>
            )}
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
            {formatNum(forValue, 2, true)}
            <Image
              src={forLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            {orderType === "ask" ? (
              <>${formatNum(tokenTotalPrice)}</>
            ) : (
              <>${formatNum(pointPerPrice)} /Diamond</>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <div className="text-xs leading-[18px] text-lightgray">
          {orderDuration}
        </div>
        <div className="flex items-center">
          <div className="mr-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#eee]">
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
                  <p className="text-xs leading-[18px]">{order.order_note}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <OrderBuyBtn order={order} />
        </div>
      </div>
    </div>
  );
}
