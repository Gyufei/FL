"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatNum } from "@/lib/utils/number";

export default function MyBalances() {
  const [openPanel, setOpenPanel] = useState("1");

  const taxIncomeData = {
    walletCount: 6,
    totalAmount: 91230,
  };

  const referralData = {
    walletCount: 5,
    totalAmount: 30280,
  };

  const feesData = {
    walletCount: 3,
    totalAmount: 30270,
  };

  function handleOpenPanel(panelIndex: string) {
    if (!panelIndex) return;
    setOpenPanel(panelIndex);
  }

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center space-x-5">
        <div className="text-xl leading-[30px] text-black">My Balances</div>
      </div>
      <div className="relative mt-5 flex w-full flex-1 flex-col justify-between border-t border-[#eee]">
        <Accordion
          type="single"
          collapsible
          value={openPanel}
          onValueChange={(v) => handleOpenPanel(v)}
        >
          <AccordionItem value="1">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "1"}
                name="Tax Income"
                walletCount={taxIncomeData.walletCount}
                totalAmount={taxIncomeData.totalAmount}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TokenGetCard
                    key={i}
                    name="BNB"
                    logo="/img/token-placeholder.png"
                    amount={100}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "2"}
                name="Referral Bonus"
                walletCount={referralData.walletCount}
                totalAmount={referralData.totalAmount}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TokenGetCard
                    key={i}
                    name="BNB"
                    logo="/img/token-placeholder.png"
                    amount={100}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger showIcon={false}>
              <AcHeader
                open={openPanel === "3"}
                name="Fees"
                walletCount={feesData.walletCount}
                totalAmount={feesData.totalAmount}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TokenGetCard
                    key={i}
                    name="BNB"
                    logo="/img/token-placeholder.png"
                    amount={100}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function AcHeader({
  open,
  name,
  walletCount,
  totalAmount,
}: {
  open: boolean;
  name: string;
  walletCount: number;
  totalAmount: number;
}) {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex flex-1 items-center text-lg leading-[28px] ">
        <div className="flex flex-1 justify-start text-black">{name}</div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">Wallet Count</div>
          <div className="text-black">{walletCount}</div>
        </div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">Total Amount</div>
          <div className="text-black">{formatNum(totalAmount)}</div>
        </div>
      </div>
      <div>
        {open ? (
          <Image src="/icons/ac-plus.svg" width={24} height={24} alt="open" />
        ) : (
          <Image src="/icons/ac-minus.svg" width={24} height={24} alt="open" />
        )}
      </div>
    </div>
  );
}

function TokenGetCard({
  name,
  logo,
  amount,
}: {
  name: string;
  logo: string;
  amount: number;
}) {
  return (
    <div className="flex w-[220px] flex-col items-stretch justify-between rounded-xl bg-white px-4 py-3">
      <div className="flex flex-col">
        <div className="text-sm leading-5 text-lightgray">Token</div>
        <div className="flex items-center gap-x-1">
          <Image src={logo} width={16} height={16} alt="token logo" />
          <div className="text-base leading-6 text-black">{name}</div>
        </div>
      </div>

      <div className="mt-[10px] flex items-end justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-5 text-lightgray">Amount</div>
          <div className="text-base leading-6 text-black">
            {formatNum(amount)}
          </div>
        </div>
        <div className="flex h-7 w-14 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d6] hover:border-0 hover:bg-yellow">
          Get
        </div>
      </div>
    </div>
  );
}
