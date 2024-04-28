import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useMarketTrades(marketplaceId: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    `${apiEndPoint}${Paths.marketTrades}?market_id=${marketplaceId}`,
    fetcher,
  );

  return res;
}
