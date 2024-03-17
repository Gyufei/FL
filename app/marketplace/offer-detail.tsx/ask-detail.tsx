import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OfferTabs from "./offer-tabs";
import OrderFillDialog from "./order-fill-dialog";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { WithTip } from "../create-offer/with-tip";
import { useBidTaker } from "@/lib/hooks/contract/use-bid-taker";

export default function AskDetail({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  const buyPointAmount = 1000;
  const payTokenAmount = 22;
  const platFormFee = 0.025;
  const payToken = "USDC";
  const buyPoint = "Points";

  const [sliderMax] = useState(100);
  const [sliderValue, setSliderValue] = useState(80);

  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    isLoading: isDepositLoading,
    isSuccess,
    write: createAction,
  } = useBidTaker({
    makerStr: offerDetail.maker,
    preOrder: offerDetail.order,
  });

  function handleConfirmOrder() {
    setDrawerOpen(true);
  }

  function handleBack() {
    setDrawerOpen(false);
  }

  async function handleDeposit() {
    await createAction({
      receivePoint: buyPointAmount,
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
            topText={<>You pay</>}
            bottomText={<>~${formatNum(offerDetail.offerValue)} </>}
            value={offerDetail.offer}
            tokenLogo={offerDetail.stableToken.logoURI}
            sliderMax={sliderMax}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />

          <ReceiveCard
            topText={<>You will receive</>}
            bottomText={<>1 Diamond = ${offerDetail.pointPrice}</>}
            value={offerDetail.for}
            tokenLogo={offerDetail.token.logoURI}
          />

          {offerDetail.filled ? (
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
            You are buying{" "}
            <span className="text-black">
              {buyPointAmount} {buyPoint} pts
            </span>{" "}
            for{" "}
            <span className="text-black">
              {payTokenAmount} {payToken}
            </span>
            . Are you sure?
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-green">
              Buying
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{buyPointAmount}</span>
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
              <span>{payTokenAmount}</span>
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
            Deposit {payTokenAmount} {payToken}
          </button>
        </div>
      </Drawer>
    </>
  );
}
