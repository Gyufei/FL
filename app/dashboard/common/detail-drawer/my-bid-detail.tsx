import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/marketplace/offer-detail/offer-info";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import OrderTabs from "@/app/marketplace/offer-detail/order-tabs";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import { useCloseBidOffer } from "@/lib/hooks/contract/use-close-bid-offer";
import { useEffect, useMemo } from "react";

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
    isCanSettle,
    isSettled,
    afterTGE,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChain } = useCurrentChain();

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseBidOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
  });

  function handleClose() {
    if (isClosing) return;
    closeAction?.(undefined);
  }

  const isClosed = useMemo(() => {
    return ["filled", "canceled", "settled"].includes(order.offer_status);
  }, [order]);

  useEffect(() => {
    if (isCloseSuccess) {
      onSuccess();
    }
  }, [isCloseSuccess, onSuccess]);

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

          {afterTGE && !isClosed && (
            <button
              disabled={isClosing}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
              onClick={handleClose}
            >
              Close this offer
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
    </>
  );
}
