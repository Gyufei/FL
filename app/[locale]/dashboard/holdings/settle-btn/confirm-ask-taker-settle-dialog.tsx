import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatNum } from "@/lib/utils/number";
import { useState } from "react";
import ConfirmAskTakerSettleBtn from "./confirm-ask-taker-settle-btn";
import { IHolding } from "@/lib/types/holding";
import { useTranslations } from "next-intl";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";

export default function ConfirmAskTakerSettleDialog({
  open,
  onOpenChange,
  holding,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  holding: IHolding;
  onSuccess: () => void;
}) {
  const T = useTranslations("dialog-Settle");
  const orderRole = "Taker";

  const {
    amount,
    tokenTotalPrice,
    offerPointInfo,
    afterTGEPeriod,
    isNativeToken,
  } = useOfferFormat({ offer: holding.offer });

  // const [sliderMax] = useState(100);
  // const [sliderValue, setSliderValue] = useState(100);
  const [sliderValue] = useState(100);

  const pointAmount = !afterTGEPeriod ? holding.offer.item_amount : 0;
  const settleAmount = Math.floor(Number(pointAmount) * (sliderValue / 100));

  function handleSuccess() {
    onSuccess();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => onOpenChange(isOpen)}
      aria-describedby={undefined}
    >
      <DialogContent
        overlayClassName="z-[110]"
        className="z-[110] flex w-[400px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
      >
        <DialogTitle>{T("cap-SettleAskOffer")}</DialogTitle>
        <div className="mt-[30px] w-full">
          <div className="flex justify-between">
            <div className="text-sm leading-5 text-gray">
              {T("lb-AskOfferNo")}
            </div>
            <div className="text-sm leading-5 text-black">
              #{(holding as any).stock_id || (holding as any).offer_id}
            </div>
          </div>
          <div className="mt-[30px] flex justify-between">
            <div className="text-sm leading-5 text-gray">
              {T("lb-YourRole")}
            </div>
            <div
              data-type={orderRole}
              className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
            >
              {orderRole}
            </div>
          </div>
          <div className="mt-[30px] flex justify-between">
            <div className="text-sm leading-5 text-gray">
              {T("lb-TotalSettlementRequired")}
            </div>
            <div className="text-sm leading-5 text-black">
              {formatNum(amount)} (${formatNum(tokenTotalPrice)})
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[#fafafa] p-4">
            <div className="text-xs leading-[18px] text-gray">
              {T("lb-YouAreGoingToSettle")}
            </div>
            <div className="mt-2 flex justify-between">
              <div className="text-2xl leading-[36px]">
                {formatNum(settleAmount)}
              </div>
              <Image
                src={offerPointInfo.logoURI}
                width={28}
                height={28}
                alt="stable token"
                className="h-7 w-7 rounded-full"
              />
            </div>
          </div>

          <ConfirmAskTakerSettleBtn
            chain={holding.offer.marketplace.chain}
            marketplaceStr={holding.offer.marketplace.market_place_account}
            holdingStr={holding.holding_id}
            makerStr={holding.offer.offer_maker}
            preOfferStr={holding.offer.offer_id}
            preOfferAuthorityStr={""}
            settleAmount={settleAmount}
            isNativeToken={isNativeToken}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
