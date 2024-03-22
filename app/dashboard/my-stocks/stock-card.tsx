import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import ListAskStockBtn from "./list-btn/list-ask-stock-btn";
import DelistBtn from "./delist-btn/delist-btn";
import SettleDrawerBtn from "./settle-btn/settle-drawer-btn";
import { IOrder } from "@/lib/types/order";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useOrderFormat } from "@/lib/hooks/use-order-format";
import { formatTimestamp } from "@/lib/utils/time";

export default function StockCard({ order }: { order: IOrder }) {
  const isAskStock = order.order_type === "ask";

  const afterTGE = false;
  const isCanList = order.order_status === "canceled" && isAskStock;
  const isListed = order.order_status === "ongoing";
  const isCanDelist = order.order_status === "virgin";
  const isCanSettle = afterTGE && order.order_type === "ask";

  const {
    offerValue,
    forValue,
    offerLogo,
    forLogo,
    pointPerPrice,
    tokenTotalPrice,
  } = useOrderFormat({
    order,
  });

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <TokenPairImg
            src1={offerLogo}
            src2={forLogo}
            width1={48}
            height1={48}
            width2={8.8}
            height2={8.8}
          />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {order.marketplace?.market_place_name}
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
              className="ml-1"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${formatNum(pointPerPrice)} /Diamond
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
            ${formatNum(tokenTotalPrice)}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {isCanList || isCanSettle ? (
          <ManToMans num={4} />
        ) : (
          <div className="text-xs leading-[18px] text-lightgray">
            {formatTimestamp(
              new Date(order.relist_at || order.create_at).getTime(),
            )}
          </div>
        )}
        {isCanList && isAskStock && <ListAskStockBtn order={order} />}
        {isListed && <div className="text-sm leading-5 text-black">Listed</div>}
        {isCanDelist && <DelistBtn order={order} />}
        {isCanSettle && <SettleDrawerBtn order={order} />}
      </div>
    </div>
  );
}

function ManToMans({ num }: { num: number }) {
  return (
    <div className="flex items-center space-x-[6px]">
      <Image src="/icons/man.svg" width={20} height={20} alt="man" />
      <Image
        src="/icons/arrow-right-gray.svg"
        width={20}
        height={20}
        alt="man"
      />
      <Image src="/icons/man-group.svg" width={32} height={20} alt="mans" />
      <div className="text-sm leading-5 text-black">{num}</div>
    </div>
  );
}
