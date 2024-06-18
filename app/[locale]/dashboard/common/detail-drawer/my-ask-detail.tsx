import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/[locale]/marketplace/offer-detail/offer-info";
import OrderTabs from "@/app/[locale]/marketplace/offer-detail/order-tabs";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/[locale]/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/[locale]/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import { useEffect, useMemo, useState } from "react";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import ConfirmAskMakerSettleDialog from "./confirm-ask-maker-settle-dialog";
import { useRelistOffer } from "@/lib/hooks/contract/use-relist-offer";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";

export default function MyAskDetail({
  order: order,
  onSuccess,
}: {
  order: IOffer;
  onSuccess: () => void;
}) {
  const ot = useTranslations("OfferDetail");
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
            topText={<>{ot("YouHaveToSell")}</>}
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
                {ot("YouGet")}
                <WithTip align="start">
                  {ot("YouGetTip").replace(
                    /\$pointName/g,
                    order.marketplace.point_name,
                  )}
                </WithTip>
              </div>
            }
            value={String(amount)}
            tokenLogo={orderTokenInfo.logoURI}
          />

          {isCanSettle ? (
            <WithWalletConnectBtn onClick={handleSettle} shouldSignIn={true}>
              <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
                {ot("SettleThisOffer")}
              </button>
            </WithWalletConnectBtn>
          ) : (
            <>
              {isSettled || afterTGEPeriod ? (
                <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                  {ot("SettlementCompleted")}
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
                          {ot("RelistThisOffer")}
                        </button>
                      </WithWalletConnectBtn>
                    ) : (
                      <button
                        disabled={true}
                        className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                      >
                        {ot("OfferClosed")}
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
                              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                            >
                              {ot("CloseThisOffer")}
                            </button>
                          </WithWalletConnectBtn>
                          <>
                            {isFilled && (
                              <div className="mt-3 rounded-2xl bg-[#FBF2EA] px-4 py-3 leading-5 text-[#FFA95B]">
                                {ot("YouHaveTheOptionToClose ")}
                              </div>
                            )}
                          </>
                        </>
                      ) : (
                        <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                          {ot("AwaitingSettlement")}
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
