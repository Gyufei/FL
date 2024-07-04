import { useEffect, useMemo, useState } from "react";
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
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import ConfirmAskMakerSettleDialog from "./confirm-ask-maker-settle-dialog";
import { useRelistOffer } from "@/lib/hooks/contract/use-relist-offer";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";

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
    isSol,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChain } = useCurrentChain();

  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

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
    stockStr: order.stock_account,
    isSol,
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
    isSol,
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
  }, [isCloseSuccess, isRelistSuccess, onSuccess]);

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

          {isCanSettle ? (
            <WithWalletConnectBtn onClick={handleSettle} shouldSignIn={true}>
              <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
                {ot("btn-SettleThisOffer")}
              </button>
            </WithWalletConnectBtn>
          ) : (
            <>
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
                      {!isClosed && !afterTGE ? (
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
                            {isFilled && (
                              <div className="mt-3 rounded-2xl bg-[#FBF2EA] px-4 py-3 leading-5 text-[#FFA95B]">
                                {ot("txt-YouHaveTheOptionToClose ")}
                              </div>
                            )}
                          </>
                        </>
                      ) : (
                        <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                          {ot("btn-AwaitingSettlement")}
                        </button>
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
      <ConfirmAskMakerSettleDialog
        offer={order}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
        onSuccess={onSuccess}
      />
    </>
  );
}
