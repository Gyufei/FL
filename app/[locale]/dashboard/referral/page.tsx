"use client";
import { useTranslations } from "next-intl";
import ReferralInfo from "./referral-info";
import Image from "next/image";
import { ReferralTable } from "./referral-table";
import { useReferralData } from "@/lib/hooks/api/use-referral-data";
import { useEffect } from "react";
import { useCreateReferral } from "@/lib/hooks/contract/use-create-referral";
import { ChainType } from "@/lib/types/chain";

export default function Referral() {
  const rt = useTranslations("page-Referral");

  const { data: referralData, mutate: refetch } = useReferralData(
    ChainType.ETH,
  );

  const {
    write: createAction,
    isLoading: createLoading,
    isSuccess,
  } = useCreateReferral(ChainType.ETH);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  function handleCreate() {
    if (createLoading) {
      return;
    }

    createAction(undefined);
  }

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="text-xl leading-[30px] text-black">
            {rt("cap-ReferralSystem")}
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex flex-1 flex-col justify-start border-t border-[#eee]">
        <ReferralInfo referralData={referralData || []} />
        <div className="mb-2 mt-5 flex items-center space-x-2">
          <div className="text-base leading-6 text-black">
            {rt("cap-ReferralLink")}
          </div>
          <Image
            onClick={handleCreate}
            width={20}
            height={20}
            src="/icons/circle-add.svg"
            alt="add"
            className="cursor-pointer"
          />
        </div>
        <ReferralTable referralData={referralData} refresh={refetch} />
      </div>
    </div>
  );
}
