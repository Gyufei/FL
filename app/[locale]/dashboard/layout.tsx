"use client";
import { useTranslations } from "next-intl";
import MobilePageFooter, {
  IMobilePanel,
} from "../_page-layout/_page-footer/page-footer-mobile";
import { useMemo, useState } from "react";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useRouter } from "@/app/navigation";
import PageFooter from "../_page-layout/_page-footer";
import MenuCol from "./menu-col";
import OverviewInfo from "./overview-info";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { isMobile } = useDeviceSize();
  const pt = useTranslations("menu-Dashboard");
  const router = useRouter();

  const mobilePanels: Array<IMobilePanel> = useMemo(
    () => [
      {
        name: "orders",
        icon: "/icons/menus.svg",
        label: pt("cap-Orders"),
      },
      {
        name: "holdings",
        icon: "/icons/holdings.svg",
        label: pt("cap-Holdings"),
      },
      {
        name: "balances",
        icon: "/icons/wallet.svg",
        label: pt("cap-Balances"),
      },
      {
        name: "referral",
        icon: "/icons/referral-system.svg",
        label: pt("cap-Referral"),
      },
      {
        name: "Overview",
        icon: "/icons/overview.svg",
        label: pt("cap-Overview"),
      },
    ],
    [pt],
  );

  const [activePanel, setActivePanel] = useState(mobilePanels[0].name);

  function checkIsActive(name: string) {
    if (!isMobile) return true;

    return activePanel === name;
  }

  function handleClickMenuItem(pn: string) {
    setActivePanel(pn);

    if (pn === "Overview") {
      return;
    }

    const hrefMap = {
      orders: "/dashboard/orders",
      holdings: "/dashboard/holdings",
      balances: "/dashboard/balances",
      referral: "/dashboard/referral",
    };

    router.push((hrefMap as any)[pn]);
  }

  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        {!(isMobile && checkIsActive("Overview")) && (
          <div className="ml-0 flex flex-1 rounded-none bg-[#fafafa] p-5 sm:ml-4 sm:rounded-3xl">
            <MenuCol />
            {children}
          </div>
        )}
        {checkIsActive("Overview") && (
          <div className="w-full sm:w-[368px]">
            <OverviewInfo />
          </div>
        )}
      </div>
      <PageFooter className="hidden sm:flex" />
      <MobilePageFooter
        panels={mobilePanels}
        activePanel={activePanel}
        setActivePanel={handleClickMenuItem}
      />
    </div>
  );
}
