import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { IOffer } from "@/lib/types/offer";
import { formatNum } from "@/lib/utils/number";

import OfferInfo from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-info";
import ArrowBetween from "@/app/[locale]/marketplace/[...name]/create-offer/arrow-between";
import { WithTip } from "@/components/share/with-tip";

import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseBidOffer } from "@/lib/hooks/contract/use-close-bid-offer";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import { useRelist } from "@/lib/hooks/contract/use-relist";

import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import OfferTabs from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-tabs";

import MyDetailCard from "./my-detail-card";
import { SwapItemPanel } from "./swap-item-panel";
import { ChainConfigs } from "@/lib/const/chain-config";

export default function MyBidDetail({
  offer,
  onSuccess,
}: {
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
  } = useOfferFormat({
    offer: offer,
  });

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseOffer(offer.marketplace.chain);

  const {
    isLoading: isRelisting,
    write: relistAction,
    isSuccess: isRelistSuccess,
  } = useRelist(offer.marketplace.chain);

  const {
    isLoading: isBidClosing,
    write: bidCloseAction,
    isSuccess: isBidCloseSuccess,
  } = useCloseBidOffer({
    // marketplaceStr: offer.market_place_account,
    marketplaceStr: "",
    makerStr: offer.offer_maker,
    offerStr: offer.offer_id,
    // isNativeToken,
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
            value={String(offer.item_amount)}
            tokenLogo={offerPointInfo.logoURI}
          />

          {isSettled || afterTGEPeriod ? (
            <button className="pointer-events-none mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#999999] leading-6 text-white">
              {ot("btn-SettlementCompleted")}
            </button>
          ) : (
            <>
              {isCanceled ? (
                !afterTGE ? (
                  <WithWalletConnectBtn onClick={handleRelist}>
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
                        <WithWalletConnectBtn onClick={handleBidClose}>
                          <button
                            disabled={isBidClosing}
                            className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                          >
                            {ot("btn-CloseBidOffer")}
                          </button>
                        </WithWalletConnectBtn>
                      ) : (
                        <>
                          <WithWalletConnectBtn onClick={handleClose}>
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
