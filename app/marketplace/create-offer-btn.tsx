import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellContent } from "./create-offer/sell-content";
import { BuyContent } from "./create-offer/buy-content";

export default function CreateOfferBtn() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("sell");

  const [step, setStep] = useState(0);

  function handleCloseDrawer() {
    setStep(0);
    setDrawerOpen(false);
  }

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
        onClose={() => handleCloseDrawer()}
        direction="right"
        size={500}
        className="flex flex-col overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title={step === 0 ? "Create Maker Offer" : "Create Offer"}
          onClose={() => handleCloseDrawer()}
        />

        <Tabs
          value={currentTab}
          className="flex flex-1 flex-col"
          onValueChange={setCurrentTab}
        >
          <TabsList
            data-show={step === 0}
            className="grid w-full grid-cols-2 data-[show=false]:hidden"
          >
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
          <TabsContent
            value="sell"
            className="flex flex-1 flex-col data-[state=inactive]:hidden"
          >
            <SellContent step={step} setStep={setStep} />
          </TabsContent>
          <TabsContent
            value="buy"
            className="flex flex-1 flex-col data-[state=inactive]:hidden"
          >
            <BuyContent step={step} setStep={setStep} />
          </TabsContent>
        </Tabs>
      </Drawer>
    </>
  );
}