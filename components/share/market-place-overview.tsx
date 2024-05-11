import Image from "next/image";
import { IMarketplace } from "@/lib/types/marketplace";
import { formatNum } from "@/lib/utils/number";
import { Skeleton } from "../ui/skeleton";

export default function MarketplaceOverview({
  marketplace,
  isLoading = false,
}: {
  marketplace: IMarketplace | undefined;
  isLoading?: boolean;
}) {
  const isLoadingFlag = !marketplace || isLoading;

  return (
    <div className="mt-3 flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>Floor Price</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              {formatNum(marketplace!.floor_price, 6)}
              <Image src="/icons/eth.svg" width={18} height={18} alt="token" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>Total Vol.</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="flex items-center text-sm leading-5 text-black">
              {formatNum(marketplace!.total_vol)}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <LabelText isLoading={isLoadingFlag}>24h Change</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div
              data-up={Number(marketplace!.change_rate_24h) > 0}
              className="text-sm leading-5 data-[up=true]:text-green data-[up=false]:text-red"
            >
              {marketplace!.change_rate_24h}%
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>24h Vol.</LabelText>
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
          <LabelText isLoading={isLoadingFlag}>Listed Supply</LabelText>
          {isLoadingFlag ? (
            <ValueSkeleton />
          ) : (
            <div className="leading-6 text-black">
              {formatNum(marketplace!.listed_supply)}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <LabelText isLoading={isLoadingFlag}>Avg. Bid</LabelText>
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
