"use client";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { redirect } from "@/app/navigation";

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

    redirect(path);
  }

  return null;
}
