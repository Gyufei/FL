import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import ListAskStockBtn from "./list-btn/list-ask-stock-btn";
import DelistBtn from "./delist-btn/delist-btn";
import SettleDrawerBtn from "./settle-btn/settle-drawer-btn";
import { IOrder } from "@/lib/types/order";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import MyAskDetail from "../orders/my-offer-detail/my-ask-detail";
import MyBidDetail from "../orders/my-offer-detail/my-bid-detail";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import { useTakerOrders } from "@/lib/hooks/api/use-taker-orders";
import { WithProjectCDN } from "@/lib/PathMap";

export default function StockCard({ order }: { order: IOrder }) {
  const {
    afterTGE,
    afterTGEPeriod,
    offerValue,
    forValue,
    offerLogo,
    pointPerPrice,
    tokenTotalPrice,
    forLogo,
    isCanSettle,
  } = useOrderFormat({
    order,
  });

  const isMaker = order.order_role === "Maker";
  const isAskStock = order.order_type === "ask";

  const { data: subOrders } = useTakerOrders(
    isAskStock ? order.order : order.pre_order,
    undefined,
  );

  const { currentChain } = useCurrentChain();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isCanList =
    !afterTGE &&
    !afterTGEPeriod &&
    !isAskStock &&
    order.maker_status === "unknown" &&
    order.taker_status === "initialized";

  const isListed =
    !afterTGE &&
    isMaker &&
    isAskStock &&
    order.maker_status === "virgin" &&
    order.taker_status === "initialized";

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div
          className="flex cursor-pointer items-center space-x-3"
          onClick={() => setDrawerOpen(true)}
        >
          <TokenPairImg
            src1={WithProjectCDN(order.marketplace?.market_id)}
            src2={currentChain.logo}
            width1={48}
            height1={48}
            width2={8.8}
            height2={8.8}
          />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {order.marketplace?.market_name}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{order.order_id}
            </div>
          </div>
        </div>

        <div
          data-type={order.order_type}
          className="flex h-5 items-center rounded px-[10px] text-xs leading-[18px] data-[type=bid]:bg-[#FFEFEF] data-[type=ask]:bg-[#EDF8F4] data-[type=bid]:text-red data-[type=ask]:text-green"
        >
          {!isAskStock ? "Bid" : "Ask"}
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
              className="ml-1 rounded-full"
            />
          </div>
          <div className="overflow-visible whitespace-nowrap text-xs leading-[18px] text-lightgray">
            ${formatNum(pointPerPrice, 6)} / {order.marketplace.point_name}
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
              className="ml-1 rounded-full"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${formatNum(tokenTotalPrice)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <ManToMans num={subOrders?.length || 0} isAsk={isAskStock} />
        {isCanList && <ListAskStockBtn order={order} />}
        {isListed && <DelistBtn order={order} />}
        {isCanSettle && <SettleDrawerBtn order={order} />}
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={952}
        className="overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title={`My ${isAskStock ? "Ask" : "Bid"} Offer Detail`}
          onClose={() => setDrawerOpen(false)}
        />
        {order &&
          (isAskStock ? (
            <MyAskDetail order={order} />
          ) : (
            <MyBidDetail order={order} />
          ))}
      </Drawer>
    </div>
  );
}

function ManToMans({ num, isAsk }: { num: number; isAsk: boolean }) {
  return (
    <div className="flex items-center space-x-[6px]">
      <Image
        src={isAsk ? "/icons/man.svg" : "/icons/man-gray.svg"}
        width={20}
        height={20}
        alt="man"
      />
      <Image
        src="/icons/arrow-right-gray.svg"
        width={20}
        height={20}
        alt="man"
      />
      {num === 1 && (
        <Image
          src={!isAsk ? "/icons/man.svg" : "/icons/man-gray.svg"}
          width={20}
          height={20}
          alt="man"
        />
      )}
      {num === 2 && (
        <Image
          src={!isAsk ? "/icons/two-man.svg" : "/icons/two-man-gray.svg"}
          width={24}
          height={20}
          alt="man"
        />
      )}
      {num === 3 && (
        <Image
          src={!isAsk ? "/icons/three-man.svg" : "/icons/three-man-gray.svg"}
          width={32}
          height={20}
          alt="man"
        />
      )}
      {num >= 4 && (
        <Image
          src={!isAsk ? "/icons/four-man.svg" : "/icons/four-man-gray.svg"}
          width={36}
          height={20}
          alt="man"
        />
      )}
      <div className="text-sm leading-5 text-black">{num}</div>
    </div>
  );
}
