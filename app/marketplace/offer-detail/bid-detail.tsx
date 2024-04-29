import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OrderTabs from "./order-tabs";
import { useAskTaker } from "@/lib/hooks/contract/use-ask-taker";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";

export default function BidDetail({
  order,
  onSuccess,
}: {
  order: IOrder;
  onSuccess: (_o: Record<string, any>) => void;
}) {
  const {
    tokenPrice,
    progress,
    offerValue,
    offerLogo,
    forLogo,
    pointPerPrice,
    isFilled,
    orderTokenInfo,
  } = useOrderFormat({
    order,
  });

  const { currentChain } = useCurrentChain();

  const [sellPointAmount, setSellPointAmount] = useState(0);

  const sliderCanMax = useMemo(() => {
    return NP.minus(order.points, order.used_points);
  }, [order]);

  const receiveTokenAmount = useMemo(() => {
    if (!sellPointAmount) return "";
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
  } = useAskTaker({
    marketplaceStr: order.marketplace.market_place_id,
    makerStr: order.maker_id,
    preOrderStr: order.order,
  });

  function handleSliderChange(v: number) {
    setSellPointAmount(v);
  }

  async function handleDeposit() {
    await writeAction({
      payPoint: sellPointAmount,
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
            img2={currentChain.logo}
            name={order.marketplace.market_name}
            no={order.order_id}
            progress={progress}
          />

          <SliderCard
            topText={<>You will sell</>}
            bottomText={
              <>
                1 {order.marketplace.point_name} = ${formatNum(pointPerPrice)}
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
            topText={<>You will receive</>}
            bottomText={<>~${formatNum(receiveTokenTotalPrice)} </>}
            value={receiveTokenAmount}
            tokenLogo={offerLogo}
          />

          {isFilled ? (
            <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black">
              Offer 100% Filled
            </button>
          ) : (
            <button
              disabled={isDepositLoading || !sellPointAmount}
              onClick={handleDeposit}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
            >
              Confirm Taker Order
            </button>
          )}
        </div>

        {/* right card */}
        <DetailCard order={order} />
      </div>

      <OrderTabs order={order} />
    </>
  );
}
