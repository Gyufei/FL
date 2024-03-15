import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellContent } from "./create-offer/sell-content";
import { BuyContent } from "./create-offer/bue-content";

export default function CreateOfferBtn() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("sell");

  return (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black"
      >
        Create Offer
      </button>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={500}
        className="rounded-l-2xl p-6"
      >
        <div className="flex h-full flex-col">
          <DrawerTitle
            title="Create Maker Offer"
            onClose={() => setDrawerOpen(false)}
          />

          <Tabs
            value={currentTab}
            className="flex flex-1 flex-col"
            onValueChange={setCurrentTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                className="border-b-2 data-[state=inactive]:border-b data-[state=active]:border-red data-[state=inactive]:text-gray data-[state=active]:text-red"
                value="sell"
              >
                Sell / Ask
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=inactive]:border-b data-[state=active]:border-b-2 data-[state=active]:border-green data-[state=inactive]:text-gray data-[state=active]:text-green"
                value="buy"
              >
                Buy / Bid
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sell" className="flex-1">
              <SellContent />
            </TabsContent>
            <TabsContent value="buy" className="flex-1">
              <BuyContent />
            </TabsContent>
          </Tabs>
        </div>
      </Drawer>
    </>
  );
}
