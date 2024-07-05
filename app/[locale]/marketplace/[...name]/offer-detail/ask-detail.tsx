import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OrderTabs from "./order-tabs";
import { useCreateTaker } from "@/lib/hooks/contract/use-create-taker";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useLocale, useTranslations } from "next-intl";
import { useReferralReferer } from "@/lib/hooks/api/use-referral-data";

export default function AskDetail({
  offer,
  onSuccess,
}: {
  offer: IOffer;
  onSuccess: (_o: Record<string, any>) => void;
}) {
  const T = useTranslations("drawer-OfferDetail");
  const locale = useLocale();
  const isEn = locale === "en";
  const isZh = locale === "zh";

  const { data: referrerData } = useReferralReferer();
  const referrer = referrerData?.data;

  const { platformFee } = useGlobalConfig();
  const { currentChain } = useCurrentChain();
  const {
    tokenPrice,
    progress,
    offerLogo,
    forValue,
    forLogo,
    pointPerPrice,
    isFilled,
    orderTokenInfo,
    makerDetail,
    isSol,
  } = useOfferFormat({
    offer,
  });

  const tradeFee = useMemo(() => {
    return NP.divide(makerDetail?.each_trade_tax || 0, 10000);
  }, [makerDetail]);

  const {
    data: txHash,
    isLoading: isDepositLoading,
    isSuccess,
    write: writeAction,
  } = useCreateTaker({
    marketplaceStr: offer.market_place_account,
    makerStr: offer.maker_account,
    offerStr: offer.offer_account,
    originOfferStr: makerDetail?.origin_offer || "",
    preOfferAuthStr: offer.authority,
    originOfferAuthStr: offer.origin_offer_detail?.authority,
    referrerStr: referrer || "",
    isSol,
  });

  const [receivePointAmount, setReceivePointAmount] = useState(0);

  const sliderCanMax = useMemo(() => {
    return NP.minus(offer.points, offer.used_points);
  }, [offer]);

  const payTokenAmount = useMemo(() => {
    if (!receivePointAmount) return "0";
    const pay = NP.times(NP.divide(receivePointAmount, offer.points), forValue);
    const payWithFee = NP.times(pay, 1 + platformFee + tradeFee);
    return formatNum(payWithFee);
  }, [receivePointAmount, forValue, offer.points, tradeFee, platformFee]);

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  function handleSliderChange(v: number) {
    setReceivePointAmount(v);
  }

  async function handleDeposit() {
    if (isDepositLoading || !receivePointAmount || !makerDetail) return;
    await writeAction({
      pointAmount: receivePointAmount,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess({
        no: "",
        pay: payTokenAmount,
        tx: txHash,
        token: orderTokenInfo,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex justify-between">
        {/* left card */}
        <div className="flex-1 rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offer.marketplace.projectLogo}
            img2={currentChain.logo}
            name={offer.marketplace.market_name}
            no={offer.offer_id}
            progress={progress}
          />

          <SliderCard
            topText={<>{T("txt-YouPay")}</>}
            bottomText={<>~${formatNum(payTokenTotalPrice)} </>}
            value={payTokenAmount}
            tokenLogo={forLogo}
            canGoMax={sliderCanMax}
            sliderMax={Number(offer.points)}
            sliderValue={receivePointAmount}
            setSliderValue={handleSliderChange}
          />

          <ReceiveCard
            topText={<>{T("txt-YouGet")}</>}
            bottomText={
              <>
                1 {offer.marketplace.point_name} = ${formatNum(pointPerPrice)}
              </>
            }
            value={String(receivePointAmount)}
            tokenLogo={offerLogo}
          />

          {isFilled ? (
            <>
              <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black">
                {T("btn-Offer100%Filled")}
              </button>
            </>
          ) : (
            <>
              <WithWalletConnectBtn onClick={handleDeposit} shouldSignIn={true}>
                <button
                  disabled={isDepositLoading || !receivePointAmount}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white disabled:bg-gray"
                >
                  {T("btn-ConfirmTakerOrder")}
                </button>
              </WithWalletConnectBtn>
              <div className="mt-3 text-xs leading-5 text-gray">
                {isEn && (
                  <>
                    You will automatically receive the{" "}
                    <span className="text-black">
                      equivalent amount of the protocol&apos;s tokens
                    </span>{" "}
                    once the Origin Offer Creator settle the offer.
                  </>
                )}
                {isZh && (
                  <>
                    只要初始 Maker 执行了清算, 你将自动收到{" "}
                    <span className="text-black">等价的协议代币</span>{" "}
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* right card */}
        <DetailCard offer={offer} />
      </div>

      <OrderTabs order={offer} />
    </>
  );
}
