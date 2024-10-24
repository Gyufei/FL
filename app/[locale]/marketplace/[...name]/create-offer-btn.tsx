import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellContent } from "./create-offer/sell-content";
import { BuyContent } from "./create-offer/buy-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";

export default function CreateOfferBtn({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("drawer-CreateOffer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("sell");

  function handleCloseDrawer() {
    setDrawerOpen(false);
  }

  function handleSuccess() {
    handleCloseDrawer();
    onSuccess();
  }

  return (
    <>
      <WithWalletConnectBtn
        className="w-full"
        onClick={() => setDrawerOpen(true)}
      >
        <button className="flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
          {T("btn-CreateOffer")}
        </button>
      </WithWalletConnectBtn>
      <Drawer
        open={drawerOpen}
        onClose={() => handleCloseDrawer()}
        direction="right"
        size={500}
        className="flex flex-col overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title={T("cap-CreateMakerOffer")}
          onClose={() => handleCloseDrawer()}
        />

        <Tabs
          value={currentTab}
          className="flex flex-1 flex-col"
          onValueChange={setCurrentTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              className="rounded-none border-b-2 data-[state=inactive]:border-b data-[state=active]:border-red data-[state=inactive]:border-[#eee] data-[state=active]:text-red data-[state=inactive]:text-[#99a0af]"
              value="sell"
            >
              {T("cap-Sell")} / {T("cap-Ask")}
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-b-2 data-[state=inactive]:border-b data-[state=active]:border-green data-[state=inactive]:border-[#eee] data-[state=active]:text-green data-[state=inactive]:text-[#99a0af]"
              value="buy"
            >
              {T("cap-Buy")} / {T("cap-Bid")}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="sell"
            className="flex flex-1 flex-col data-[state=inactive]:hidden"
            forceMount={true}
          >
            <SellContent onSuccess={handleSuccess} marketplace={marketplace} />
          </TabsContent>
          <TabsContent
            value="buy"
            className="flex flex-1 flex-col data-[state=inactive]:hidden"
            forceMount={true}
          >
            <BuyContent onSuccess={handleSuccess} marketplace={marketplace} />
          </TabsContent>
        </Tabs>
      </Drawer>
    </>
  );
}
