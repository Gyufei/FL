"use client";

import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React, { forwardRef, useState } from "react";

export default function Faqs() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <div className="mt-[60px] px-[120px]">
      <div className="text-center text-[28px] leading-10 text-lightgray">
        FAQ&apos;s
      </div>
      <div className="text-center text-4xl leading-[54px] text-black">
        Find out more about Poince
      </div>

      <Collapsible
        open={openIdx === 0}
        onOpenChange={(open) => setOpenIdx(open ? 0 : -1)}
        className="py-6"
        style={{
          boxShadow: "inset 0px -2px 0px 0px #F0F1F5",
        }}
      >
        <CollapsibleTrigger asChild>
          <CollTrigger isOpen={openIdx === 0}>
            How much does an audit contest cost?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Our audit contests are extremely cost-effective. Clients pay a small
            fixed fee to post a bounty for community participation. The more
            issues found, the more the rewards paid from that bounty. We handle
            verifying issues and payouts to make it simple. The collective
            insights greatly outweigh the small fixed cost. Ready to tap into
            community expertise and boost your security? Request an audit today
            to get started.
          </CollContent>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={openIdx === 1}
        onOpenChange={(open) => setOpenIdx(open ? 1 : -1)}
        className="py-6"
        style={{
          boxShadow: "inset 0px -2px 0px 0px #F0F1F5",
        }}
      >
        <CollapsibleTrigger asChild>
          <CollTrigger isOpen={openIdx === 1}>
            How do audit contests work?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Our audit contests are extremely cost-effective. Clients pay a small
            fixed fee to post a bounty for community participation. The more
            issues found, the more the rewards paid from that bounty. We handle
            verifying issues and payouts to make it simple. The collective
            insights greatly outweigh the small fixed cost. Ready to tap into
            community expertise and boost your security? Request an audit today
            to get started.
          </CollContent>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={openIdx === 2}
        onOpenChange={(open) => setOpenIdx(open ? 2 : -1)}
        className="py-6"
        style={{
          boxShadow: "inset 0px -2px 0px 0px #F0F1F5",
        }}
      >
        <CollapsibleTrigger asChild>
          <CollTrigger isOpen={openIdx === 2}>
            Are your audits guaranteed?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Our audit contests are extremely cost-effective. Clients pay a small
            fixed fee to post a bounty for community participation. The more
            issues found, the more the rewards paid from that bounty. We handle
            verifying issues and payouts to make it simple. The collective
            insights greatly outweigh the small fixed cost. Ready to tap into
            community expertise and boost your security? Request an audit today
            to get started.
          </CollContent>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={openIdx === 3}
        onOpenChange={(open) => setOpenIdx(open ? 3 : -1)}
        className="py-6"
        style={{
          boxShadow: "inset 0px -2px 0px 0px #F0F1F5",
        }}
      >
        <CollapsibleTrigger asChild>
          <CollTrigger isOpen={openIdx === 3}>
            How do smart contract audits work?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Our audit contests are extremely cost-effective. Clients pay a small
            fixed fee to post a bounty for community participation. The more
            issues found, the more the rewards paid from that bounty. We handle
            verifying issues and payouts to make it simple. The collective
            insights greatly outweigh the small fixed cost. Ready to tap into
            community expertise and boost your security? Request an audit today
            to get started.
          </CollContent>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

const CollTrigger = forwardRef(
  (
    {
      isOpen,
      children,
      ...props
    }: { isOpen: boolean; children: React.ReactNode },
    ref: any,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center space-x-5">
          <CollDot />
          <div className="relative">
            <div className="relative z-10 text-xl leading-[30px] text-[#3D3D3D]">
              {children}
            </div>
            {isOpen && (
              <div className="absolute bottom-[6px] z-0 h-1 w-full rounded-full bg-yellow"></div>
            )}
          </div>
        </div>

        <div>
          {isOpen ? (
            <Image src="/icons/close.svg" width={20} height={20} alt="close" />
          ) : (
            <Image src="/icons/plus.svg" width={20} height={20} alt="close" />
          )}
        </div>
      </button>
    );
  },
);
CollTrigger.displayName = "CollTrigger";

function CollDot() {
  return <div className="h-[6px] w-[6px] rounded-full bg-black"></div>;
}

function CollContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[10px] pl-[26px] leading-6 text-gray">
      {children}
    </div>
  );
}
