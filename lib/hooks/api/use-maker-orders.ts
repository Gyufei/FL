import { IRangeType } from "@/app/[locale]/marketplace/[...name]/leader-board/leader-range-select";
import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";

export function useMakerOrders(period: IRangeType) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    `${apiEndPoint}${ApiPaths.makerOrders}?period=${period}`,
    fetcher,
  );

  return res;
}
