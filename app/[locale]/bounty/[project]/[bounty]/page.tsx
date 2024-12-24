"use client";

import ProjectInfoCard from "./project-info-card";
import ProjectContentDetail from "./project-content-detail";
import ProjectOptions from "./project-options";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";

import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useRouter } from "@/app/navigation";

export default function ProjectContent() {
  const { isMobileSize } = useDeviceSize();
  const router = useRouter();

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col overflow-auto sm:h-[calc(100vh-96px)]">
      <div className="flex flex-1 items-stretch pt-4 sm:pt-0">
        <div className="flex w-full flex-col space-y-6 px-6 sm:w-[368px]">
          <ProjectInfoCard className="h-[218px] w-[320px] shrink-0 grow-0" />
          <ProjectOptions />
        </div>
        <div
          className="flex-1 rounded-3xl bg-[#FAFAFA] px-6 py-6"
          style={{
            minHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "min(calc(100vh - 156px), 691px)",
            maxHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "max(calc(100vh - 156px), 691px)",
          }}
        >
          <ProjectContentDetail closeDetail={() => router.back()} />
        </div>
      </div>
      <PageFooter className="hidden sm:flex" />
    </div>
  );
}
