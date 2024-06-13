"use client";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Marketplace() {
  const locale = useLocale();
  const router = useRouter();

  const { data: marketplaceData } = useMarketplaces();

  if (marketplaceData) {
    router.push(`${locale}/marketplace/${marketplaceData[0].market_id}`);
  }

  return null;
}
