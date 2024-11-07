"use client";
import Image from "next/image";
// import { usePathname, Link } from "@/app/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Orders from "@/app/[locale]/dashboard/orders/page";
import Holdings from "@/app/[locale]/dashboard/holdings/page";
import Balances from "@/app/[locale]/dashboard/balances/page";
import Referral from "@/app/[locale]/dashboard/referral/page";
import OverviewInfo from "@/app/[locale]/dashboard/overview-info";

export default function MobileMenuCol() {
  // const pathname = usePathname();
  const dm = useTranslations("dashboard-module");

  const [activePanel, setActivePanel] = useState("orders");

  return (
    <>
      {activePanel === "orders" && <Orders />}
      {activePanel === "holdings" && <Holdings />}
      {activePanel === "balances" && <Balances />}
      {activePanel === "referral" && (
        <div className="h-[calc(100vh-156px)] w-full overflow-y-auto p-4 ">
          <Referral />
        </div>
      )}
      {activePanel === "overview" && (
        <div className="h-[calc(100vh-156px)] w-full overflow-y-auto bg-white py-4 ">
          <OverviewInfo />
        </div>
      )}
      <div
        className="fixed bottom-0 left-0 z-[999] flex h-14 w-full items-center justify-around bg-white"
        style={{
          boxShadow: "0px -10px 20px 0px rgba(14, 4, 62, 0.02)",
        }}
      >
        <div
          onClick={() => setActivePanel("orders")}
          data-active={activePanel === "orders"}
          className="flex flex-1 flex-col items-center justify-center gap-y-[2px] opacity-[0.4] data-[active=true]:opacity-[1]"
        >
          <Image src="/icons/menus.svg" width={24} height={24} alt="orders" />
          <span className="ml-2">{dm("menu-Orders")}</span>
        </div>
        <div
          onClick={() => setActivePanel("holdings")}
          data-active={activePanel === "holdings"}
          className="flex flex-1 flex-col items-center justify-center gap-y-[2px] opacity-[0.4] data-[active=true]:opacity-[1]"
        >
          <Image
            src="/icons/holdings.svg"
            width={24}
            height={24}
            alt="holdings"
          />
          <span className="ml-2">{dm("menu-Holdings")}</span>
        </div>
        <div
          onClick={() => setActivePanel("balances")}
          data-active={activePanel === "balances"}
          className="flex flex-1 flex-col items-center justify-center gap-y-[2px] opacity-[0.4] data-[active=true]:opacity-[1]"
        >
          <Image
            src="/icons/wallet.svg"
            width={24}
            height={24}
            alt="balances"
          />
          <span className="ml-2">{dm("menu-Balances")}</span>
        </div>

        <div
          onClick={() => setActivePanel("referral")}
          data-active={activePanel === "referral"}
          className="flex flex-1 flex-col items-center justify-center gap-y-[2px] opacity-[0.4] data-[active=true]:opacity-[1]"
        >
          <Image
            src="/icons/referral-system.svg"
            width={24}
            height={24}
            alt="referral"
          />
          <span className="ml-2">{dm("menu-Referral")}</span>
        </div>
        <div
          onClick={() => setActivePanel("overview")}
          data-active={activePanel === "overview"}
          className="flex flex-1 flex-col items-center justify-center gap-y-[2px] opacity-[0.4] data-[active=true]:opacity-[1]"
        >
          <Image
            src="/icons/compass.svg"
            width={24}
            height={24}
            alt="overview"
          />
          <span className="ml-2">{dm("menu-Overview")}</span>
        </div>
      </div>
    </>
  );
}
