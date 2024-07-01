import { useMemo } from "react";
import { useMarketplaces } from "./use-marketplaces";
import { IPoint } from "@/lib/types/token";
import useTge from "../marketplace/useTge";

export function useMarketPoints() {
  const marketRes = useMarketplaces();
  const { checkIsAfterTge } = useTge();

  const points = useMemo(() => {
    if (!marketRes.data) {
      return undefined;
    }

    const pts: Array<IPoint> = marketRes.data
    .filter((m) => m.status !== "offline")
    .filter(
      m => !checkIsAfterTge(m.tge, Number(m.settlement_period))
    )
    .map((market) => (
      {
        logoURI: market.pointLogo,
        symbol: market.point_name,
        marketplaceId: market.market_place_id,
        marketName: market.market_name
      }
    ))

    return pts;
  }, [marketRes.data])
  
  return {
    ...marketRes,
    data: points
  }
}
