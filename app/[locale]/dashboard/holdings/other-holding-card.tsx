// import { formatNum } from "@/lib/utils/number";
// import { TokenPairImg } from "@/components/share/token-pair-img";
import { useTranslations } from "next-intl";
// import { ChainConfigs } from "@/lib/const/chain-configs";

export default function OtherHoldingCard({ holding }: { holding: any }) {
  console.log("🚀 ~ holding:", holding);
  const ct = useTranslations("page-MyStocks");

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex cursor-pointer items-center space-x-3">
          {/* <TokenPairImg
            src1={"null"}
            src2={ChainConfigs["eth"].logo}
            width1={48}
            height1={48}
            width2={8.8}
            height2={8.8}
          /> */}

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {holding.market_symbol}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{holding.entries[0].id}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("lb-Offer")}
          </div>
          <div className="flex items-center leading-6 text-black">
            {/* {formatNum(offerValue, 2, true)} */}
            00000
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4"></div>
    </div>
  );
}
