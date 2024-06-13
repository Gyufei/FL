import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/[locale]/marketplace/offer-detail/offer-info";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/[locale]/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/[locale]/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import OrderTabs from "@/app/[locale]/marketplace/offer-detail/order-tabs";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import { useCloseBidOffer } from "@/lib/hooks/contract/use-close-bid-offer";
import { useEffect, useMemo } from "react";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import { useRelistOffer } from "@/lib/hooks/contract/use-relist-offer";

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
    isSettled,
    afterTGE,
    afterTGEPeriod,
    isFilled,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChain } = useCurrentChain();

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
    stockStr: order.stock_account,
  });

  const {
    isLoading: isRelisting,
    write: relistAction,
    isSuccess: isRelistSuccess,
  } = useRelistOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
    stockStr: order.stock_account,
  });

  const {
    isLoading: isBidClosing,
    write: bidCloseAction,
    isSuccess: isBidCloseSuccess,
  } = useCloseBidOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
  });

  function handleClose() {
    if (isClosing) return;
    closeAction?.(undefined);
  }

  function handleBidClose() {
    if (isBidClosing) return;
    bidCloseAction?.(undefined);
  }

  function handleRelist() {
    if (isRelisting) return;
    relistAction?.(undefined);
  }

  const isCanceled = order.offer_status === "canceled";

  const isClosed = useMemo(() => {
    return ["filled", "canceled", "settled"].includes(order.offer_status);
  }, [order]);

  useEffect(() => {
    if (isBidCloseSuccess || isCloseSuccess || isRelistSuccess) {
      onSuccess();
    }
  }, [isBidCloseSuccess, isCloseSuccess, isRelistSuccess, onSuccess]);

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
            topText={<>You Pay</>}
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
                You Get
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

          {isSettled || afterTGEPeriod ? (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              Settlement Completed
            </button>
          ) : (
            <>
              {isCanceled ? (
                !afterTGE ? (
                  <WithWalletConnectBtn
                    onClick={handleRelist}
                    shouldSignIn={true}
                  >
                    <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
                      Relist this offer
                    </button>
                  </WithWalletConnectBtn>
                ) : (
                  <button
                    disabled={true}
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                  >
                    Offer Closed
                  </button>
                )
              ) : (
                <>
                  {isClosed ? (
                    <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                      Awaiting settlement...
                    </button>
                  ) : (
                    <>
                      {afterTGE ? (
                        <WithWalletConnectBtn
                          onClick={handleBidClose}
                          shouldSignIn={true}
                        >
                          <button
                            disabled={isBidClosing}
                            className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                          >
                            Close bid offer
                          </button>
                        </WithWalletConnectBtn>
                      ) : (
                        <>
                          <WithWalletConnectBtn
                            onClick={handleClose}
                            shouldSignIn={true}
                          >
                            <button
                              disabled={isClosing}
                              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                            >
                              Close this offer
                            </button>
                          </WithWalletConnectBtn>
                          <>
                            {isFilled && (
                              <div className="mt-3 rounded-2xl bg-[#FBF2EA] px-4 py-3 leading-5 text-[#FFA95B]">
                                You have the option to close the offer before it
                                is 100% filled.
                              </div>
                            )}
                          </>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* right card */}
        <MyDetailCard offer={order} />
      </div>
      <OrderTabs order={order} />
    </>
  );
}
