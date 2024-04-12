import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OrderTabs from "./order-tabs";
import "react-modern-drawer/dist/index.css";
import { useBidTaker } from "@/lib/hooks/contract/use-bid-taker";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";

export default function AskDetail({
  order,
  onSuccess,
}: {
  order: IOrder;
  onSuccess: (_o: Record<string, any>) => void;
}) {
  const {
    tokenPrice,
    progress,
    offerLogo,
    forValue,
    forLogo,
    pointPerPrice,
    isFilled,
    orderTokenInfo,
  } = useOrderFormat({
    order,
  });

  const {
    data: txHash,
    isLoading: isDepositLoading,
    isSuccess,
    write: writeAction,
  } = useBidTaker({
    marketplaceStr: order.marketplace.market_place_id,
    makerStr: order.maker_id,
    preOrder: order.order,
  });

  const [receivePointAmount, setReceivePointAmount] = useState(0);

  const sliderCanMax = useMemo(() => {
    return NP.minus(order.points, order.used_points);
  }, [order]);

  const payTokenAmount = useMemo(() => {
    if (!receivePointAmount) return "";
    return String(
      NP.times(NP.divide(receivePointAmount, order.points), forValue),
    );
  }, [receivePointAmount, forValue, order.points]);

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  function handleSliderChange(v: number) {
    setReceivePointAmount(v);
  }

  async function handleDeposit() {
    await writeAction({
      receivePoint: receivePointAmount,
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
            img1={offerLogo}
            img2={forLogo}
            name={order.marketplace.market_place_name}
            no={order.order_id}
            progress={progress}
          />

          <SliderCard
            topText={<>You pay</>}
            bottomText={<>~${formatNum(payTokenTotalPrice)} </>}
            value={payTokenAmount}
            tokenLogo={forLogo}
            canGoMax={sliderCanMax}
            sliderMax={Number(order.points)}
            sliderValue={receivePointAmount}
            setSliderValue={handleSliderChange}
          />

          <ReceiveCard
            topText={<>You will receive</>}
            bottomText={<>1 Diamond = ${formatNum(pointPerPrice)}</>}
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
        <DetailCard order={order} />
      </div>

      <OrderTabs order={order} />
    </>
  );
}
