import { IRangeType } from "@/app/marketplace/leader-board/leader-range-select";
import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useTradingVol(period: IRangeType) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    `${apiEndPoint}${Paths.tradingVol}?period=${period}`,
    fetcher,
  );

  return res;
}
