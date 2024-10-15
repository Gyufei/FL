import { useEffect, useMemo, useState } from "react";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import AskDetail from "../offer-detail/ask-detail";
import BidDetail from "../offer-detail/bid-detail";
import OfferFillDialog from "./offer-fill-dialog";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { IOffer } from "@/lib/types/offer";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export default function OfferDetailDrawer({
  offers,
  onSuccess,
}: {
  offers: Array<IOffer>;
  onSuccess: () => void;
}) {
  const ct = useTranslations("Common");
  const ot = useTranslations("drawer-OfferDetail");
  const { connected } = useChainWallet();
  const { anchor: offerId, setAnchorValue } = useAnchor();

  const offer = useMemo(() => {
    return offers?.find((o) => String(o.entry.id) === offerId);
  }, [offers, offerId]);

  const settleMode = upperFirst(offer?.origin_settle_mode);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [resultOrder, setResultOrder] = useState<any | null>(null);

  const isAsk = offer?.entry.direction === "sell";

  useEffect(() => {
    if (offer && connected) {
      setDrawerOpen(true);
    }

    if (!offerId) {
      setDrawerOpen(false);
    }
  }, [offer, offerId]);

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

  if (!offer) {
    return null;
  }

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
          title={isAsk ? ot("cap-AskOfferDetail") : ot("cap-BidOfferDetail")}
          onClose={() => setDrawerOpen(false)}
          tag={ct(settleMode)}
          tagClassName={settleMode === "Protected" ? "bg-green" : "bg-red"}
        />
        {isAsk ? (
          <AskDetail onSuccess={(ord) => handleSuccess(ord)} offer={offer} />
        ) : (
          <BidDetail onSuccess={(ord) => handleSuccess(ord)} offer={offer} />
        )}
      </Drawer>
      {resultOrder && (
        <OfferFillDialog
          open={orderFillDialog}
          onOpenChange={(val) => setOrderFillDialog(val)}
          res={resultOrder}
        />
      )}
    </>
  );
}
