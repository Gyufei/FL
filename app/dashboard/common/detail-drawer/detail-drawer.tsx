import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";

import { IOffer } from "@/lib/types/offer";
import MyAskDetail from "./my-ask-detail";
import MyBidDetail from "./my-bid-detail";
import { useEffect, useMemo, useState } from "react";
import { useAnchor } from "@/lib/hooks/common/use-anchor";

export default function DetailDrawer({
  orders,
  onSuccess,
}: {
  orders: Array<IOffer>;
  onSuccess: () => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { anchor: orderId, setAnchorValue } = useAnchor();

  const order = useMemo(() => {
    return orders?.find((o) => o.offer_id === orderId);
  }, [orders, orderId]);

  const isAsk = useMemo(() => {
    return order?.offer_type === "ask";
  }, [order]);

  function handleDrawerClose() {
    setDrawerOpen(false);
    setAnchorValue("");
  }

  useEffect(() => {
    if (order) {
      setDrawerOpen(true);
    }

    if (!orderId) {
      setDrawerOpen(false);
    }
  }, [order, orderId]);

  function handleSuccess() {
    setDrawerOpen(false);
    onSuccess();
  }

  if (!order) return null;

  return (
    <Drawer
      open={drawerOpen}
      onClose={handleDrawerClose}
      direction="right"
      size={952}
      className="overflow-y-auto rounded-l-2xl p-6"
      customIdSuffix="detail-drawer"
    >
      <DrawerTitle
        title={`My ${isAsk ? "Ask" : "Bid"} Offer Detail`}
        onClose={() => setDrawerOpen(false)}
      />
      {order &&
        (isAsk ? (
          <MyAskDetail order={order} onSuccess={handleSuccess} />
        ) : (
          <MyBidDetail order={order} onSuccess={handleSuccess} />
        ))}
    </Drawer>
  );
}
