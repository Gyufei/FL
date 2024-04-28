import Image from "next/image";
import { useState } from "react";
import { IOrder } from "@/lib/types/order";
import ConfirmAskSettleDialog from "../../orders/my-offer-detail/confirm-ask-settle-dialog";
import ConfirmBidSettleDialog from "../../orders/my-offer-detail/confirm-bid-settle-dialog";

export default function SettleDrawerBtn({ order }: { order: IOrder }) {
  const isAsk = order.order_type === "ask";
  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

  function handleDrawerOpen(open: boolean) {
    setSettleConfirmShow(open);
  }

  return (
    <div>
      <div
        onClick={() => handleDrawerOpen(true)}
        className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black data-[disabled=true]:bg-gray"
      >
        <Image src="/icons/settle.svg" width={16} height={16} alt="list" />
        <span>Settle</span>
      </div>

      {isAsk ? (
        <ConfirmAskSettleDialog
          order={order}
          open={settleConfirmShow}
          onOpenChange={setSettleConfirmShow}
        />
      ) : (
        <ConfirmBidSettleDialog
          order={order}
          open={settleConfirmShow}
          onOpenChange={setSettleConfirmShow}
        />
      )}
    </div>
  );
}
