import { formatNum } from "@/lib/utils/number";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useTranslations } from "next-intl";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { useBalanceDataOf } from "@/lib/hooks/api/use-balanceof";
import NP from "number-precision";

export default function OtherHoldingCard({ holding }: { holding: any }) {
  console.log("🚀 ~ holding:", holding);
  const ct = useTranslations("page-MyStocks");
  const { data: balanceData } = useBalanceDataOf();
  console.log("🚀 ~ OtherHoldingCard ~ balanceData:", balanceData);

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex cursor-pointer items-center space-x-3">
          <TokenPairImg
            src1={holding.marketplace?.projectLogo}
            src2={ChainConfigs[holding.marketplace.chain].logo}
            width1={48}
            height1={48}
            width2={8.8}
            height2={8.8}
          />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {holding.marketplace.item_name}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between ">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("txt-Free")}
          </div>
          <div className="flex items-center leading-6 text-black">
            {balanceData
              ? formatNum(NP.divide(balanceData as any, 10 ** 18), 2, false)
              : 0}
          </div>
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("txt-Locked")}
          </div>
          <div className="flex items-center leading-6 text-black">0</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4"></div>
    </div>
  );
}
