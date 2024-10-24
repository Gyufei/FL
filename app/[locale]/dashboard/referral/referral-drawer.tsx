import Image from "next/image";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";

import { useTranslations } from "next-intl";
import {
  IReferralItem,
  useReferralExtraRate,
} from "@/lib/hooks/api/use-referral-data";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { NumericalInput } from "@/components/share/numerical-input";
import { useReferralRateChange } from "@/lib/hooks/api/use-referral";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { ChainType } from "@/lib/types/chain";

export function ReferralDrawer({
  referral,
  onSuccess,
  drawerOpen,
  setDrawerOpen,
}: {
  referral: IReferralItem | null;
  onSuccess: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (_v: boolean) => void;
}) {
  const rt = useTranslations("page-Referral");

  const { data: extraRateData } = useReferralExtraRate(ChainType.ETH);
  const extraRate = useMemo(
    () => (extraRateData?.data || 0) / 10 ** 4,
    [extraRateData],
  );

  const { referralBaseRate } = useGlobalConfig();

  const {
    trigger: updateReferralRate,
    data: createResult,
    reset: resetCreateResult,
  } = useReferralRateChange();

  const [rate, setRate] = useState(
    String(Number(referral?.referrer_rate || 0) / 10 ** 4),
  );
  const [friendRate, setFriendRate] = useState(
    String(Number(referral?.authority_rate || 0) / 10 ** 4),
  );
  const [rateError, setRateError] = useState(false);

  useEffect(() => {
    setRate(String(Number(referral?.referrer_rate || 0) / 10 ** 4));
    setFriendRate(String(Number(referral?.authority_rate || 0) / 10 ** 4));
  }, [referral]);

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  function handleRateInput(v: string) {
    setRate(v);
  }

  function handleFRateInput(v: string) {
    setFriendRate(v);
  }

  useEffect(() => {
    if (Number(rate) + Number(friendRate) > referralBaseRate + extraRate) {
      setRateError(true);
    } else {
      setRateError(false);
    }
  }, [rate, friendRate, referralBaseRate, extraRate]);

  useEffect(() => {
    if (createResult) {
      onSuccess();
      setDrawerOpen(false);
      resetCreateResult();
    }
  });

  function handleSaveRate() {
    if (rateError) {
      return;
    }

    const args = {
      referral_code: referral?.referral_code || "",
      authority_rate: String(Number(friendRate || 0) * 10 ** 4),
      referrer_rate: String(Number(rate || 0) * 10 ** 4),
    };

    if (
      args.authority_rate === referral?.authority_rate &&
      args.referrer_rate === referral?.referrer_rate
    ) {
      return;
    }

    updateReferralRate(args);
  }

  return (
    <Drawer
      open={drawerOpen}
      onClose={handleDrawerClose}
      direction="right"
      size={500}
      className="flex flex-col overflow-y-auto rounded-l-2xl p-6"
      customIdSuffix="referral-drawer"
    >
      <DrawerTitle
        title={rt("th-CommissionRates")}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="text-base leading-6 text-black">
            {rt("cap-SetReferralLink")}
          </div>
          <div className="mt-2 text-sm leading-5 text-gray">
            {rt("th-ReferralCode")}
          </div>
          <Input
            disabled={true}
            value={referral?.referral_code}
            placeholder="qwerty"
            className="mt-2 h-12 border-[#d8d8d8] pl-4 text-sm disabled:bg-[#F0F1F5]"
          />

          <div className="mt-6 text-base leading-6 text-black">
            {rt("cap-SetCommissionRates")}
          </div>

          <div className="mt-2 flex items-center justify-between space-x-3">
            <div className="flex flex-col space-y-2">
              <div className="text-sm leading-5 text-gray">{rt("lb-You")}</div>

              <NumericalInput
                data-error={rateError}
                className="h-[50px] w-full rounded-xl border border-[#d8d8d8] px-4 py-[14px] focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5] data-[error=true]:!border-red"
                placeholder={`${referralBaseRate}%`}
                value={rate || ""}
                onUserInput={handleRateInput}
              />
            </div>
            <div className="mt-6 text-sm leading-5 text-gray">+</div>
            <div className="flex flex-col space-y-2">
              <div className="text-sm leading-5 text-gray">
                {rt("lb-YourFriend")}
              </div>

              <NumericalInput
                disabled={extraRate === 0}
                data-error={rateError}
                className="h-[50px] w-full rounded-xl border border-[#d8d8d8] px-4 py-[14px] focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5] data-[error=true]:!border-red"
                placeholder="1%"
                value={friendRate || ""}
                onUserInput={handleFRateInput}
              />
            </div>
            <div className="mt-6 flex items-center space-x-1 text-sm leading-5 text-gray">
              <div>=</div>
              <div>{Number(rate || 0) + Number(friendRate || 0)}%</div>
            </div>
          </div>

          {rateError && (
            <div className="mt-3 text-xs leading-3 text-red">
              {rt("txt-RateError", {
                rate: Number(referralBaseRate || 0) + Number(extraRate || 0),
              })}
            </div>
          )}

          <div className="mt-6 bg-[rgba(255,169,91,0.1)] p-4 text-sm leading-5 text-[#ffa95b]">
            <Image
              width={20}
              height={20}
              src="/icons/info-yellow.svg"
              alt="info"
              className="float-left mr-2"
            />
            <div>
              {rt("tip-ReferralDrawer", {
                num1: Number(rate || 0) + "%",
                num2: Number(friendRate || 0) + "%",
              })}
            </div>
          </div>
        </div>

        <WithWalletConnectBtn className="w-full" onClick={handleSaveRate}>
          <button
            // disabled={isCreateLoading}
            className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white"
          >
            {rt("btn-Save")}
          </button>
        </WithWalletConnectBtn>
      </div>
    </Drawer>
  );
}
