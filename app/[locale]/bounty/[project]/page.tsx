"use client";

import ProjectInfoCard from "./project-info-card";
import TaskItemCard from "./project-item-card";
import ProjectOptions from "./project-options";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";

import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useRouter } from "@/app/navigation";
import { TaskItem } from "@/lib/types/bounty";
import { Key, useEffect, useState } from "react";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

const getStoredData = (STORAGE_KEY: string): any => {
  if (typeof window === "undefined") return null;
  if (!STORAGE_KEY) return null;
  const stored =
    localStorage.getItem(STORAGE_KEY) ||
    localStorage.getItem("BOUNTY_2_INIT_DATA");
  return JSON.parse(stored || "");
};

const getProjectData = (STORAGE_KEY: string, projectId: any) => {
  const bountyData = getStoredData(STORAGE_KEY);
  return bountyData.find((i: any) => i.projectId === projectId);
};
const setStoredData = (STORAGE_KEY: string, data: any) => {
  if (!STORAGE_KEY) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
export default function ProjectContent({
  params,
}: {
  params: { project: string };
}) {
  const { shortAddr } = useChainWallet();
  const projectId = params.project;
  const STORAGE_KEY = shortAddr
    ? `BOUNTY_2_DATA-${shortAddr}`
    : "BOUNTY_2_INIT_DATA";

  const [data, setData] = useState<any>(getProjectData(STORAGE_KEY, projectId));

  useEffect(() => {
    if (STORAGE_KEY) {
      const stored = getProjectData(STORAGE_KEY, projectId);
      if (stored) setData(stored);
    }
  }, [STORAGE_KEY]);

  const updateStatus = (newStatus: string) => {
    const updatedData = { ...data, status: newStatus };
    setData(updatedData);
    const updatedDataList = getStoredData(STORAGE_KEY).map((i: any) => {
      if (i.projectId === projectId) {
        return updatedData;
      } else {
        return i;
      }
    });
    setStoredData(STORAGE_KEY, updatedDataList);
  };

  const { isMobileSize } = useDeviceSize();
  const router = useRouter();

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col overflow-auto sm:h-[calc(100vh-96px)]">
      <div className="flex flex-1 flex-col items-stretch pt-4 sm:flex-row sm:pt-0">
        <div className="relative flex w-screen flex-col space-y-6 px-6 sm:w-[368px]">
          <ProjectInfoCard
            className="h-[190px] w-full shrink-0 grow-0 sm:w-[320px]"
            data={data}
          />
          <ProjectOptions status={data.status} onStatusChange={updateStatus} />
        </div>
        <div
          className="flex-1 rounded-3xl px-6 py-6 sm:bg-[#FAFAFA]"
          style={{
            minHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "min(calc(100vh - 156px), 691px)",
            maxHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "max(calc(100vh - 156px), 691px)",
          }}
        >
          <div className="flex items-center gap-3 border-[#E8E8E8] sm:border-b sm:pb-5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E8FF81] text-[16px]" />
            <h1 className="text-[20px]">Bounties</h1>
          </div>
          <div
            className="no-scroll-bar mt-5 grid flex-1 auto-rows-min gap-4 overflow-y-auto sm:gap-5"
            style={{
              gridTemplateColumns: isMobileSize
                ? "repeat(2, minmax(0, 160px))"
                : "repeat(auto-fill, minmax(320px, 1fr))",
              justifyContent: isMobileSize ? "center" : "start",
            }}
          >
            {(data?.bounties || []).map(
              (item: TaskItem, index: Key | null | undefined) => (
                <TaskItemCard
                  key={index}
                  data={item}
                  click={() => {
                    router.push(`/bounty/${projectId}/${item.id}`);
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
      <PageFooter className="hidden sm:flex" />
    </div>
  );
}
