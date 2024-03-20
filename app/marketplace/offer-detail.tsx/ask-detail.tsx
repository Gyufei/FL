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
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { WithTip } from "../create-offer/with-tip";
import { useBidTaker } from "@/lib/hooks/contract/use-bid-taker";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/use-order-format";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";

export default function AskDetail({ order }: { order: IOrder }) {
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

  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    isLoading: isDepositLoading,
    isSuccess,
    write: writeAction,
  } = useBidTaker({
    marketplaceStr: order.marketplace.market_place_id,
    makerStr: order.maker_id,
    preOrder: order.pre_order,
  });

  const [sliderValue, setSliderValue] = useState(0);

  const sliderCanMax = useMemo(() => {
    return (1 - progress) * 100;
  }, [progress]);

  const payTokenAmount = useMemo(() => {
    if (!sliderValue) return "";
    return String(NP.times(NP.divide(sliderValue, 100), forValue));
  }, [sliderValue, forValue]);

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  const receivePointAmount = useMemo(() => {
    if (!sliderValue) return "";
    return String(NP.times(NP.divide(sliderValue, 100), offerValue));
  }, [sliderValue, offerValue]);

  function handleSliderChange(v: number) {
    setSliderValue(v);
  }

  function handleConfirmOrder() {
    setDrawerOpen(true);
  }

  function handleBack() {
    setDrawerOpen(false);
  }

  async function handleDeposit() {
    await writeAction({
      receivePoint: receivePointAmount,
    });
  }

  const [resultOrder, setResultOrder] = useState<IOrder | null>(null);

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
            topText={<>You pay</>}
            bottomText={<>~${formatNum(payTokenTotalPrice)} </>}
            value={payTokenAmount}
            tokenLogo={forLogo}
            canGoMax={sliderCanMax}
            sliderMax={100}
            sliderValue={sliderValue}
            setSliderValue={handleSliderChange}
          />

          <ReceiveCard
            topText={<>You will receive</>}
            bottomText={<>1 Diamond = ${formatNum(pointPerPrice)}</>}
            value={receivePointAmount}
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
                onClick={handleConfirmOrder}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white"
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

      <OrderFillDialog
        open={orderFillDialog}
        onOpenChange={(val) => setOrderFillDialog(val)}
        deposited={payTokenAmount}
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
        style={{
          width: drawerOpen ? "500px" : "0",
          padding: drawerOpen ? "24px" : "0",
        }}
      >
        <div className="flex flex-col">
          <DrawerTitle
            title="Confirm transaction"
            onClose={() => setDrawerOpen(false)}
          />
          <div className="text-sm leading-5 text-gray">
            You are buying{" "}
            <span className="text-black">
              {receivePointAmount} {orderPointInfo.symbol} pts
            </span>{" "}
            for{" "}
            <span className="text-black">
              {payTokenAmount} {orderTokenInfo.symbol}
            </span>
            . Are you sure?
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-green">
              Buying
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{receivePointAmount}</span>
              <Image src={offerLogo} width={16} height={16} alt="token" />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              For
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{payTokenAmount}</span>
              <Image src={forLogo} width={16} height={16} alt="token" />
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
            Deposit {payTokenAmount} {orderTokenInfo.symbol}
          </button>
        </div>
      </Drawer>
    </>
  );
}
