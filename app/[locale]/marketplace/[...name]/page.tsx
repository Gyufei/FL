"use client";
import Image from "next/image";
import { useMemo } from "react";
import { useAllChainMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { redirect } from "@/app/navigation";
import MarketplaceContent from "./marketplace-content";

export default function Marketplace({ params }: { params: { name: string } }) {
  const marketplaceName = decodeURIComponent(params.name[0]);
  const { isEth } = useCurrentChain();

  const { data: allMarket, isLoading: isMarketLoading } =
    useAllChainMarketplaces();

  const marketplace = allMarket?.find(
    (marketplace) => marketplace.market_id === marketplaceName,
  );

  const isCurrentChainMarket = useMemo(() => {
    if (!marketplace) return false;
    return marketplace.chain === (isEth ? "eth" : "solana");
  }, [marketplace, isEth]);

  if (!allMarket || !marketplaceName) return null;

  if (marketplace && !isCurrentChainMarket) {
    redirect("/marketplace");
  }

  if (!marketplace) {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return (
    <MarketplaceContent
      marketplace={marketplace}
      isMarketLoading={isMarketLoading}
    />
  );
}
