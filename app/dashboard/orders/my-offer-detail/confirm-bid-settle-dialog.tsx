import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatNum } from "@/lib/utils/number";
import ConfirmBidTakerSettleBtn from "./confirm-bid-taker-settle";
import ConfirmBidMakerSettleBtn from "./confirm-bid-maker-settle";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";

export default function ConfirmBidSettleDialog({
  open,
  onOpenChange,
  order,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  order: IOrder;
}) {
  const { amount, tokenTotalPrice, orderPointInfo } = useOrderFormat({ order });
  const orderRole = order.order_role;

  const settleAmount = Number(order.points);

  console.log(order);

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
              #{order.order_id}
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
              />
            </div>
          </div>

          {orderRole === "Taker" && (
            <ConfirmBidTakerSettleBtn
              marketplaceStr={order.marketplace.market_place_id}
              orderStr={order.order}
              makerStr={order.maker_id}
              preOrderStr={order.pre_order_included_zero}
              onDone={() => onOpenChange(false)}
            />
          )}
          {orderRole === "Maker" && (
            <ConfirmBidMakerSettleBtn
              marketplaceStr={order.marketplace.market_place_id}
              orderStr={order.order}
              makerStr={order.maker_id}
              onDone={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
