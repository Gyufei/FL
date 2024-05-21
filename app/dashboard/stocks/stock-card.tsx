import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import ListAskStockBtn from "./list-btn/list-ask-stock-btn";
import DelistBtn from "./delist-btn/delist-btn";
import SettleDrawerBtn from "./settle-btn/settle-drawer-btn";
import { IOffer } from "@/lib/types/order";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import { useTakerOrders } from "@/lib/hooks/api/use-taker-orders";
import { useAnchor } from "@/lib/hooks/common/use-anchor";

export default function StockCard({
  order,
  onSuccess,
}: {
  order: IOffer;
  onSuccess: () => void;
}) {
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
  } = useOfferFormat({
    offer: order,
  });

  const { setAnchorValue } = useAnchor();

  const isMaker = order.order_role === "Maker";
  const isAskStock = order.offer_type === "ask";

  const { data: subOrders } = useTakerOrders(
    isAskStock ? order.order : order.pre_offer,
    undefined,
  );

  const { currentChain } = useCurrentChain();

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

  function handleOpenDetail() {
    setAnchorValue(order.order_id);
  }

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div
          className="flex cursor-pointer items-center space-x-3"
          onClick={handleOpenDetail}
        >
          <TokenPairImg
            src1={order.marketplace?.projectLogo}
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
          data-type={order.offer_type}
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
        {isCanList && <ListAskStockBtn order={order} onSuccess={onSuccess} />}
        {isListed && <DelistBtn order={order} onSuccess={onSuccess} />}
        {isCanSettle && <SettleDrawerBtn order={order} onSuccess={onSuccess} />}
      </div>
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
