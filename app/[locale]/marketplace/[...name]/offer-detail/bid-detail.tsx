import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OrderTabs from "./order-tabs";
import { useCreateHolding } from "@/lib/hooks/contract/use-create-holding";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { useReferralReferer } from "@/lib/hooks/api/use-referral-data";
import { useApprove } from "@/lib/hooks/web3/evm/use-approve";

export default function BidDetail({
  order,
  onSuccess,
}: {
  order: IOffer;
  onSuccess: (_o: Record<string, any>) => void;
}) {
  const T = useTranslations("drawer-OfferDetail");

  const { data: referrerData } = useReferralReferer();
  const referrer = referrerData?.data;

  const {
    tokenPrice,
    progress,
    offerValue,
    offerLogo,
    forLogo,
    pointPerPrice,
    isFilled,
    orderTokenInfo,
    makerDetail,
    isNativeToken,
  } = useOfferFormat({
    offer: order,
  });

  const { currentChainInfo } = useCurrentChain();

  const { isShouldApprove, approveAction, isApproving, approveBtnText } =
    useApprove(orderTokenInfo?.address || "");

  const [sellPointAmount, setSellPointAmount] = useState(0);

  const sliderCanMax = useMemo(() => {
    return NP.minus(order.points, order.used_points);
  }, [order]);

  const receiveTokenAmount = useMemo(() => {
    if (!sellPointAmount) return "0";
    return String(
      NP.times(NP.divide(sellPointAmount, order.points), offerValue),
    );
  }, [sellPointAmount, offerValue, order.points]);

  const receiveTokenTotalPrice = useMemo(() => {
    if (!receiveTokenAmount) return "0";
    return NP.times(receiveTokenAmount || 0, tokenPrice);
  }, [receiveTokenAmount, tokenPrice]);

  const {
    data: txHash,
    isLoading: isDepositLoading,
    isSuccess,
    write: writeAction,
  } = useCreateHolding({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
    preOfferAuthStr: order.authority,
    originOfferStr: makerDetail?.origin_offer || "",
    originOfferAuthStr: order.origin_offer_detail?.authority,
    referrerStr: referrer || "",
    isNativeToken,
  });

  function handleSliderChange(v: number) {
    setSellPointAmount(v);
  }

  async function handleDeposit() {
    if (isShouldApprove) {
      await approveAction();
      return;
    }

    if (isDepositLoading || !sellPointAmount || !makerDetail) return;
    await writeAction({
      pointAmount: sellPointAmount,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess({
        no: "",
        pay: receiveTokenAmount,
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
            img1={order.marketplace.projectLogo}
            img2={currentChainInfo.logo}
            name={order.marketplace.market_name}
            no={order.offer_id}
            progress={progress}
          />

          <SliderCard
            topText={<>{T("txt-YouWillSell")}</>}
            bottomText={
              <>
                1 {order.marketplace.item_name} = ${formatNum(pointPerPrice)}
              </>
            }
            value={String(sellPointAmount)}
            canGoMax={sliderCanMax}
            sliderMax={Number(order.points)}
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
            <WithWalletConnectBtn onClick={handleDeposit} >
              <button
                disabled={isDepositLoading || !sellPointAmount || isApproving}
                onClick={handleDeposit}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
              >
                {isShouldApprove ? approveBtnText : T("btn-ConfirmTakerOrder")}
              </button>
            </WithWalletConnectBtn>
          )}
        </div>

        {/* right card */}
        <DetailCard offer={order} />
      </div>

      <OrderTabs order={order} />
    </>
  );
}
