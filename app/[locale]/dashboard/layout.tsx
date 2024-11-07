"use client";
import MenuCol from "@/app/[locale]/dashboard/menu-col";
import OverviewInfo from "@/app/[locale]/dashboard/overview-info";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";
import { useTranslations } from "next-intl";
import MobilePageFooter, {
  IMobilePanel,
} from "../_page-layout/_page-footer/page-footer-mobile";
import { useMemo, useState } from "react";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { isMobile } = useDeviceSize();
  const pt = useTranslations("menu-Dashboard");

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

  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="ml-4 flex flex-1 rounded-3xl bg-[#fafafa] p-5">
          <MenuCol />
          {children}
        </div>
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
        setActivePanel={setActivePanel}
      />
    </div>
  );
}
