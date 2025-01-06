import NP from "number-precision";
import {
  formatNum,
  toNonExponential,
  bigIntOrNpMinus,
} from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OfferTabs from "./offer-tabs";
import { useCreateTakerOrder } from "@/lib/hooks/contract/use-create-taker-order";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { usePairApprove } from "../create-offer/use-pair-approve";
import { reportEvent } from "@/lib/utils/analytics";
import ArrowBetween from "../create-offer/arrow-between";
import PointBalance from "@/components/share/point-balance";
import { IPoint } from "@/lib/types/token";
import { useCheckBnbBalance } from "@/lib/hooks/api/use-check-bnb-balance";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { cn } from "@/lib/utils/common";

export default function BidDetail({
  offer,
  onSuccess,
}: {
  offer: IOffer;
  onSuccess: (_o: Record<string, any>) => void;
}) {
  const T = useTranslations("drawer-OfferDetail");

  const {
    tokenPrice,
    progress,
    offerValue,
    offerLogo,
    forLogo,
    pointPerPrice,
    isFilled,
    offerTokenInfo,
    offerPointInfo,
    isNativeToken,
    pointDecimalNum,
  } = useOfferFormat({
    offer: offer,
  });
  const [sellPointAmount, setSellPointAmount] = useState(0);

  const { isShouldApprove, approveAction, isApproving, approveBtnText } =
    usePairApprove(
      offer.marketplace.chain,
      offerTokenInfo,
      offerPointInfo,
      "sellToBid",
      NP.divide(sellPointAmount, pointDecimalNum),
    );

  const sliderCanMax = useMemo(() => {
    return +bigIntOrNpMinus(offer.item_amount, offer.taken_item_amount);
  }, [offer]);

  const receiveTokenAmount = useMemo(() => {
    if (!sellPointAmount) return "0";
    return String(
      NP.times(NP.divide(sellPointAmount, offer.item_amount), offerValue),
    );
  }, [sellPointAmount, offerValue, offer.item_amount]);

  const receiveTokenTotalPrice = useMemo(() => {
    if (!receiveTokenAmount) return "0";
    return NP.times(receiveTokenAmount || 0, tokenPrice);
  }, [receiveTokenAmount, tokenPrice]);

  const { checkBalanceInsufficient } = useCheckBnbBalance(
    offer.marketplace.chain,
    {
      address: offerPointInfo.marketplace.project_token_addr,
      decimals: ProjectDecimalsMap[offerPointInfo.marketplace.market_symbol],
      symbol: offerPointInfo.marketplace.item_name,
    },
  );
  const [errorText, setErrorText] = useState("");

  const {
    data: txHash,
    isLoading: isDepositLoading,
    isSuccess,
    write: writeAction,
  } = useCreateTakerOrder({
    chain: offer.marketplace.chain,
    marketplaceStr: offer.marketplace.market_place_account,
    makerStr: offer.offer_maker,
    offerStr: offer.offer_id,
    // TODO: add field in new api
    // preOfferAuthStr: order.authority,
    // originOfferStr: makerDetail?.origin_offer || "",
    // originOfferAuthStr: order.origin_offer_detail?.authority,
    // referrerStr: referrer || "",
    preOfferAuthStr: "",
    originOfferStr: "",
    originOfferAuthStr: "",
    referrerStr: "",
    isNativeToken,
  });

  useEffect(() => {
    if (!isShouldApprove) {
      const result = checkBalanceInsufficient(
        NP.divide(sellPointAmount, pointDecimalNum),
      );
      setErrorText(result);
    }
  }, [sellPointAmount, isShouldApprove]);

  function handleSliderChange(v: number) {
    setSellPointAmount(v);
  }

  async function handleDeposit() {
    if (isShouldApprove) {
      reportEvent("click", { value: "approve" });
      await approveAction();
      return;
    }

    if (isDepositLoading || !sellPointAmount) return;

    reportEvent("click", { value: "confirmOffer-bid" });
    await writeAction({
      offerId: offer.offer_id,
      itemAmount: toNonExponential(sellPointAmount),
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess({
        no: "",
        pay: receiveTokenAmount,
        tx: txHash,
        token: offerTokenInfo,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex flex-col justify-between gap-y-4 sm:flex-row sm:gap-y-0">
        {/* left card */}
        <div className="flex flex-1 flex-col rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offer.marketplace.projectLogo}
            img2={ChainConfigs[offer.marketplace.chain].logo}
            name={offer.marketplace.market_name}
            no={String(offer.entry.id)}
            progress={progress}
          />

          <SliderCard
            topText={
              <>
                {T("txt-YouWillSell")}
                <PointBalance
                  className="mb-0"
                  point={offerPointInfo as IPoint}
                />
              </>
            }
            bottomText={
              <>
                1 {offer.marketplace.item_name} = ${formatNum(pointPerPrice)}
              </>
            }
            value={String(NP.divide(sellPointAmount, pointDecimalNum))}
            canGoMax={sliderCanMax}
            sliderMax={Number(offer.item_amount)}
            sliderValue={sellPointAmount}
            tokenLogo={forLogo}
            setSliderValue={handleSliderChange}
            hasError={!!errorText}
          />

          <ArrowBetween className="-my-4 self-center" />

          <ReceiveCard
            topText={<>{T("txt-YouGet")}</>}
            bottomText={<>~${formatNum(receiveTokenTotalPrice)} </>}
            value={receiveTokenAmount}
            tokenLogo={offerLogo}
          />

          {isFilled ? (
            <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black">
              {T("btn-Offer100%Filled")}
            </button>
          ) : (
            <>
              <div className="mt-3 text-center text-[12px] text-[#FF6262]">
                {errorText}
              </div>
              <WithWalletConnectBtn
                chain={offer.marketplace.chain}
                onClick={handleDeposit}
              >
                <button
                  disabled={
                    isDepositLoading ||
                    (!isShouldApprove && !sellPointAmount) ||
                    isApproving ||
                    !!errorText
                  }
                  className={cn(
                    "mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white disabled:cursor-not-allowed disabled:bg-gray",
                    isDepositLoading || isApproving ? "dot-loading" : "",
                  )}
                >
                  {isShouldApprove
                    ? approveBtnText
                    : T("btn-ConfirmTakerOrder")}
                </button>
              </WithWalletConnectBtn>
            </>
          )}
        </div>

        {/* right card */}
        <DetailCard offer={offer} />
      </div>

      <OfferTabs offer={offer} />
    </>
  );
}
