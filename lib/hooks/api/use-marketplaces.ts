import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";

export function useMarketplaces() {
  const { apiEndPoint } = useEndPoint();

  const MarketplacesFetcher = async () => {
    const res = await fetcher(`${apiEndPoint}${Paths.marketPlace}?market_type=point`);
    return res as Array<IMarketplace>;
  };

  const res = useSWR("marketplaces", MarketplacesFetcher);

  return res;
}
