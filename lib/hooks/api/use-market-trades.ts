import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useMarketTrades(marketplaceId?: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    marketplaceId ? `${apiEndPoint}${Paths.marketTrades}?market_place_account=${marketplaceId}`: '',
    fetcher,
  );

  return res;
}
