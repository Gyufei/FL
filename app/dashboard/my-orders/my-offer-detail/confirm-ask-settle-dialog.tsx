import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatNum } from "@/lib/utils/number";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import ConfirmAskTakerSettleBtn from "./confirm-ask-taker-settle";
import ConfirmAskMakerSettleBtn from "./confirm-ask-maker-settle";

export default function ConfirmAskSettleDialog({
  open,
  onOpenChange,
  offerDetail,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  offerDetail: Record<string, any>;
}) {
  const askOfferNo = 112093871;
  const required = 64;
  const value = 8845110;
  const tokenLogo = "/icons/magic-eden.svg";

  const [orderType] = useState<"Maker" | "Taker">("Maker");
  const [sliderMax] = useState(100);
  const [sliderValue, setSliderValue] = useState(80);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent
        overlayClassName="z-[110]"
        className="z-[110] flex w-[400px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
      >
        <DialogTitle>Settle Ask Offer</DialogTitle>
        <div className="mt-[30px] w-full">
          <div className="flex justify-between">
            <div className="text-sm leading-5 text-gray">Ask Offer No.</div>
            <div className="text-sm leading-5 text-black">#{askOfferNo}</div>
          </div>
          <div className="mt-[30px] flex justify-between">
            <div className="text-sm leading-5 text-gray">Your Role</div>
            <div
              data-type={orderType}
              className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
            >
              {orderType}
            </div>
          </div>
          <div className="mt-[30px] flex justify-between">
            <div className="text-sm leading-5 text-gray">
              Total Settlement Required
            </div>
            <div className="text-sm leading-5 text-black">{required} $XXX</div>
          </div>

          <div className="mt-5 rounded-2xl bg-[#fafafa] p-4">
            <div className="text-xs leading-[18px] text-gray">
              You&apos;re going to settle
            </div>
            <div className="mt-2 flex justify-between">
              <div className="text-2xl leading-[36px]">{formatNum(value)}</div>
              <Image
                src={tokenLogo}
                width={28}
                height={28}
                alt="stable token"
              />
            </div>
            <div className="mt-3 flex">
              <Slider
                value={[sliderValue]}
                onValueChange={(val) => setSliderValue(val[0])}
                max={sliderMax}
                step={1}
              />
              <div className="ml-4 mr-3 flex h-5 items-center rounded-full border border-[#eee] px-[10px] text-[10px] leading-4 text-black">
                {sliderValue}%
              </div>
              <div
                onClick={() => setSliderValue(sliderMax)}
                className="flex h-5 cursor-pointer items-center rounded-full bg-yellow px-[10px] text-[10px] leading-4 text-black"
              >
                Max
              </div>
            </div>
          </div>

          {orderType === "Taker" && (
            <ConfirmAskTakerSettleBtn
              orderStr={offerDetail.order}
              makerStr={offerDetail.maker}
              preOrderStr={offerDetail.preOrder}
            />
          )}
          {orderType === "Maker" && (
            <ConfirmAskMakerSettleBtn
              orderStr={offerDetail.order}
              makerStr={offerDetail.maker}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
