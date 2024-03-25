"use client";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useRouter } from "next/navigation";

export default function Marketplace() {
  const router = useRouter();

  const { data: marketplaceData } = useMarketplaces();

  if (marketplaceData) {
    router.push(`/marketplace/${marketplaceData[0].market_place_name}`);
  }

  return null;
}
