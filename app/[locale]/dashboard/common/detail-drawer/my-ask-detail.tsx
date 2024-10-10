import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-info";
import OrderTabs from "@/app/[locale]/marketplace/[...name]/offer-detail/order-tabs";
import ArrowBetween from "@/app/[locale]/marketplace/[...name]/create-offer/arrow-between";
import { WithTip } from "@/app/[locale]/marketplace/[...name]/create-offer/with-tip";
import { SwapItemPanel } from "./swap-item-panel";
import MyDetailCard from "./my-detail-card";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import ConfirmAskMakerSettleDialog from "./confirm-ask-maker-settle-dialog";
import { useRelist } from "@/lib/hooks/contract/use-relist";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { useAbortAskOffer } from "@/lib/hooks/contract/use-abort-ask-offer";

export default function MyAskDetail({
  order: order,
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
    isCanSettle,
    isSettled,
    afterTGE,
    afterTGEPeriod,
    isFilled,
    isNativeToken,
    isCanceled,
    isClosed,
    isCanAbort,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChainInfo } = useCurrentChain();

  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

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
    isLoading: isAborting,
    write: abortAction,
    isSuccess: isAbortSuccess,
  } = useAbortAskOffer({
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
  } = useRelist({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
    holdingStr: order.stock_account,
    isNativeToken,
  });

  function handleClose() {
    if (isClosing) return;
    closeAction?.(undefined);
  }

  function handleAbort() {
    if (isAborting) return;
    abortAction?.(undefined);
  }

  function handleRelist() {
    if (isRelisting) return;
    relistAction?.(undefined);
  }

  function handleSettle() {
    setSettleConfirmShow(true);
  }

  useEffect(() => {
    if (isCloseSuccess || isRelistSuccess || isAbortSuccess) {
      onSuccess();
    }
  }, [isCloseSuccess, isRelistSuccess, isAbortSuccess, onSuccess]);

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
            topText={<>{ot("txt-YouHaveToSell")}</>}
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
                {ot("txt-YouGet")}
                <WithTip align="start">
                  {ot("tip-YouGet", {
                    pointName: order.marketplace.point_name,
                  })}
                </WithTip>
              </div>
            }
            value={String(amount)}
            tokenLogo={orderTokenInfo?.logoURI || "/icons/empty.png"}
          />

          <div className="flex items-center justify-between gap-2">
            {isCanSettle ? (
              <WithWalletConnectBtn
                className="flex-1"
                onClick={handleSettle}
                
              >
                <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
                  {ot("btn-SettleThisOffer")}
                </button>
              </WithWalletConnectBtn>
            ) : (
              <>
                {isSettled || afterTGEPeriod ? (
                  <button className="pointer-events-none mt-4 flex h-12 w-full flex-1 items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                    {ot("btn-SettlementCompleted")}
                  </button>
                ) : (
                  <>
                    {isCanceled ? (
                      afterTGE ? (
                        <button
                          disabled={true}
                          className="mt-4 flex h-12 w-full flex-1 items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                        >
                          {ot("btn-OfferClosed")}
                        </button>
                      ) : (
                        <WithWalletConnectBtn
                          onClick={handleRelist}
                          
                        >
                          <button className="mt-4 flex h-12 w-full flex-1 items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
                            {ot("btn-RelistThisOffer")}
                          </button>
                        </WithWalletConnectBtn>
                      )
                    ) : (
                      <>
                        {isClosed || afterTGE ? (
                          <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                            {ot("btn-AwaitingSettlement")}
                          </button>
                        ) : (
                          <>
                            <WithWalletConnectBtn
                              className="flex-1"
                              onClick={handleClose}
                              
                            >
                              <button
                                disabled={isClosing}
                                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black"
                              >
                                {ot("btn-CloseThisOffer")}
                              </button>
                            </WithWalletConnectBtn>

                            <>
                              {isFilled && (
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

            {isCanAbort && (
              <WithWalletConnectBtn
                className="flex-1"
                onClick={handleAbort}
                
              >
                <button
                  disabled={isAborting}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black"
                >
                  {ot("btn-AbortThisOffer")}
                </button>
              </WithWalletConnectBtn>
            )}
          </div>
        </div>

        {/* right card */}
        <MyDetailCard offer={order} />
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
