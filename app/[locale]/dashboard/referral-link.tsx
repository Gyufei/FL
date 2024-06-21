import HoverIcon from "@/components/share/hover-icon";
// import { Input } from "@/components/ui/input";
import { useReferralData } from "@/lib/hooks/api/use-referral-data";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function ReferralLink() {
  const mot = useTranslations("MyOrders");

  const { data: referralData } = useReferralData();

  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const refLink = useMemo(() => {
    if (!referralData) return "";
    const defaultRef = referralData.find((ref) => ref.flag === "1");
    return `${window.location.origin}/?ref=${defaultRef?.referral_code}`;
  }, [referralData]);

  function handleCopy() {
    navigator.clipboard.writeText(refLink);

    setGlobalMessage({
      type: "success",
      message: "Copied to clipboard",
    });
  }

  return (
    <div className="mb-5">
      <div className="leading-[18px] text-gray">{mot("YourReferralLink")}</div>
      <div className="relative mt-2">
        {/* <Input
          placeholder="https://"
          className="h-12 border-[#d4d4d4] pl-4 pr-[52px] text-sm focus:border-[#3dd866]"
        /> */}

        <div
          placeholder="https://"
          className="flex h-12 items-center justify-between space-x-2 rounded-lg border border-[#d4d4d4] px-4 text-sm"
        >
          <div className="flex-1 truncate text-gray">{refLink}</div>

          <div className="flex items-center ">
            <HoverIcon
              src="/icons/info-gray.svg"
              hoverSrc="/icons/info.svg"
              width={20}
              height={20}
              alt="copy"
              className="mr-3"
            />
            <HoverIcon
              onClick={handleCopy}
              src="/icons/link-copy-gray.svg"
              hoverSrc="/icons/link-copy.svg"
              width={20}
              height={20}
              alt="copy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
