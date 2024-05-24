import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/marketplace/offer-detail/offer-info";
import OrderTabs from "@/app/marketplace/offer-detail/order-tabs";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import { useEffect, useMemo, useState } from "react";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import ConfirmAskMakerSettleDialog from "./confirm-ask-maker-settle-dialog";
import { useRelistOffer } from "@/lib/hooks/contract/use-relist-offer";

export default function MyAskDetail({
  order: order,
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
    isCanSettle,
    isSettled,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChain } = useCurrentChain();

  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

  const isOriginMaker = !order.pre_offer_detail;

  const isCanceled = order.offer_status === "canceled";

  const isClosed = useMemo(() => {
    return ["filled", "canceled", "settled"].includes(order.offer_status);
  }, [order]);

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
  });

  const {
    isLoading: isRelisting,
    write: relistAction,
    isSuccess: isRelistSuccess,
  } = useRelistOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
  });

  function handleClose() {
    if (isClosing) return;
    closeAction?.(undefined);
  }

  function handleRelist() {
    if (isRelisting) return;
    relistAction?.(undefined);
  }

  function handleSettle() {
    setSettleConfirmShow(true);
  }

  useEffect(() => {
    if (isCloseSuccess || isRelistSuccess) {
      onSuccess();
    }
  });

  return (
    <>
      <div className="flex justify-between">
        {/* left card */}
        <div className="flex flex-1 flex-col rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={order.marketplace.projectLogo}
            img2={currentChain.logo}
            name={order.marketplace.market_name}
            no={order.offer_id}
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
            bottomText={
              <>
                1 {order.marketplace.point_name} = ${pointPerPrice}
              </>
            }
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
            value={String(amount)}
            tokenLogo={orderTokenInfo.logoURI}
          />

          {isCanSettle && (
            <button
              onClick={() => handleSettle()}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black"
            >
              Settle this offer
            </button>
          )}

          {!isCanSettle && isCanceled && (
            <button
              onClick={() => handleRelist()}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black"
            >
              Relist this offer
            </button>
          )}

          {!isCanSettle && !isClosed && (
            <button
              disabled={isClosing}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
              onClick={handleClose}
            >
              Close this offer
            </button>
          )}

          {!isOriginMaker && isSettled && (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              Settlement Completed
            </button>
          )}

          {!isCanSettle && !isOriginMaker && !isSettled && (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              Awaiting settlement...
            </button>
          )}
        </div>

        {/* right card */}
        <MyDetailCard order={order} />
      </div>
      <OrderTabs order={order} />
      <ConfirmAskMakerSettleDialog
        offer={order}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
        onSuccess={onSuccess}
      />
    </>
  );
}
