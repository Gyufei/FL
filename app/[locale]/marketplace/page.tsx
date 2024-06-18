"use client";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { redirect } from "@/app/navigation";

export default function Marketplace() {
  const { data: marketplaceData } = useMarketplaces();

  if (marketplaceData) {
    redirect(`/marketplace/${marketplaceData[0].market_id}`);
  }

  return null;
}
