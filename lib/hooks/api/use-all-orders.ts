import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Paths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IOrder } from "@/lib/types/order";
import { useMarketplaces } from "./use-marketplaces";
import { SolanaZeroed } from "@/lib/constant";

export function useAllOrders() {
  const { apiEndPoint } = useEndPoint();

  const { data: marketplaceData } = useMarketplaces();

  const AllOrdersFetcher = async () => {
    const allOrders: Array<IOrder> = [];

    if (!marketplaceData) return [];

    for (const marketplace of marketplaceData) {
      const orderRes = await fetcher(
        `${apiEndPoint}${Paths.order}?market_place_id=${marketplace.market_place_id}`,
      );

      let parsedRes = orderRes.map((order: Record<string, any>) => {
        return {
          ...order,
          marketplace,
        };
      });

      parsedRes = parsedRes.map((order: Record<string, any>) => {
        const isZeroed = order.pre_order === SolanaZeroed;
        const preOrderDetail = isZeroed
          ? null
          : parsedRes.find(
              (o: Record<string, any>) => o.order === order.pre_order,
            ) || null;

        return {
          ...order,
          pre_order: isZeroed ? "" : order.pre_order,
          preOrderDetail,
        };
      });

      allOrders.push(...parsedRes);
    }

    return allOrders as Array<IOrder>;
  };

  const res = useSWR(
    () => marketplaceData?.map((m) => m.market_place_id),
    AllOrdersFetcher,
  );

  return {
    ...res,
  };
}
