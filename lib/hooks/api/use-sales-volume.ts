import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import fetcher from "@/lib/fetcher";
import { convertUTCToLocalStamp } from "@/lib/utils/time";
import { useMemo } from "react";

interface ISalesVolume {
  create_at: number;
  sales_price: string;
  sales_volume: string;
}

export function useSalesVolume(marketId: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    marketId ? `${apiEndPoint}${Paths.sales_volume_history}?market_id=${marketId}` : null,
    fetcher,
  );

  const data = useMemo<Array<ISalesVolume> | undefined>(() => {
    if (!res.data) return res.data;

    return res.data.map((item: Record<string, any>) => {
      return {
        ...item,
        create_at: convertUTCToLocalStamp(item.create_at),
      } as ISalesVolume;
    });
  }, [res.data])

  return {
    ...res,
    data
  }
}
