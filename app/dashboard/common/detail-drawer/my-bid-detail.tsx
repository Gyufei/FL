import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/marketplace/offer-detail/offer-info";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import { useState } from "react";
import ConfirmBidSettleDialog from "../settle/confirm-bid-settle-dialog";
import { IOffer } from "@/lib/types/order";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import OrderTabs from "@/app/marketplace/offer-detail/order-tabs";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";

export default function MyBidDetail({
  order,
  onSuccess,
}: {
  order: IOffer;
  onSuccess: () => void;
}) {
  const {
    tokenTotalPrice,
    progress,
    pointPerPrice,
    amount,
    orderTokenInfo,
    orderPointInfo,
    afterTGEPeriod,
    isCanSettle,
    isSettled,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChain } = useCurrentChain();

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
            img1={order.marketplace.projectLogo}
            img2={currentChain.logo}
            name={order.marketplace.market_name}
            no={order.order_id}
            progress={progress}
          />

          <SwapItemPanel
            className="mt-5"
            topText={<>You have to pay</>}
            bottomText={
              <>
                1 {order.marketplace.point_name} = ${pointPerPrice}
              </>
            }
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
                  When buying {order.marketplace.point_name}s, you need to wait
                  until the {order.marketplace.point_name}s convert into the
                  protocol&apos;s tokens before you can receive tokens.
                </WithTip>
              </div>
            }
            value={order.points}
            tokenLogo={orderPointInfo.logoURI}
          />

          {isCanSettle && afterTGEPeriod && (
            <button
              onClick={() => handleSettle()}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black"
            >
              Settle this offer
            </button>
          )}

          {isSettled && (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              Settlement Completed
            </button>
          )}

          {!isCanSettle && !isSettled && (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              Awaiting settlement...
            </button>
          )}
        </div>

        {/* right card */}
        <MyDetailCard order={order} />
      </div>
      <OrderTabs order={order} />

      <ConfirmBidSettleDialog
        order={order}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
        onSuccess={onSuccess}
      />
    </>
  );
}
