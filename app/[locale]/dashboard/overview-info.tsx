"use client";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { Input } from "@/components/ui/input";
import {
  useAccountOverview,
  useUserNameChange,
} from "@/lib/hooks/api/use-account-overview";
import { DateRange } from "react-day-picker";
import { useEffect, useRef, useState } from "react";
import { format, subDays } from "date-fns";
import { TadleXp } from "./tadle-xp";
import DateRangePickerDialog from "@/components/share/date-range-picker-dialog";
import { useTranslations } from "next-intl";
import ReferralLink from "./referral-link";

export default function OverviewInfo() {
  const T = useTranslations("cd-AccountOverview");
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 5),
    to: undefined,
  });

  const { data: accountInfo, mutate: refetchAccountInfo } =
    useAccountOverview();
  const { trigger: updateUserNameAction, data: updateRes } =
    useUserNameChange();

  const [nameInputValue, setNameInputValue] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    if (accountInfo) {
      setNameInputValue(accountInfo.user_name);
    }
  }, [accountInfo]);

  useEffect(() => {
    if (updateRes) {
      refetchAccountInfo();
    }
  }, [updateRes, refetchAccountInfo]);

  function handleNameInputBlur() {
    if (!accountInfo || !nameInputValue) {
      setShowNameInput(false);
      return;
    }

    updateUserNameAction({
      uuid: accountInfo.uid,
      user_name: nameInputValue,
    });

    accountInfo.user_name = nameInputValue;
    setShowNameInput(false);
  }

  function showInput() {
    setShowNameInput(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }

  return (
    <div className="flex h-full max-h-[800px] flex-col justify-between px-4">
      {/* top header */}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-xs leading-6 text-gray">
              UID {accountInfo?.uid}
            </div>
            {showNameInput ? (
              <Input
                ref={inputRef}
                placeholder={T("pl-Username")}
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
                className="h-6 w-40 rounded-none border-x-0 border-b border-t-0 border-[#f0f1f5] bg-white pl-0  text-black"
                onBlur={handleNameInputBlur}
              />
            ) : (
              <div className="flex items-center gap-1">
                <div className="leading-6 text-black">
                  {accountInfo?.user_name || ""}
                </div>
                <Image
                  onClick={showInput}
                  src="/icons/edit2.svg"
                  width={16}
                  height={16}
                  alt="edit"
                  className="cursor-pointer"
                />
              </div>
            )}
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
                <span>{T("txt-PickADate")}</span>
              )}
            </div>
          </DateRangePickerDialog>
        </div>

        {/* overview */}
        <div className="mt-6 rounded-3xl bg-[#fafafa] p-5">
          <div className="leading-6 text-black">{T("cap-AccountOverview")}</div>
          <div className="mt-5 flex justify-between">
            <div>
              <LabelText>{T("lb-TradeVol")}</LabelText>
              <div className="leading-6 text-black">
                ${formatNum(accountInfo?.trade_vol)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <LabelText>{T("lb-Profit")}</LabelText>
              <div
                data-loss={accountInfo?.profit < 0}
                className="leading-6 data-[loss=true]:text-red data-[loss=false]:text-green"
              >
                {accountInfo?.profit < 0 ? "-" : "+"}$
                {formatNum(Math.abs(accountInfo?.profit))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              <LabelText>{T("lb-MakerOrders")}</LabelText>
              <div className="leading-6 text-black">
                {formatNum(accountInfo?.maker_order)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <LabelText>{T("lb-TakerOrders")}</LabelText>
              <div className="leading-6 text-black">
                {formatNum(accountInfo?.taker_order)}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-between">
            <div>
              <LabelText>{T("lb-SettledValue")}</LabelText>
              <div className="leading-6 text-black">
                ${formatNum(accountInfo?.settled_value)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <LabelText>{T("lb-BonusIncome")}</LabelText>
              <div
                data-loss={accountInfo?.tax_income < 0}
                className="leading-6 data-[loss=true]:text-red data-[loss=false]:text-green"
              >
                {accountInfo?.tax_income < 0 ? "-" : "+"}$
                {formatNum(Math.abs(accountInfo?.tax_income))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TadleXp />

      <ReferralLink />
    </div>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return <div className="text-xs leading-[18px] text-gray">{children}</div>;
}
