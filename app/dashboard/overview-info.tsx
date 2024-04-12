"use client";
import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { useAccountOverview } from "@/lib/hooks/api/use-account-overview";
// import { GaugeComponent } from "./gauge";

export default function OverviewInfo() {
  // TODO: date-pick-comp
  const date = "Mar 4, 2024";

  const { data: accountInfo } = useAccountOverview();

  return (
    <div className="flex h-full flex-col justify-between px-4">
      {/* top header */}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-xs leading-6 text-gray">
              UID {accountInfo?.uid}
            </div>
            <div className="leading-6 text-black">
              {accountInfo?.user_name || ""}
            </div>
          </div>

          <div className="flex h-12 items-center space-x-2 rounded-full bg-[#fafafa] px-5 text-sm leading-5 text-black">
            <Image
              src="/icons/calendar.svg"
              width={24}
              height={24}
              alt="calendar"
            />
            <span>{date}</span>
          </div>
        </div>

        {/* overview */}
        <div className="mt-6 rounded-3xl bg-[#fafafa] p-5">
          <div className="leading-6 text-black">Account Overview</div>
          <div className="mt-5 flex justify-between">
            <div>
              <LabelText>Trade Vol.</LabelText>
              <div className="leading-6 text-black">
                ${formatNum(accountInfo?.trade_vol)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <LabelText>Profit</LabelText>
              <div
                data-loss={accountInfo?.profit < 0}
                className="leading-6 data-[loss=true]:text-red data-[loss=false]:text-green"
              >
                {accountInfo?.profit < 0 ? "-" : "+"} $
                {formatNum(accountInfo?.profit)}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              <LabelText>Maker Orders</LabelText>
              <div className="leading-6 text-black">
                {formatNum(accountInfo?.maker_order)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <LabelText>Taker Orders</LabelText>
              <div className="leading-6 text-black">
                {formatNum(accountInfo?.taker_order)}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-between">
            <div>
              <LabelText>Notional Value to Settle</LabelText>
              <div className="leading-6 text-black">
                ${formatNum(accountInfo?.settled_value)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <LabelText>Tax Income</LabelText>
              <div
                data-loss={accountInfo?.tax_income < 0}
                className="leading-6 data-[loss=true]:text-red data-[loss=false]:text-green"
              >
                {accountInfo?.tax_income < 0 ? "-" : "+"} $
                {formatNum(accountInfo?.tax_income)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[210px]">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">Tadle XP</div>
        </div>
        {/* <GaugeComponent
          type="semicircle"
          arc={{
            colorArray: ["#00FF15", "#FF2121"],
            padding: 0.02,
            subArcs: [
              { limit: 40 },
              { limit: 60 },
              { limit: 70 },
              {},
              {},
              {},
              {},
            ],
          }}
          pointer={{ type: "blob", animationDelay: 0 }}
          value={50}
        /> */}
      </div>

      <div className="mb-5">
        <div className="leading-[18px] text-gray">Your referral link</div>
        <div className="relative mt-2">
          <Input
            placeholder="https://"
            className="h-12 border-[#d4d4d4] pl-4 pr-[52px] text-base focus:border-[#3dd866]"
          />
          <div className="absolute right-4 top-[13px] leading-[22px] text-lightgray">
            Copy
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return <div className="text-xs leading-[18px] text-gray">{children}</div>;
}
