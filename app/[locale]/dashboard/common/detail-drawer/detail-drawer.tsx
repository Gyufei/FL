import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";

import { IOffer } from "@/lib/types/offer";
import MyAskDetail from "./my-ask-detail";
import MyBidDetail from "./my-bid-detail";
import { useEffect, useMemo, useState } from "react";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";

export default function DetailDrawer({
  offers,
  onSuccess,
}: {
  offers: Array<IOffer>;
  onSuccess: () => void;
}) {
  const ct = useTranslations("Common");
  const ot = useTranslations("drawer-OfferDetail");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { anchor: orderId, setAnchorValue } = useAnchor();

  const offer = useMemo(() => {
    return offers?.find((o) => String(o.entry.id) === orderId);
  }, [offers, orderId]);

  const settleMode = upperFirst(offer?.origin_settle_mode);

  const isAsk = useMemo(() => {
    return offer?.entry.direction === "sell";
  }, [offer]);

  function handleDrawerClose() {
    setDrawerOpen(false);
    setAnchorValue("");
  }

  useEffect(() => {
    if (offer) {
      setDrawerOpen(true);
    }

    if (!orderId) {
      setDrawerOpen(false);
    }
  }, [offer, orderId]);

  function handleSuccess() {
    setDrawerOpen(false);
    onSuccess();
  }

  if (!offer) return null;

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
        title={isAsk ? ot("cap-MyAskOfferDetail") : ot("cap-MyBidOfferDetail")}
        onClose={() => setDrawerOpen(false)}
        tag={ct(settleMode)}
        tagClassName={settleMode === "Protected" ? "bg-green" : "bg-red"}
      />
      {offer &&
        (isAsk ? (
          <MyAskDetail offer={offer} onSuccess={handleSuccess} />
        ) : (
          <MyBidDetail offer={offer} onSuccess={handleSuccess} />
        ))}
    </Drawer>
  );
}
