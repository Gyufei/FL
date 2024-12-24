"use client";

import ProjectBanner from "./project-banner";
import ProjectBannerMobile from "./project-banner-mobile";
import ProjectCard from "./project-card";
import PageFooter from "../_page-layout/_page-footer";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function Home() {
  const { isMobileSize } = useDeviceSize();
  return (
    <div className="sm:h-[calc(100vh-96px)  mx-auto flex h-[calc(100vh-100px)] w-full flex-col space-y-8 overflow-auto p-4 sm:min-w-[1000px] sm:p-6">
      {isMobileSize ? <ProjectBannerMobile /> : <ProjectBanner />}

      <div className="grid w-full flex-1 gap-8 text-[#2D2E33] md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-[#FAFAFA] p-5">
          <h2 className="mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-yellow"></span>
            <span className="">New</span>
          </h2>
          <div className="space-y-4">
            <ProjectCard
              name="Winter Wonderland: Backpack"
              participants={156}
              logo="/img/mock/矩形 1321@1x (1).png"
              showParticipants
            />
            <ProjectCard
              name="Layer3"
              participants={89}
              logo="/img/mock/矩形 1321@1x (1).png"
              showParticipants
            />
            <ProjectCard
              name="Metacora"
              participants={234}
              logo="/img/mock/矩形 1321@1x (1).png"
              showParticipants
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#E8E8E8] p-5 text-[#2D2E33]">
          <h2 className="mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-yellow"></span>
            <span className="">Trending Projects</span>
          </h2>
          <div className="space-y-4">
            <ProjectCard
              name="Jito"
              participants={412}
              logo="/img/mock/矩形 1321@1x (1).png"
              bgColor="bg-[#FAFAFA]"
            />
            <ProjectCard
              name="Layer3"
              participants={356}
              logo="/img/mock/矩形 1321@1x (2).png"
              bgColor="bg-[#FAFAFA]"
            />
            <ProjectCard
              name="Metacora"
              participants={289}
              logo="/img/mock/矩形 1321@1x (3).png"
              bgColor="bg-[#FAFAFA]"
            />
          </div>
        </div>
      </div>
      <PageFooter className="hidden sm:flex" />
    </div>
  );
}
