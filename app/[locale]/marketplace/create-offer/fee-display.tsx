import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { useTranslations } from "next-intl";

export default function FeeDisplay() {
  const cot = useTranslations("CreateOffer");
  const { platformFee, minAmount } = useGlobalConfig();

  return (
    <div className="mt-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm leading-5 text-gray">
          {cot("MinimumOrderAmount")}
        </div>
        <div className="text-sm leading-5 text-black">${minAmount}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm leading-5 text-gray">
          {cot("PlatformTradingFee")}
        </div>
        <div className="text-sm leading-5 text-black">{platformFee * 100}%</div>
      </div>
    </div>
  );
}
