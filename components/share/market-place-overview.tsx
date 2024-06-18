import { IMarketplace } from "@/lib/types/marketplace";
import { formatNum } from "@/lib/utils/number";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";

export default function MarketplaceOverview({
  marketplace,
  isLoading = false,
}: {
  marketplace: IMarketplace | undefined;
  isLoading?: boolean;
}) {
  const t = useTranslations("Marketplace");
  const isLoadingFlag = !marketplace || isLoading;

  return (
    <div className="mt-3 flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>{t("FloorPrice")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              {formatNum(marketplace!.floor_price, 6)}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>{t("TotalVol")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              ${formatNum(marketplace!.total_vol)}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>{t("ChangeRate24h")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div
              data-up={
                Number(marketplace!.change_rate_24h) === 0
                  ? "zero"
                  : Number(marketplace!.change_rate_24h) > 0
              }
              className="text-sm leading-5 data-[up=zero]:text-black data-[up=true]:text-green data-[up=false]:text-red"
            >
              {marketplace!.change_rate_24h}%
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>{t("Vol24h")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              ${marketplace!.vol_24h}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>{t("ListedSupply")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="leading-6 text-black">
              {formatNum(marketplace!.listed_supply)}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>{t("AvgBid")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center leading-6 text-black">
              ${formatNum(marketplace!.avg_bid)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LabelText({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return isLoading ? (
    <Skeleton className="my-[3px] h-[12px] w-[80px] bg-[#fafafa]" />
  ) : (
    <div className="text-xs leading-[18px] text-gray">{children}</div>
  );
}

function ValueSkeleton() {
  return <Skeleton className="h-[16px] w-[100px] rounded-sm bg-[#fafafa]" />;
}
