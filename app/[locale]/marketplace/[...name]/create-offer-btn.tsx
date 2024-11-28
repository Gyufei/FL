import Image from "next/image";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellContent } from "./create-offer/sell-content";
import { BuyContent } from "./create-offer/buy-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";

export default function CreateOfferBtn({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("drawer-CreateOffer");
  const { isMobile } = useDeviceSize();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("sell");

  function handleCloseDrawer() {
    setDrawerOpen(false);
  }

  function handleSuccess() {
    handleCloseDrawer();
    onSuccess();
  }

  const isJustSell = marketplace?.market_catagory === "offchain_fungible_point";

  return (
    <>
      <WithWalletConnectBtn
        chain={marketplace.chain}
        className="w-full"
        onClick={() => setDrawerOpen(true)}
      >
        <button className="hidden h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black sm:flex">
          {T("btn-CreateOffer")}
        </button>
        <button className="absolute -top-[49px] right-[10px] flex h-10 w-10 items-center justify-center rounded-lg bg-yellow sm:hidden">
          <Image
            src="/icons/plus-black.svg"
            width={30}
            height={30}
            alt="create"
          />
        </button>
      </WithWalletConnectBtn>
      <Drawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        direction={isMobile ? "bottom" : "right"}
        size={isMobile ? "calc(100vh - 44px)" : 500}
        className="flex flex-col overflow-y-auto rounded-none p-4 sm:rounded-l-2xl sm:p-6"
      >
        {isMobile ? (
          <MobileDrawerTitle
            title={T("cap-CreateMakerOffer")}
            onClose={handleCloseDrawer}
          />
        ) : (
          <DrawerTitle
            title={T("cap-CreateMakerOffer")}
            onClose={handleCloseDrawer}
          />
        )}

        <Tabs
          value={currentTab}
          className="flex flex-1 flex-col"
          onValueChange={setCurrentTab}
        >
          {!isJustSell && (
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
          )}
          <TabsContent
            value="sell"
            className="flex flex-1 flex-col data-[state=inactive]:hidden"
            forceMount={true}
          >
            <SellContent
              className={isJustSell ? "mt-0" : ""}
              onSuccess={handleSuccess}
              marketplace={marketplace}
            />
          </TabsContent>
          {!isJustSell && (
            <TabsContent
              value="buy"
              className="flex flex-1 flex-col data-[state=inactive]:hidden"
              forceMount={true}
            >
              <BuyContent onSuccess={handleSuccess} marketplace={marketplace} />
            </TabsContent>
          )}
        </Tabs>
      </Drawer>
    </>
  );
}
