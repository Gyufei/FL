import { useTranslations } from "next-intl";

export default function Referral() {
  const rt = useTranslations("Referral");

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="text-xl leading-[30px] text-black">
            {rt("ReferralSystem")}
          </div>
        </div>
      </div>
      <div className="relative mt-5 flex flex-1 flex-col justify-end border-t border-[#eee]"></div>
    </div>
  );
}
