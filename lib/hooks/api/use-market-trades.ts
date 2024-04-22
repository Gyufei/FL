import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useMarketTrades(marketId: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    `${apiEndPoint}${Paths.marketTrades}?market_id=${marketId}`,
    fetcher,
  );

  return res;
}
