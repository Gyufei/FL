import { useState } from "react";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Wallets from "./connect-info/wallets";
import SocialMedia from "./connect-info/social-media";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function ConnectInfoDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const T = useTranslations("Header");
  const { isMobile } = useDeviceSize();

  const [currentTab, setCurrentTab] = useState("wallets");

  return (
    <Drawer
      open={open}
      onClose={() => onClose()}
      direction={isMobile ? "bottom" : "right"}
      size={isMobile ? "calc(100vh - 44px)" : 500}
      className="flex flex-col overflow-y-auto rounded-l-2xl p-6"
    >
      <DrawerTitle title={T("drawer-title-Info")} onClose={() => onClose()} />

      <Tabs
        value={currentTab}
        className="flex flex-1 flex-col"
        onValueChange={setCurrentTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green data-[state=inactive]:border-[#eee] data-[state=active]:text-green data-[state=inactive]:text-[#99a0af]"
            value="wallets"
          >
            {T("drawer-Wallets")}
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green data-[state=inactive]:border-[#eee] data-[state=active]:text-green data-[state=inactive]:text-[#99a0af]"
            value="socialMedia"
          >
            {T("drawer-SocialMedia")}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="wallets"
          className="flex flex-1 flex-col data-[state=inactive]:hidden"
          forceMount={true}
        >
          {" "}
          <Wallets />
        </TabsContent>
        <TabsContent
          value="socialMedia"
          className="flex flex-1 flex-col data-[state=inactive]:hidden"
          forceMount={true}
        >
          <SocialMedia />
        </TabsContent>
      </Tabs>
    </Drawer>
  );
}
