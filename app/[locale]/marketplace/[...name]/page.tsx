"use client";
import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplaceContent from "./marketplace-content";

export default function Marketplace({ params }: { params: { name: string } }) {
  const marketplaceName = decodeURIComponent(params.name[0]);

  const { data: markets } = useMarketplaces();

  const marketplace = markets?.find(
    (marketplace) => marketplace.market_symbol === marketplaceName,
  );

  if (!markets || !marketplaceName) return null;

  if (!marketplace) {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return <MarketplaceContent marketplace={marketplace} />;
}
