import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatNum } from "@/lib/utils/number";
import { useState } from "react";
import ConfirmAskTakerSettleBtn from "./confirm-ask-taker-settle-btn";
import { IStock } from "@/lib/types/stock";
import { useStockFormat } from "@/lib/hooks/stock/use-stock-format";
// import { Slider } from "@/components/ui/slider";

export default function ConfirmAskTakerSettleDialog({
  open,
  onOpenChange,
  stock,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  stock: IStock;
  onSuccess: () => void;
}) {
  const orderRole = "Taker";

  const { amount, tokenTotalPrice, orderPointInfo, afterTGEPeriod } =
    useStockFormat({ stock: stock });

  // const [sliderMax] = useState(100);
  // const [sliderValue, setSliderValue] = useState(100);
  const [sliderValue] = useState(100);

  const pointAmount = !afterTGEPeriod ? stock.points : 0;
  const settleAmount = Math.floor(Number(pointAmount) * (sliderValue / 100));

  function handleSuccess() {
    onSuccess();
    onOpenChange(false);
  }

  if (open) {
    console.log(stock, 123);
  }

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
            <div className="text-sm leading-5 text-black">
              #{(stock as any).stock_id || (stock as any).offer_id}
            </div>
          </div>
          <div className="mt-[30px] flex justify-between">
            <div className="text-sm leading-5 text-gray">Your Role</div>
            <div
              data-type={orderRole}
              className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
            >
              {orderRole}
            </div>
          </div>
          <div className="mt-[30px] flex justify-between">
            <div className="text-sm leading-5 text-gray">
              Total Settlement Required
            </div>
            <div className="text-sm leading-5 text-black">
              {formatNum(amount)} (${formatNum(tokenTotalPrice)})
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[#fafafa] p-4">
            <div className="text-xs leading-[18px] text-gray">
              You&apos;re going to settle
            </div>
            <div className="mt-2 flex justify-between">
              <div className="text-2xl leading-[36px]">
                {formatNum(settleAmount)}
              </div>
              <Image
                src={orderPointInfo.logoURI}
                width={28}
                height={28}
                alt="stable token"
                className="h-7 w-7 rounded-full"
              />
            </div>
            {/* <div className="mt-3 flex">
              <Slider
                value={[sliderValue]}
                onValueChange={(val: any[]) => setSliderValue(val[0])}
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
            </div> */}
          </div>

          <ConfirmAskTakerSettleBtn
            marketplaceStr={stock.marketplace.market_place_id}
            stockStr={stock.stock_account}
            makerStr={stock.maker_account}
            preOfferStr={stock.pre_offer_account}
            preOfferAuthorityStr={stock.pre_offer_detail?.authority}
            settleAmount={settleAmount}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}