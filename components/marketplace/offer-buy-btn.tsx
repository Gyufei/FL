import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import AskDetail from "./offer-detail.tsx/ask-detail";
import BidDetail from "./offer-detail.tsx/bid-detail";

export default function OfferBuyBtn({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  const isSell = offerDetail.type === "sell";

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex items-center justify-center rounded-full border border-[#eee] py-1 px-[18px] text-sm leading-5 text-black hover:border-yellow hover:bg-yellow"
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
          title={`${isSell ? "Ask" : "Bid"} Offer Detail`}
          onClose={() => setDrawerOpen(false)}
        />
        {isSell ? (
          <AskDetail offerDetail={offerDetail} />
        ) : (
          <BidDetail offerDetail={offerDetail} />
        )}
      </Drawer>
    </>
  );
}
