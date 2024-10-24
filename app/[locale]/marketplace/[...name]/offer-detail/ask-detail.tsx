import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OfferTabs from "./offer-tabs";
import { useCreateTakerOrder } from "@/lib/hooks/contract/use-create-taker-order";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useLocale, useTranslations } from "next-intl";
import { useApprove } from "@/lib/hooks/web3/evm/use-approve";
import { ChainConfigs } from "@/lib/const/chain-config";

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

  const { platformFee } = useGlobalConfig();
  const {
    tokenPrice,
    progress,
    offerLogo,
    forValue,
    forLogo,
    pointPerPrice,
    isFilled,
    offerTokenInfo: orderTokenInfo,
  } = useOfferFormat({
    offer,
  });

  const tradeFee = useMemo(() => {
    return NP.divide(offer?.trade_tax_pct || 0, 10000);
  }, [offer]);

  const {
    data: txHash,
    isLoading: isDepositLoading,
    isSuccess,
    write: writeAction,
  } = useCreateTakerOrder(offer.marketplace.chain);

  const { isShouldApprove, approveAction, isApproving, approveBtnText } =
    useApprove(offer.marketplace.chain, orderTokenInfo?.address || "");

  const [receivePointAmount, setReceivePointAmount] = useState(0);

  const sliderCanMax = useMemo(() => {
    return NP.minus(offer.item_amount, offer.taken_item_amount);
  }, [offer]);

  const payTokenAmount = useMemo(() => {
    if (!receivePointAmount) return "0";
    const pay = NP.times(
      NP.divide(receivePointAmount, offer.item_amount),
      forValue,
    );
    const payWithFee = NP.times(pay, 1 + platformFee + tradeFee);
    return formatNum(payWithFee);
  }, [receivePointAmount, forValue, offer.item_amount, tradeFee, platformFee]);

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  function handleSliderChange(v: number) {
    setReceivePointAmount(v);
  }

  async function handleDeposit() {
    if (isShouldApprove) {
      await approveAction();
      return;
    }

    if (isDepositLoading || !receivePointAmount) return;
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
            img2={ChainConfigs[offer.marketplace.chain].logo}
            name={offer.marketplace.market_name}
            no={String(offer.entry.id)}
            progress={progress}
          />

          <SliderCard
            topText={<>{T("txt-YouPay")}</>}
            bottomText={<>~${formatNum(payTokenTotalPrice)} </>}
            value={payTokenAmount}
            tokenLogo={forLogo}
            canGoMax={sliderCanMax}
            sliderMax={Number(offer.item_amount)}
            sliderValue={receivePointAmount}
            setSliderValue={handleSliderChange}
          />

          <ReceiveCard
            topText={<>{T("txt-YouGet")}</>}
            bottomText={
              <>
                1 {offer.marketplace.item_name} = ${formatNum(pointPerPrice)}
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
              <WithWalletConnectBtn onClick={handleDeposit}>
                <button
                  disabled={
                    isDepositLoading || !receivePointAmount || isApproving
                  }
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white disabled:bg-gray"
                >
                  {isShouldApprove
                    ? approveBtnText
                    : T("btn-ConfirmTakerOrder")}
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

      <OfferTabs offer={offer} />
    </>
  );
}
