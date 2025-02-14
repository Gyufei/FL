"use client";

import { Check, Gift } from "lucide-react";
import Image from "next/image";

export default function ProjectOptions({
  needRegister,
  steps,
  clickStep,
}: any) {
  const handleStepClick = (step: any, index: number) => {
    // 只允许点击下一步
    if (steps.userStep >= index) {
      clickStep(step, steps.userStep, index);
    }
  };
  return (
    <div className="relative mx-auto w-full max-w-md flex-1 space-y-6 pb-[80px] text-[14px]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E8FF81] text-[16px]" />
        <h1 className="text-[16px]">Finish All Steps</h1>
      </div>
      <div className="space-y-4">
        {steps.data.map((step: any, index: number) => (
          <div
            key={index}
            data-finish={steps.userStep >= index + 1}
            data-next={steps.userStep === index || steps.userStep >= index + 1}
            className="flex cursor-pointer items-center gap-3 rounded-2xl p-3 data-[next=false]:cursor-not-allowed data-[next=true]:cursor-pointer data-[finish=true]:border data-[finish=false]:bg-[#fafafa] data-[finish=true]:bg-white"
            onClick={() => {
              if (needRegister) return;
              handleStepClick(step, index);
            }}
          >
            <StepIndexText
              userStep={steps.userStep}
              index={index}
              isLast={index === steps.data.length - 1}
            />

            <span
              data-finish={steps.userStep >= index + 1}
              className="flex-grow data-[finish=false]:opacity-60"
            >
              {step.desc}
            </span>
            {steps.userStep < index + 1 && (
              <div className="flex items-center justify-center rounded-lg">
                <Image
                  src="/icons/locks-close.svg"
                  alt="locks"
                  width={28}
                  height={28}
                  className="h-[28px] w-[28px]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rewards Section */}
      <div className="rounded-xl bg-[#fafafa] p-5">
        <div className="mb-1 text-[#99A0AF]">Rewards</div>
        <div className="text-[16px] text-[#2D2E33]">tldBack 24</div>
      </div>

      {/* Participants Section */}
      <div className="flex items-center justify-between rounded-xl bg-[#fafafa] p-3 sm:fixed sm:bottom-[70px] sm:left-6 sm:w-[320px]">
        <span className="">Participants</span>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <Image
              src="/img/mock/矩形 1321@1x (1).png"
              alt="Avatar 1"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <Image
              src="/img/mock/矩形 1321@1x.png"
              alt="Avatar 2"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-white"
            />
          </div>
          <span className="font-medium">10K</span>
        </div>
      </div>
    </div>
  );
}

function StepIndexText({
  userStep,
  index,
  isLast,
}: {
  userStep: number;
  index: number;
  isLast: boolean;
}) {
  if (isLast) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F1F5]">
        <Gift
          className="h-5 w-5"
          color={userStep === index + 1 ? "green" : "#515256"}
        />
      </div>
    );
  }
  if (userStep > index + 1) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8FF81]">
        <Check className="h-5 w-5" />
      </div>
    );
  }
  if (userStep === index + 1) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8FF81]">
        <span>{index + 1}</span>
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F1F5]">
      <span>{index + 1}</span>
    </div>
  );
}
