"use client";
import { useState } from "react";

import ProjectInfoCard from "./project-info-card";
import ProjectItemCard from "./project-item-card";
import ProjectContentDetail from "./project-content-detail";
import ProjectOptions from "./project-options";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";

import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function ProjectContent() {
  const { isMobileSize } = useDeviceSize();

  const [showDetail, setShowDetail] = useState<any>(null);

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
          {showDetail === null ? (
            <>
              <div className="flex items-center gap-3 border-b border-[#E8E8E8] pb-5">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E8FF81] text-[16px]" />
                <h1 className="text-[20px]">Bounties</h1>
              </div>
              <div
                className="no-scroll-bar mt-5 grid flex-1 auto-rows-min grid-cols-1 gap-5 overflow-y-auto xl:grid-cols-2 2xl:grid-cols-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                }}
              >
                <ProjectItemCard openDetail={() => setShowDetail({})} />
                <ProjectItemCard openDetail={() => setShowDetail({})} />
                <ProjectItemCard openDetail={() => setShowDetail({})} />
                <ProjectItemCard openDetail={() => setShowDetail({})} />
              </div>
            </>
          ) : (
            <ProjectContentDetail closeDetail={() => setShowDetail(null)} />
          )}
        </div>
      </div>
      <PageFooter className="hidden sm:flex" />
    </div>
  );
}
