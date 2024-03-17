import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OfferTabs from "./offer-tabs";
import OrderFillDialog from "./order-fill-dialog";
import { useAskTaker } from "@/lib/hooks/contract/use-ask-taker";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { WithTip } from "../create-offer/with-tip";

export default function BidDetail({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  const sellPointAmount = 1000;
  const receiveTokenAmount = 22;
  const sellPoint = "Points";
  const receiveToken = "USDC";
  const platFormFee = 0.025;

  const [sliderMax] = useState(100);
  const [sliderValue, setSliderValue] = useState(80);

  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    isLoading: isDepositLoading,
    isSuccess,
    write: createAction,
  } = useAskTaker({
    makerStr: offerDetail.maker,
    preOrderStr: offerDetail.order,
  });

  function handleConfirmOrder() {
    setDrawerOpen(true);
  }

  function handleBack() {
    setDrawerOpen(false);
  }

  async function handleDeposit() {
    await createAction({
      payPoint: sellPointAmount,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setOrderFillDialog(true);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex justify-between">
        {/* left card */}
        <div className="flex-1 rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offerDetail.avatar}
            img2={offerDetail.token.logoURI}
            name={offerDetail.name}
            no={offerDetail.no}
            progress={offerDetail.progress}
          />

          <SliderCard
            topText={<>You will sell</>}
            bottomText={<>1 Diamond = ${offerDetail.pointPrice}</>}
            value={offerDetail.offer}
            sliderMax={sliderMax}
            sliderValue={sliderValue}
            tokenLogo={offerDetail.token.logoURI}
            setSliderValue={setSliderValue}
          />

          <ReceiveCard
            topText={<>You will receive</>}
            bottomText={<>~${formatNum(offerDetail.offerValue)} </>}
            value={offerDetail.for}
            tokenLogo={offerDetail.stableToken.logoURI}
          />

          <button
            onClick={handleConfirmOrder}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
          >
            Confirm Taker Order
          </button>
        </div>

        {/* right card */}
        <DetailCard offerDetail={offerDetail} />
      </div>
      <OfferTabs />

      <OrderFillDialog
        open={orderFillDialog}
        onOpenChange={(val) => setOrderFillDialog(val)}
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
              {sellPointAmount} {sellPoint} pts
            </span>{" "}
            for{" "}
            <span className="text-black">
              {receiveToken} {receiveTokenAmount}
            </span>
            . Are you sure?
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-green">
              Selling
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{sellPointAmount}</span>
              <Image
                src="/icons/magic-eden.svg"
                width={16}
                height={16}
                alt="token"
              />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              For
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{receiveTokenAmount}</span>
              <Image src="/icons/usdc.svg" width={16} height={16} alt="token" />
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
