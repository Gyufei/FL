import { IRangeType } from "@/app/[locale]/marketplace/leader-board/leader-range-select";
import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useTaxIncome(period: IRangeType) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    `${apiEndPoint}${Paths.taxIncome}?period=${period}`,
    fetcher,
  );

  return res;
}
