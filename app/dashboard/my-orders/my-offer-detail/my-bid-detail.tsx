import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/marketplace/offer-detail.tsx/offer-info";
// import OrderTabs from "@/app/marketplace/offer-detail.tsx/order-tabs";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import { useState } from "react";
import ConfirmBidSettleDialog from "./confirm-bid-settle-dialog";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";

export default function MyBidDetail({ order }: { order: IOrder }) {
  const {
    tokenTotalPrice,
    progress,
    offerLogo,
    forLogo,
    pointPerPrice,
    amount,
    orderTokenInfo,
    orderPointInfo,
  } = useOrderFormat({
    order,
  });

  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

  function handleSettle() {
    setSettleConfirmShow(true);
  }

  return (
    <>
      <div className="flex justify-between">
        {/* left card */}
        <div className="flex flex-1 flex-col rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offerLogo}
            img2={forLogo}
            name={order.marketplace.market_place_name}
            no={order.order_id}
            progress={progress}
          />

          <SwapItemPanel
            className="mt-5"
            topText={<>You have to pay</>}
            bottomText={<>1 Diamond = ${pointPerPrice}</>}
            value={String(amount)}
            tokenLogo={orderTokenInfo.logoURI}
            onValueChange={() => {}}
            isCanInput={false}
          />

          <ArrowBetween className="z-[110] -my-4 self-center" />

          <SwapItemPanel
            onValueChange={() => {}}
            isCanInput={false}
            bottomText={<>~${formatNum(tokenTotalPrice)} </>}
            topText={
              <div className="flex items-center">
                You will receive
                <WithTip>
                  When buying Diamonds, you need to wait until the diamonds
                  convert into the protocol&apos;s tokens before you can receive
                  tokens.
                </WithTip>
              </div>
            }
            value={order.points}
            tokenLogo={orderPointInfo.logoURI}
          />

          <button
            onClick={() => handleSettle()}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black"
          >
            Settle this offer
          </button>
        </div>

        {/* right card */}
        <MyDetailCard order={order} />
      </div>
      {/* <OrderTabs /> */}

      <ConfirmBidSettleDialog
        order={order}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
      />
    </>
  );
}
