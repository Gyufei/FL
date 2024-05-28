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
import { useOfferMakerDetail } from "@/lib/hooks/offer/use-offer-maker-detail";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";

export default function AskDetail({
  offer,
  onSuccess,
}: {
  offer: IOffer;
  onSuccess: (_o: Record<string, any>) => void;
}) {
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
  } = useOfferFormat({
    offer,
  });

  const { makerDetail } = useOfferMakerDetail({
    offer: offer,
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
    offerAuthorityStr: offer.pre_offer_detail?.authority,
    originOfferStr: makerDetail?.origin_offer || "",
  });

  console.log(offer.offer_id, offer);
  const [receivePointAmount, setReceivePointAmount] = useState(0);

  const sliderCanMax = useMemo(() => {
    return NP.minus(offer.points, offer.used_points);
  }, [offer]);

  const payTokenAmount = useMemo(() => {
    if (!receivePointAmount) return "0";
    const pay = NP.times(NP.divide(receivePointAmount, offer.points), forValue);
    const payWithFee = NP.times(pay, 1 + platformFee + tradeFee).toFixed();
    return payWithFee;
  }, [receivePointAmount, forValue, offer.points, tradeFee, platformFee]);

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  function handleSliderChange(v: number) {
    setReceivePointAmount(v);
  }

  async function handleDeposit() {
    if (!receivePointAmount || !makerDetail) return;
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
            topText={<>You pay</>}
            bottomText={<>~${formatNum(payTokenTotalPrice)} </>}
            value={payTokenAmount}
            tokenLogo={forLogo}
            canGoMax={sliderCanMax}
            sliderMax={Number(offer.points)}
            sliderValue={receivePointAmount}
            setSliderValue={handleSliderChange}
          />

          <ReceiveCard
            topText={<>You will receive</>}
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
                Offer 100% Filled
              </button>
              <div className="mt-3 rounded-2xl bg-[#FBF2EA] px-4 py-3 leading-5 text-[#FFA95B]">
                You have the option to close the offer before it is 100% filled.
              </div>
            </>
          ) : (
            <>
              <button
                disabled={isDepositLoading || !receivePointAmount}
                onClick={handleDeposit}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white disabled:bg-gray"
              >
                Confirm Taker Order
              </button>
              <div className="mt-3 text-xs leading-5 text-gray">
                You will automatically receive the{" "}
                <span className="text-black">
                  equivalent amount of the protocol&apos;s tokens
                </span>{" "}
                once the Origin Offer Creator settle the offer.
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
