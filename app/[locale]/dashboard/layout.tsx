"use client";

import MenuCol from "@/app/[locale]/dashboard/menu-col";
import MobileMenuCol from "@/app/[locale]/dashboard/mobile-menu-col";
import OverviewInfo from "@/app/[locale]/dashboard/overview-info";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { isMobile } = useDeviceSize();
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="flex flex-1 rounded-3xl bg-[#fafafa] sm:ml-4 sm:p-5">
          {isMobile ? <MobileMenuCol /> : <MenuCol />}
          {children}
        </div>
        <div className="hidden w-[368px] sm:block">
          <OverviewInfo />
        </div>
      </div>
      <div className="hidden sm:block">
        <PageFooter />
      </div>
    </div>
  );
}
