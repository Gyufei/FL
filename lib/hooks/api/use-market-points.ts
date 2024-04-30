import { useMemo } from "react";
import { useMarketplaces } from "./use-marketplaces";
import { IPoint } from "@/lib/types/token";

export function useMarketPoints() {
  const marketRes = useMarketplaces();

  const points = useMemo(() => {
    if (!marketRes.data) {
      return undefined;
    }

    const pts: Array<IPoint> = marketRes.data.map((market) => (
      {
        logoURI: market.pointLogo,
        symbol: market.point_name,
        marketplaceId: market.market_place_id
      }
    ))

    return pts;
  }, [marketRes.data])
  
  return {
    ...marketRes,
    data: points
  }
}
