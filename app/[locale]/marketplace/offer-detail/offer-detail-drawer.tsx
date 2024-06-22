import { useEffect, useMemo, useState } from "react";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import AskDetail from "../offer-detail/ask-detail";
import BidDetail from "../offer-detail/bid-detail";
import OrderFillDialog from "../offer-detail/order-fill-dialog";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { IOffer } from "@/lib/types/offer";
import { upperFirst } from "lodash";
import { useMakerDetail } from "@/lib/hooks/api/use-maker-detail";
import { useTranslations } from "next-intl";

export default function OfferDetailDrawer({
  orders,
  onSuccess,
}: {
  orders: Array<IOffer>;
  onSuccess: () => void;
}) {
  const ct = useTranslations("Common");
  const ot = useTranslations("drawer-OfferDetail");
  const { anchor: orderId, setAnchorValue } = useAnchor();

  const order = useMemo(() => {
    return orders?.find((o) => o.offer_id === orderId);
  }, [orders, orderId]);

  const { data: makerDetail } = useMakerDetail({
    makerId: order?.maker_account,
  });

  const settleMode = upperFirst(makerDetail?.offer_settle_type);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [resultOrder, setResultOrder] = useState<any | null>(null);

  const isAsk = order?.offer_type === "ask";

  useEffect(() => {
    if (order) {
      setDrawerOpen(true);
    }

    if (!orderId) {
      setDrawerOpen(false);
    }
  }, [order, orderId]);

  function handleSuccess(ord: Record<string, any>) {
    setDrawerOpen(false);
    setResultOrder(ord);
    setOrderFillDialog(true);
    onSuccess();
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
    setAnchorValue("");
  }

  if (!order) return null;

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        direction="right"
        size={952}
        className="overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title={`
          ${isAsk ? ot("cap-AskOfferDetail") : ot("cap-BidOfferDetail")}
          [${ct(settleMode)}]`}
          onClose={() => setDrawerOpen(false)}
        />
        {isAsk ? (
          <AskDetail onSuccess={(ord) => handleSuccess(ord)} offer={order} />
        ) : (
          <BidDetail onSuccess={(ord) => handleSuccess(ord)} order={order} />
        )}
      </Drawer>
      {resultOrder && (
        <OrderFillDialog
          open={orderFillDialog}
          onOpenChange={(val) => setOrderFillDialog(val)}
          res={resultOrder}
        />
      )}
    </>
  );
}
