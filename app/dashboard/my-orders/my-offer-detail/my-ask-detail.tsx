import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/marketplace/offer-detail/offer-info";
import OrderTabs from "@/app/marketplace/offer-detail/order-tabs";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import ConfirmAskSettleDialog from "./confirm-ask-settle-dialog";
import { useMemo, useState } from "react";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { useCloseOriginMaker } from "@/lib/hooks/contract/use-close-origin-maker";

export default function MyAskDetail({ order: order }: { order: IOrder }) {
  const {
    tokenTotalPrice,
    progress,
    offerLogo,
    forLogo,
    pointPerPrice,
    amount,
    orderTokenInfo,
    orderPointInfo,
    afterTGE,
  } = useOrderFormat({
    order,
  });

  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

  const isClosed = useMemo(() => {
    return order.maker_status === "filled" || order.maker_status === "canceled";
  }, [order]);

  const {
    isLoading: isClosing,
    write: writeAction,
    // isSuccess,
  } = useCloseOriginMaker({
    makerStr: order.maker_id,
    orderStr: order.order,
  });

  function handleClose() {
    if (isClosing) return;
    writeAction?.(undefined);
  }

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
            topText={<>You have to sell</>}
            bottomText={<>~${formatNum(tokenTotalPrice)} </>}
            value={order.points}
            tokenLogo={orderPointInfo.logoURI}
            onValueChange={() => {}}
            isCanInput={false}
          />

          <ArrowBetween className="z-[110] -my-4 self-center" />

          <SwapItemPanel
            onValueChange={() => {}}
            isCanInput={false}
            bottomText={<>1 Diamond = ${pointPerPrice}</>}
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
            value={String(amount)}
            tokenLogo={orderTokenInfo.logoURI}
          />

          {afterTGE ? (
            <button
              onClick={() => handleSettle()}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black"
            >
              Settle this offer
            </button>
          ) : isClosed ? (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              Waiting for Settlement
            </button>
          ) : (
            <button
              disabled={isClosing}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
              onClick={handleClose}
            >
              Close this offer
            </button>
          )}
        </div>

        {/* right card */}
        <MyDetailCard order={order} />
      </div>
      <OrderTabs order={order} />
      <ConfirmAskSettleDialog
        order={order}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
      />
    </>
  );
}
