"use client";
import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplaceContent from "./marketplace-content";
import { useWsMsgs } from "@/lib/hooks/api/use-ws-msgs";
import { useEffect } from "react";

export default function Marketplace({ params }: { params: { name: string } }) {
  const marketplaceName = decodeURIComponent(params.name[0]);

  const { data: markets, mutate } = useMarketplaces();
  const { msgEvents } = useWsMsgs();

  useEffect(() => {
    console.log("msgEvents", msgEvents);
    if (msgEvents.length > 0) {
      mutate();
    }
  }, [msgEvents]);

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
