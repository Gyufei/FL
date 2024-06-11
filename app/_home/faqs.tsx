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
    <div className="mt-[60px] bg-[rgba(224,255,98,0.1)] px-4 py-20 sm:px-[120px]">
      <div className="flex items-start justify-between">
        <div />
        <div className="text-center text-2xl leading-9 text-black sm:text-4xl sm:leading-[54px]">
          FAQ
        </div>
        <div className="flex cursor-pointer items-center space-x-1">
          <div className="text-lg leading-6 text-black">More</div>
          <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
        </div>
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
          <CollTrigger isOpen={openIdx === 0}>What is Point?</CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Before issuing tokens, various Web3 projects conduct a series of
            operational activities to encourage user interaction. Points are
            awarded for users’ participation. In the future, these points may be
            exchanged for the corresponding tokens.
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
            What is Point Market?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            A Point Market is a marketplace for users to buy and sell points
            among themselves. Since the project has not yet issued tokens, users
            have various reasons for needing liquidity for the points they have
            already acquired. Therefore, the Point Market service has emerged to
            meet this demand.
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
            How do I start to trade?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            1. Connect to your wallet
            <br />
            2. Discover the projects whose points you want to trade
            <br />
            3. Place a buy or sell order
            <br />
            4. View your trading history and earnings in your personal dashboard
            <br />
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
            <div className="relative z-10 text-base leading-6 text-[#3D3D3D] sm:text-xl sm:leading-[30px]">
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
  return (
    <div className="h-1 w-1 rounded-full bg-black sm:h-[6px] sm:w-[6px]"></div>
  );
}

function CollContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[10px] pl-[26px] text-sm leading-5 text-gray sm:text-base sm:leading-6">
      {children}
    </div>
  );
}
