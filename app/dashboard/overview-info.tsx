"use client";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { Input } from "../../components/ui/input";
import { useAccountOverview } from "@/lib/hooks/api/use-account-overview";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { format, subDays } from "date-fns";
import { TadleXp } from "./tadle-xp";
import DateRangePickerDialog from "@/components/share/date-range-picker-dialog";

export default function OverviewInfo() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 5),
    to: undefined,
  });

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

          <DateRangePickerDialog dateRange={date} setDateRange={setDate}>
            <div className="flex h-12 items-center space-x-2 rounded-full bg-[#fafafa] px-5 text-sm leading-5 text-black">
              <Image
                src="/icons/calendar.svg"
                width={24}
                height={24}
                alt="calendar"
              />
              {date?.from ? (
                date.to ? (
                  <div className="flex flex-col">
                    <span>{format(date.from, "LLL dd, y")}</span>
                    <span>{format(date.to, "LLL dd, y")}</span>
                  </div>
                ) : (
                  <div>{format(date.from, "LLL dd, y")}</div>
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </DateRangePickerDialog>
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

      <TadleXp />

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
