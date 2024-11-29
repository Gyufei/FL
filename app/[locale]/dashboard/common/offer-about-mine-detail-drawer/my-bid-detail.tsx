import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { IOffer } from "@/lib/types/offer";
import { formatNum } from "@/lib/utils/number";

import OfferInfo from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-info";
import ArrowBetween from "@/app/[locale]/marketplace/[...name]/create-offer/arrow-between";
import { WithTip } from "@/components/share/with-tip";

import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import { useRelist } from "@/lib/hooks/contract/use-relist";

import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import OfferTabs from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-tabs";

import MyDetailCard from "./my-detail-card";
import { SwapItemPanel } from "./swap-item-panel";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { useCloseBidOffer } from "@/lib/hooks/contract/use-close-bid-offer";
import NP from "number-precision";
import { reportEvent } from "@/lib/utils/analytics";

export default function MyBidDetail({
  holdingId,
  offer,
  onSuccess,
}: {
  holdingId: string;
  offer: IOffer;
  onSuccess: () => void;
}) {
  const ot = useTranslations("drawer-OfferDetail");

  const {
    tokenTotalPrice,
    progress,
    pointPerPrice,
    amount,
    offerTokenInfo,
    offerPointInfo,
    isSettled,
    isCanceled,
    isClosed,
    afterTGE,
    afterTGEPeriod,
    isFilled,
    isOfferNoNeedSettle,
    isNativeToken,
    pointDecimalNum,
  } = useOfferFormat({
    offer: offer,
  });

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseOffer({
    chain: offer.marketplace.chain,
    marketplaceStr: offer.marketplace.market_place_account,
    makerStr: offer.offer_maker,
    offerStr: offer.offer_id,
    holdingStr: holdingId,
    isNativeToken,
  });

  const {
    isLoading: isBidClosing,
    write: bidCloseAction,
    isSuccess: isBidCloseSuccess,
  } = useCloseBidOffer({
    chain: offer.marketplace.chain,
    marketplaceStr: offer.marketplace.market_place_account,
    makerStr: offer.offer_maker,
    offerStr: offer.offer_id,
    isNativeToken,
  });

  const {
    isLoading: isRelisting,
    write: relistAction,
    isSuccess: isRelistSuccess,
  } = useRelist({
    chain: offer.marketplace.chain,
    marketplaceStr: offer.marketplace.market_place_account,
    holdingStr: holdingId,
    makerStr: offer.offer_maker,
    offerStr: offer.offer_id,
    isNativeToken,
  });

  function handleBidClose() {
    if (isBidClosing) return;
    reportEvent("buttonClicked", { value: "closeBidOffer" });
    bidCloseAction?.(undefined);
  }

  function handleClose() {
    if (isClosing) return;
    reportEvent("buttonClicked", { value: "closeOffer" });
    closeAction?.({ offerId: offer.offer_id });
  }

  function handleRelist() {
    if (isRelisting) return;
    reportEvent("buttonClicked", { value: "relistOffer" });
    relistAction?.(undefined);
  }

  useEffect(() => {
    if (isCloseSuccess || isRelistSuccess || isBidCloseSuccess) {
      onSuccess();
    }
  }, [isCloseSuccess, isRelistSuccess, isBidCloseSuccess, onSuccess]);

  return (
    <>
      <div className="flex flex-col justify-between gap-y-4 sm:flex-row sm:gap-y-0">
        {/* left card */}
        <div className="flex flex-1 flex-col rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offer.marketplace.projectLogo}
            img2={ChainConfigs[offer.marketplace.chain].logo}
            name={offer.marketplace.market_name}
            no={offer.offer_id}
            progress={progress}
          />

          <SwapItemPanel
            className="mt-5"
            topText={<>{ot("txt-YouPay")}</>}
            bottomText={
              <>
                1 {offer.marketplace.item_name} = ${pointPerPrice}
              </>
            }
            value={String(amount)}
            tokenLogo={offerTokenInfo?.logoURI || "/icons/empty.png"}
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
                    pointName: offer.marketplace.item_name,
                  })}
                </WithTip>
              </div>
            }
            value={String(NP.divide(offer.item_amount, pointDecimalNum))}
            tokenLogo={offerPointInfo.logoURI}
          />

          {isSettled || afterTGEPeriod ? (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              {ot("btn-SettlementCompleted")}
            </button>
          ) : (
            <>
              {isCanceled ? (
                afterTGE || isOfferNoNeedSettle ? (
                  <button
                    disabled={true}
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                  >
                    {ot("btn-OfferClosed")}
                  </button>
                ) : (
                  <WithWalletConnectBtn
                    chain={offer?.marketplace.chain}
                    onClick={handleRelist}
                  >
                    <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
                      {ot("btn-RelistThisOffer")}
                    </button>
                  </WithWalletConnectBtn>
                )
              ) : (
                <>
                  {isClosed && !isOfferNoNeedSettle ? (
                    <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
                      {ot("btn-AwaitingSettlement")}
                    </button>
                  ) : (
                    <>
                      {afterTGE ? (
                        <WithWalletConnectBtn
                          chain={offer?.marketplace.chain}
                          onClick={handleBidClose}
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
                            chain={offer?.marketplace.chain}
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
        <MyDetailCard offer={offer} />
      </div>
      <OfferTabs offer={offer} />
    </>
  );
}
