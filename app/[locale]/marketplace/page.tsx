"use client";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import PageFooter from "../_page-layout/_page-footer";
import PointMarket from "./point-market";
import MockMarket from "./mock-market";
import TrendingAsset from "./trending-asset";
// import { redirect } from "@/app/navigation";

export default function Marketplace({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { data: marketplaceData } = useMarketplaces();

  if (marketplaceData) {
    const query = searchParams?.s;
    const path =
      `/marketplace/${marketplaceData[0].market_id}` +
      (query ? `?s=${query}` : "");

    console.log(path);
    // redirect(path);
  }

  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="flex flex-1 flex-col pl-6">
          <PointMarket />
          <MockMarket className="mt-6" />
        </div>
        <div className="flex w-[368px] flex-col px-6">
          <TrendingAsset />
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
