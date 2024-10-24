import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useMarketTrades(marketplaceId?: string) {
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();

  const res = useSWR(
    marketplaceId ? `${apiEndPoint}${DataApiPaths.marketTrades}?market_place_account=${marketplaceId}`: '',
    fetcher,
  );

  return res;
}
