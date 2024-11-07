import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";

import { IOffer } from "@/lib/types/offer";
import MyAskDetail from "./my-ask-detail";
import MyBidDetail from "./my-bid-detail";
import { useMemo } from "react";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function OfferAboutMineDetailDrawer({
  holdingId,
  offer,
  onSuccess,
  drawerOpen,
  setDrawerOpen,
}: {
  holdingId: string;
  offer: IOffer | undefined;
  onSuccess: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}) {
  const ct = useTranslations("Common");
  const ot = useTranslations("drawer-OfferDetail");

  const settleMode = upperFirst(offer?.origin_settle_mode);
  const { isMobile } = useDeviceSize();

  const isAsk = useMemo(() => {
    return offer?.entry.direction === "sell";
  }, [offer]);

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  function handleSuccess() {
    if (!drawerOpen) return;
    setDrawerOpen(false);
    onSuccess();
  }

  if (!offer) return null;

  return (
    <Drawer
      open={drawerOpen}
      onClose={handleDrawerClose}
      direction={isMobile ? "bottom" : "right"}
      size={isMobile ? "calc(100vh - 44px)" : 952}
      className="overflow-y-auto rounded-none p-4 sm:rounded-l-2xl sm:p-6"
      customIdSuffix="detail-drawer"
    >
      {isMobile ? (
        <MobileDrawerTitle
          title={
            isAsk ? ot("cap-MyAskOfferDetail") : ot("cap-MyBidOfferDetail")
          }
          onClose={() => setDrawerOpen(false)}
        />
      ) : (
        <DrawerTitle
          title={
            isAsk ? ot("cap-MyAskOfferDetail") : ot("cap-MyBidOfferDetail")
          }
          onClose={() => setDrawerOpen(false)}
          tag={ct(settleMode)}
          tagClassName={settleMode === "Protected" ? "bg-green" : "bg-red"}
        />
      )}
      {offer &&
        (isAsk ? (
          <MyAskDetail
            holdingId={holdingId}
            offer={offer}
            onSuccess={handleSuccess}
          />
        ) : (
          <MyBidDetail
            holdingId={holdingId}
            offer={offer}
            onSuccess={handleSuccess}
          />
        ))}
    </Drawer>
  );
}
