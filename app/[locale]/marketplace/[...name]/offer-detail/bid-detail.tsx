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
import { useAccountVerifyDialog } from "@/lib/hooks/marketplace/use-account-verify-dialog";
import AccountVerifyDialog from "@/components/share/account-verify-dialog";
import { reportEvent } from "@/lib/utils/analytics";

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

  const { isShouldApprove, approveAction, isApproving, approveBtnText } =
    usePairApprove(
      offer.marketplace.chain,
      offerTokenInfo,
      offerPointInfo,
      "sellToBid",
    );

  const { verifyDialogOpen, setVerifyDialogOpen, isAccountVerify, targetUrl } =
    useAccountVerifyDialog(offer.marketplace);

  const [sellPointAmount, setSellPointAmount] = useState(0);

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

  function handleSliderChange(v: number) {
    setSellPointAmount(v);
  }

  async function handleDeposit() {
    if (isShouldApprove) {
      reportEvent("click", { value: "approve" });
      await approveAction();
      return;
    }

    if (!isAccountVerify) {
      setVerifyDialogOpen(true);
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
        <div className="flex-1 rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offer.marketplace.projectLogo}
            img2={ChainConfigs[offer.marketplace.chain].logo}
            name={offer.marketplace.market_name}
            no={String(offer.entry.id)}
            progress={progress}
          />

          <SliderCard
            topText={<>{T("txt-YouWillSell")}</>}
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
          />

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
            <WithWalletConnectBtn
              chain={offer.marketplace.chain}
              onClick={handleDeposit}
            >
              <button
                disabled={isDepositLoading || !sellPointAmount || isApproving}
                // onClick={handleDeposit}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
              >
                {isShouldApprove ? approveBtnText : T("btn-ConfirmTakerOrder")}
              </button>
            </WithWalletConnectBtn>
          )}
        </div>

        {/* right card */}
        <DetailCard offer={offer} />
      </div>

      <OfferTabs offer={offer} />

      <AccountVerifyDialog
        open={verifyDialogOpen}
        setOpen={setVerifyDialogOpen}
        marketName={offer.marketplace.market_name}
        targetUrl={targetUrl || ""}
      />
    </>
  );
}
