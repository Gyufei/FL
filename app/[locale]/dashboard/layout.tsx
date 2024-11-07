"use client";

import MenuCol from "@/app/[locale]/dashboard/menu-col";
import MobileLayout from "@/app/[locale]/dashboard/mobile-layout";
import OverviewInfo from "@/app/[locale]/dashboard/overview-info";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { isMobile } = useDeviceSize();
  if (isMobile) {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full flex-col">
        <div className="flex flex-1 items-stretch">
          <div className="flex flex-1 rounded-3xl bg-[#fafafa]">
            <MobileLayout />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="ml-4 flex flex-1 rounded-3xl bg-[#fafafa] p-5">
          <MenuCol />
          {children}
        </div>
        <div className="w-[368px]">
          <OverviewInfo />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
