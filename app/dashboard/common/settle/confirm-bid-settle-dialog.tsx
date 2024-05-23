import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatNum } from "@/lib/utils/number";
import ConfirmBidTakerSettleBtn from "./confirm-bid-taker-settle-btn";
import ConfirmBidMakerSettleBtn from "./confirm-bid-maker-settle-btn";
import { IStock } from "@/lib/types/stock";
import { useStockFormat } from "@/lib/hooks/stock/use-stock-format";
import { IOffer } from "@/lib/types/offer";

export default function ConfirmBidSettleDialog({
  open,
  onOpenChange,
  order,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  order: IStock | IOffer;
  onSuccess: () => void;
}) {
  const { amount, tokenTotalPrice, orderPointInfo } = useStockFormat({
    stock: order as IStock,
  });
  const orderRole = "Maker";

  const settleAmount = Number(order.points);

  function handleSuccess() {
    onSuccess();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent
        overlayClassName="z-[110]"
        className="z-[110] flex w-[400px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
      >
        <DialogTitle>Settle Bid Offer</DialogTitle>
        <div className="mt-[30px] w-full">
          <div className="flex justify-between">
            <div className="text-sm leading-5 text-gray">Bid Offer No.</div>
            <div className="text-sm leading-5 text-black">
              #{(order as any)?.stock_id || (order as any)?.offer_id}
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

          {orderRole !== "Maker" && (
            <ConfirmBidTakerSettleBtn
              marketplaceStr={order.marketplace.market_place_id}
              orderStr={order.offer_account}
              makerStr={order.maker_account}
              preOrderStr={order.pre_offer_account}
              onSuccess={handleSuccess}
            />
          )}
          {orderRole === "Maker" && (
            <ConfirmBidMakerSettleBtn
              marketplaceStr={order.marketplace.market_place_id}
              orderStr={order.offer_account}
              makerStr={order.maker_account}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
