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
import { IMarketplace } from "@/lib/types/marketplace";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { useMemo } from "react";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CTooltipArrow } from "@/components/share/tootip-arrow";
import { WithProjectCDN } from "@/lib/PathMap";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";

export function OrderCard({
  order,
  marketplace,
}: {
  order: IOrder;
  marketplace: IMarketplace;
}) {
  const {
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

  const { currentChain } = useCurrentChain();

  const orderType = order.order_type;

  const showBuy = useMemo(() => {
    return ["virgin", "ongoing"].includes(order.maker_status);
  }, [order]);

  return (
    <div className="h-fit rounded-[20px] bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TokenPairImg
            src1={WithProjectCDN(marketplace.market_id)}
            src2={currentChain.logo}
            width1={48}
            height1={48}
          />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {marketplace.market_name}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{order.order_id}
            </div>
          </div>
        </div>

        <div className="relative">
          <CircleProgress
            percentage={progress * 100}
            className="scale-[1.1429]"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs leading-[18px] text-gray">
            {progress * 100}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-1 grow flex-col">
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
          <div className="overflow-visible whitespace-nowrap text-xs leading-[18px] text-lightgray">
            {orderType === "ask" ? (
              <>
                ${formatNum(pointPerPrice, 6)} / {order.marketplace.point_name}
              </>
            ) : (
              <>${formatNum(tokenTotalPrice)}</>
            )}
          </div>
        </div>
        <div className="flex grow-0 items-center justify-center">
          <Image
            src="/icons/arrow-right-gray.svg"
            width={20}
            height={20}
            alt="arrow"
          />
        </div>
        <div className="flex flex-1 grow flex-col items-end">
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
          <div className="overflow-visible whitespace-nowrap text-xs leading-[18px] text-lightgray">
            {orderType === "ask" ? (
              <>${formatNum(tokenTotalPrice)}</>
            ) : (
              <>
                ${formatNum(pointPerPrice, 6)} / {order.marketplace.point_name}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <div className="text-xs leading-[18px] text-lightgray">
          {orderDuration}
        </div>
        <div className="flex items-center">
          {order.order_note && (
            <div
              data-right={showBuy}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full data-[right=true]:mr-3"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HoverIcon
                      src="/icons/msg-gray.svg"
                      hoverSrc="/icons/msg-gray.svg"
                      width={16}
                      height={16}
                      alt="msg"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="w-[200px]">
                    <p className="text-xs leading-[18px]">{order.order_note}</p>
                    <TooltipArrow asChild>
                      <CTooltipArrow />
                    </TooltipArrow>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          {showBuy && <OrderBuyBtn order={order} />}
        </div>
      </div>
    </div>
  );
}
