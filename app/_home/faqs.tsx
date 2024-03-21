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
        Find out more about Tadle Market
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
            What is Tadle Market?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Tadle Market, built on Tadle Application Layer, is the inaugural pre
            supermarket where users can trade points and future tokens from
            different projects across various blockchains all in one convenient
            platform.
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
          <CollTrigger isOpen={openIdx === 1}>What are “Points”?</CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            More and more projects are adopting a “points system” where users
            earn points for their contributions to the community. These
            accumulated points could potentially be exchanged for the project’s
            token, as observed in recent notable airdrops.
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
            What makes Tadle Market stand out?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Tadle Market presents a cutting-edge point marketplace boasting
            unparalleled speed in data processing, extensive liquidity, and fun
            rewards. Serving as the ultimate nexus for early investors, Key
            Opinion Leaders, and airdrop farmers, Tadle Market curates the
            finest deals available in the market. <br /> Here, points sellers
            can secure their early profits, while points buyers gain access to
            exclusive opportunities to engage with projects in their nascent
            stages. Tadle Market employs funds with exceptional efficiency,
            ensuring that buyers and sellers can engage in transactions with
            confidence, safety, and optimal efficiency.
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
            How does Tadle Market work?
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            Empowered by smart contracts, Tadle Market is committed to streamlining
            on-chain transactions that benefit both buyers and sellers,
            fostering a secure and transparent marketplace environment. One of
            the key features enhancing security on the platform is the
            collateral mechanism. This mechanism acts as a safeguard for market
            participants, mitigating risks and providing an additional layer of
            protection. By requiring collateral, Tadle Market minimizes the potential
            for fraudulent activities and ensures that transactions proceed
            smoothly and fairly.
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
    <div className="mt-[10px] pl-[26px] leading-6 text-gray">{children}</div>
  );
}
