import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OrderTabs from "./order-tabs";
import OrderFillDialog from "./order-fill-dialog";
import { useAskTaker } from "@/lib/hooks/contract/use-ask-taker";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { WithTip } from "../create-offer/with-tip";
import { IOrder } from "@/lib/types/order";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { useOrderFormat } from "@/lib/hooks/use-order-format";

export default function BidDetail({ order }: { order: IOrder }) {
  const { platFormFee } = useGlobalConfig();

  const {
    tokenPrice,
    progress,
    offerValue,
    offerLogo,
    forValue,
    forLogo,
    pointPerPrice,
    isFilled,
    orderTokenInfo,
    orderPointInfo,
  } = useOrderFormat({
    order,
  });

  const [sliderValue, setSliderValue] = useState(0);

  const sliderCanMax = useMemo(() => {
    return (1 - progress) * 100;
  }, [progress]);

  const sellPointAmount = useMemo(() => {
    if (!sliderValue) return "";
    return String(NP.times(NP.divide(sliderValue, 100), forValue));
  }, [sliderValue, forValue]);

  const receiveTokenAmount = useMemo(() => {
    if (!sliderValue) return "";
    return String(NP.times(NP.divide(sliderValue, 100), offerValue));
  }, [sliderValue, offerValue]);

  const receiveTokenTotalPrice = useMemo(() => {
    if (!receiveTokenAmount) return "0";
    return NP.times(receiveTokenAmount || 0, tokenPrice);
  }, [receiveTokenAmount, tokenPrice]);

  const receiveToken = "USDC";

  const [sliderMax] = useState(100);

  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [resultOrder, setResultOrder] = useState<IOrder | null>(null);

  const {
    isLoading: isDepositLoading,
    isSuccess,
    write: createAction,
  } = useAskTaker({
    makerStr: order.maker_id,
    preOrderStr: order.pre_order,
  });

  function handleConfirmOrder() {
    setDrawerOpen(true);
  }

  function handleBack() {
    setDrawerOpen(false);
  }

  function handleSliderChange(v: number) {
    setSliderValue(v);
  }

  async function handleDeposit() {
    await createAction({
      payPoint: offerValue,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setOrderFillDialog(true);
      setResultOrder(order);
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
            topText={<>You will sell</>}
            bottomText={<>1 Diamond = ${formatNum(pointPerPrice)}</>}
            value={sellPointAmount}
            canGoMax={sliderCanMax}
            sliderMax={sliderMax}
            sliderValue={sliderValue}
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
              onClick={handleConfirmOrder}
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

      <OrderFillDialog
        open={orderFillDialog}
        onOpenChange={(val) => setOrderFillDialog(val)}
        deposited={receiveTokenAmount}
        depositTokenLogo={forLogo}
        txHash={resultOrder?.order_tx_hash || ""}
        orderNo={resultOrder?.order_id || ""}
      />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={500}
        className="flex flex-col justify-between overflow-y-auto rounded-l-2xl p-6"
      >
        <div className="flex flex-col">
          <DrawerTitle
            title="Confirm transaction"
            onClose={() => setDrawerOpen(false)}
          />
          <div className="text-sm leading-5 text-gray">
            You are selling{" "}
            <span className="text-black">
              {sellPointAmount} {orderPointInfo.symbol} pts
            </span>{" "}
            for{" "}
            <span className="text-black">
              {receiveTokenAmount} {orderTokenInfo.symbol}
            </span>
            . Are you sure?
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-green">
              Selling
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{formatNum(sellPointAmount)}</span>
              <Image src={forLogo} width={16} height={16} alt="token" />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              For
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{receiveTokenAmount}</span>
              <Image src={offerLogo} width={16} height={16} alt="token" />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              Platform fee
              <WithTip></WithTip>
            </div>
            <div className="flex items-center text-xs leading-[18px]">
              {platFormFee * 100}%
            </div>
          </div>
        </div>
        <div className="mt-[140px] flex items-center justify-between space-x-[6px]">
          <button
            onClick={handleBack}
            className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#F0F1F5] text-black"
          >
            Back
          </button>
          <button
            disabled={isDepositLoading}
            onClick={handleDeposit}
            className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-yellow text-black"
          >
            Deposit {receiveTokenAmount} {receiveToken}
          </button>
        </div>
      </Drawer>
    </>
  );
}
