import { IRangeType } from "@/app/marketplace/leader-range-select";
import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useMakerOrders(period: IRangeType) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    `${apiEndPoint}${Paths.makerOrders}?period=${period}`,
    fetcher,
  );

  return res;
}
