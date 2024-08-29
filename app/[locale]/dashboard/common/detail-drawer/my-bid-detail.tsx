import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-info";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/[locale]/marketplace/[...name]/create-offer/arrow-between";
import { WithTip } from "@/app/[locale]/marketplace/[...name]/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import OrderTabs from "@/app/[locale]/marketplace/[...name]/offer-detail/order-tabs";
import { useCloseBidOffer } from "@/lib/hooks/contract/use-close-bid-offer";
import { useEffect, useMemo } from "react";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import { useRelistOffer } from "@/lib/hooks/contract/use-relist-offer";
import { useTranslations } from "next-intl";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

export default function MyBidDetail({
  order,
  onSuccess,
}: {
  order: IOffer;
  onSuccess: () => void;
}) {
  const ot = useTranslations("drawer-OfferDetail");

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
    isNativeToken,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChainInfo } = useCurrentChain();

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
    holdingStr: order.stock_account,
    isNativeToken,
  });

  const {
    isLoading: isRelisting,
    write: relistAction,
    isSuccess: isRelistSuccess,
  } = useRelistOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
    holdingStr: order.stock_account,
    isNativeToken,
  });

  const {
    isLoading: isBidClosing,
    write: bidCloseAction,
    isSuccess: isBidCloseSuccess,
  } = useCloseBidOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
    isNativeToken,
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
            img2={currentChainInfo.logo}
            name={order.marketplace.market_name}
            no={order.offer_id}
            progress={progress}
          />

          <SwapItemPanel
            className="mt-5"
            topText={<>{ot("txt-YouPay")}</>}
            bottomText={
              <>
                1 {order.marketplace.point_name} = ${pointPerPrice}
              </>
            }
            value={String(amount)}
            tokenLogo={orderTokenInfo?.logoURI || "/icons/empty.png"}
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
                {ot("txt-YouGet")}
                <WithTip>
                  {ot("tip-YouGet", {
                    pointName: order.marketplace.point_name,
                  })}
                </WithTip>
              </div>
            }
            value={order.points}
            tokenLogo={orderPointInfo.logoURI}
          />

          {isSettled || afterTGEPeriod ? (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              {ot("btn-SettlementCompleted")}
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
                      {ot("btn-RelistThisOffer")}
                    </button>
                  </WithWalletConnectBtn>
                ) : (
                  <button
                    disabled={true}
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                  >
                    {ot("btn-OfferClosed")}
                  </button>
                )
              ) : (
                <>
                  {isClosed ? (
                    <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                      {ot("btn-AwaitingSettlement")}
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
                            {ot("btn-CloseBidOffer")}
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
                              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black"
                            >
                              {ot("btn-CloseThisOffer")}
                            </button>
                          </WithWalletConnectBtn>
                          <>
                            {!isFilled && (
                              <div className="mt-3 rounded-2xl bg-[#FBF2EA] px-4 py-3 leading-5 text-[#FFA95B]">
                                {ot("txt-YouHaveTheOptionToClose")}
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
