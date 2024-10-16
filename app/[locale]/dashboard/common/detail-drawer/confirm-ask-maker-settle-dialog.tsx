import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatNum } from "@/lib/utils/number";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import ConfirmAskMakerSettleBtn from "./confirm-ask-maker-settle-btn";
import { IOffer } from "@/lib/types/offer";
import { useState } from "react";

export default function ConfirmAskMakerSettleDialog({
  open,
  onOpenChange,
  offer,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  offer: IOffer;
  onSuccess: () => void;
}) {
  // const ct = useTranslations("Common");
  const orderRole = "Maker";

  const {
    amount,
    tokenTotalPrice,
    offerPointInfo: orderPointInfo,
    afterTGEPeriod,
  } = useOfferFormat({
    offer: offer,
  });

  // const [sliderMax] = useState(100);
  // const [sliderValue, setSliderValue] = useState(100);
  const [sliderValue] = useState(100);

  const pointAmount = !afterTGEPeriod ? offer.taken_item_amount : 0;
  const settleAmount = Math.floor(Number(pointAmount) * (sliderValue / 100));

  function handleSuccess() {
    onSuccess();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent
        overlayClassName="z-[110]"
        className="z-[110] flex w-[400px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
        aria-describedby={undefined}
      >
        <DialogTitle>Settle Ask Offer</DialogTitle>
        <div className="mt-[30px] w-full">
          <div className="flex justify-between">
            <div className="text-sm leading-5 text-gray">Ask Offer No.</div>
            <div className="text-sm leading-5 text-black">
              #{(offer as any)?.stock_id || (offer as any)?.entry?.id}
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
          </div>

          <ConfirmAskMakerSettleBtn
            isHoldingsLoading={false}
            marketplaceStr={offer.marketplace.market_place_id}
            orderStr={offer.offer_id}
            makerStr={offer.offer_maker}
            settleAmount={settleAmount}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
