import { IMarketplace } from "@/lib/types/marketplace";
import { formatNum, toPercent } from "@/lib/utils/number";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { useMemo } from "react";
import NP from "number-precision";

export default function MarketplaceOverview({
  marketplace,
  isLoading = false,
}: {
  marketplace: IMarketplace | undefined;
  isLoading?: boolean;
}) {
  const t = useTranslations("card-Marketplace");
  const isLoadingFlag = !marketplace || isLoading;

  const pointDecimalNum = useMemo(() => {
    if (marketplace && ProjectDecimalsMap[marketplace.market_symbol]) {
      const decimal = ProjectDecimalsMap[marketplace.market_symbol];
      return 10 ** decimal;
    }

    return 1;
  }, [marketplace]);

  const change_24h = useMemo(() => {
    if (marketplace && marketplace.vol_24h && marketplace.total_vol) {
      return NP.divide(marketplace.vol_24h, marketplace.total_vol);
    }
    return 0;
  }, [marketplace]);

  return (
    <div className="mt-3 flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>
            {t("lb-InitialListing")}
          </LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              $
              {Number(
                NP.times(marketplace.initial_listing_price, pointDecimalNum),
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>{t("lb-AllTimeHigh")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              $
              {Number(
                NP.times(marketplace.all_time_high_price, pointDecimalNum),
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>{t("lb-24hChange")}</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div
              data-up={
                NP.divide(marketplace.vol_24h, marketplace.total_vol) === 0
                  ? "zero"
                  : NP.divide(marketplace.vol_24h, marketplace.total_vol) > 0
              }
              className="text-sm leading-5 data-[up=false]:text-red data-[up=true]:text-green data-[up=zero]:text-black"
            >
              {change_24h === 0 ? null : change_24h > 0 ? "+ " : "- "}
              {change_24h === 0 ? 0 : toPercent(change_24h * 100)}%
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>
            {t("lb-FilledOrders")}
          </LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              {formatNum(marketplace!.filled_orders || 0)}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>
            {t("lb-ListedSupply")}
          </LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="leading-6 text-black">
              {formatNum(
                NP.divide(marketplace!.listed_supply, pointDecimalNum),
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>
            {t("lb-ActiveWallets")}
          </LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center leading-6 text-black">
              {formatNum(marketplace!.active_wallets)}
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
