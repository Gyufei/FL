"use client";

import ProjectInfoCard from "./info-card";
import ProjectContentDetail from "./content-detail";
import ProjectOptions from "./options";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";

import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useRouter } from "@/app/navigation";
import { useState, useMemo, useEffect } from "react";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
const getTaskData = (STORAGE_KEY: string, projectId: any, taskId: any): any => {
  if (typeof window === "undefined") return null;
  if (!STORAGE_KEY) return null;
  const stored = getStoredData(STORAGE_KEY);
  const bountyData = stored.find((i: any) => i.projectId === projectId);
  return bountyData.bounties.find((i: any) => i.id === taskId);
};

const getStoredData = (STORAGE_KEY: string): any => {
  if (typeof window === "undefined") return null;
  if (!STORAGE_KEY) return null;
  const stored =
    localStorage.getItem(STORAGE_KEY) ||
    localStorage.getItem("BOUNTY_2_INIT_DATA");

  return JSON.parse(stored || "");
};
const setStoredData = (STORAGE_KEY: string, data: any) => {
  if (!STORAGE_KEY) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function ProjectContent({ params }: any) {
  const { isMobileSize } = useDeviceSize();
  const router = useRouter();

  const { shortAddr } = useChainWallet();
  const { project: projectId, "missions-detail": taskId } = params;
  const STORAGE_KEY = shortAddr
    ? `BOUNTY_2_DATA-${shortAddr}`
    : "BOUNTY_2_INIT_DATA";

  const [data, setData] = useState<any>(
    getTaskData(STORAGE_KEY, projectId, taskId),
  );

  useEffect(() => {
      const stored = getTaskData(STORAGE_KEY, projectId, taskId);
      if (stored) setData(stored);
  }, [STORAGE_KEY]);

  const bountyData = getStoredData(STORAGE_KEY);
  const projectData = bountyData.find((p: any) => p.projectId === projectId);

  const [selectedChain, setSelectedChain] = useState<string>(
    data.steps[0].chain,
  );
  const [selectedStep, setSelectedStep] = useState(
    data.steps[0].data[0] as any,
  );
  const showSteps = useMemo(() => {
    return data.steps.find(
      (item: { chain: string }) => item.chain === selectedChain,
    );
  }, [data, selectedChain]);

  const handleStepClick = (step: any, userStep: number, index: number) => {
    setSelectedStep(step);
    if (userStep > index) return;

    const newData = {
      ...data,
      steps: data.steps.map((s: any) => {
        if (s.chain === selectedChain) {
          if (s.userStep + 1 === s.data.length) {
            if (bountyData) {
              projectData.status = "finished";
            }
          }
          return {
            ...s,
            userStep: s.userStep + 1,
          };
        }
        return s;
      }),
    };

    setData(newData);
    projectData.bounties = projectData.bounties.map((i: any) => {
      if (i.id === taskId) return newData;
      return i;
    });
    setStoredData(STORAGE_KEY, bountyData);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col overflow-auto sm:h-[calc(100vh-96px)]">
      <div className="flex flex-1 flex-col items-stretch pt-4 sm:flex-row sm:pt-0">
        <div
          className="no-scroll-bar flex w-full flex-col space-y-6 overflow-y-auto px-6 sm:w-[368px]"
          style={{
            minHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "min(calc(100vh - 156px), 691px)",
            maxHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "max(calc(100vh - 156px), 691px)",
          }}
        >
          <ProjectInfoCard
            className="h-[218px] w-full shrink-0 grow-0 sm:w-[320px]"
            closeDetail={() => router.back()}
            data={data}
            clickChain={(chain: any) => {
              setSelectedChain(chain);
            }}
          />
          <div className="no-scroll-bar flex-1 sm:overflow-y-auto">
            <ProjectOptions
              needRegister={!projectData || projectData?.status === "init"}
              steps={showSteps}
              clickStep={handleStepClick}
            />
          </div>
        </div>
        <div
          className="m-4 flex-1 overflow-y-auto rounded-3xl bg-[#FAFAFA] px-6 py-6 sm:m-0"
          style={{
            minHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "min(calc(100vh - 156px), 691px)",
            maxHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "max(calc(100vh - 156px), 691px)",
          }}
        >
          <ProjectContentDetail
            goRegister={() => {
              router.push(`/missions/${projectId}/`);
            }}
            needRegister={!projectData || projectData?.status === "init"}
            htmlStr={selectedStep?.htmlStr || ""}
          />
        </div>
      </div>
      <PageFooter className="hidden sm:flex" />
    </div>
  );
}
