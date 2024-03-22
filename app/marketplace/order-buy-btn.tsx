import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import AskDetail from "./offer-detail.tsx/ask-detail";
import BidDetail from "./offer-detail.tsx/bid-detail";
import { IOrder } from "@/lib/types/order";
import OrderFillDialog from "./offer-detail.tsx/order-fill-dialog";

export default function OrderBuyBtn({ order: order }: { order: IOrder }) {
  const isAsk = order.order_type === "ask";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [resultOrder, setResultOrder] = useState<IOrder | null>(null);

  function handleSuccess(ord: IOrder) {
    setDrawerOpen(false);
    setResultOrder(ord);
    setOrderFillDialog(true);
  }

  return (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex items-center justify-center rounded-full border border-[#eee] py-1 px-[18px] text-sm leading-5 text-black hover:bg-yellow"
      >
        Buy
      </button>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={952}
        className="overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title={`${isAsk ? "Ask" : "Bid"} Offer Detail`}
          onClose={() => setDrawerOpen(false)}
        />
        {isAsk ? (
          <AskDetail onSuccess={(ord) => handleSuccess(ord)} order={order} />
        ) : (
          <BidDetail onSuccess={(ord) => handleSuccess(ord)} order={order} />
        )}
      </Drawer>
      {resultOrder && (
        <OrderFillDialog
          open={orderFillDialog}
          onOpenChange={(val) => setOrderFillDialog(val)}
          order={resultOrder}
        />
      )}
    </>
  );
}
