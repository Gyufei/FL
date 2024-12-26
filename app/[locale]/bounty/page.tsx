"use client";

import ProjectBanner from "./featured";
import ProjectBannerMobile from "./featured-mobile";
import New from "./new";
import Trending from "./trending";
import PageFooter from "../_page-layout/_page-footer";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function Home() {
  const { isMobileSize } = useDeviceSize();
  return (
    <div className="sm:h-[calc(100vh-96px)  mx-auto flex h-[calc(100vh-100px)] w-full flex-col space-y-8 overflow-auto p-4 sm:min-w-[1200px] sm:p-6">
      {isMobileSize ? <ProjectBannerMobile /> : <ProjectBanner />}

      <div className="grid w-full flex-1 gap-8 text-[#2D2E33] md:grid-cols-2">
        <New />
        <Trending />
      </div>
      <PageFooter className="hidden sm:flex" />
    </div>
  );
}
