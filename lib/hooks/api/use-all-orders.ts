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
        `${apiEndPoint}${Paths.order}?project=${marketplace.market_place_name}`,
      );

      let parsedRes = orderRes.map((order: Record<string, any>) => {
        const order_role = getOrderRole(order);

        const order_type =
          order_role === "Maker"
            ? order.order_type
            : order.order_type === "ask"
            ? "bid"
            : "ask";

        return {
          ...order,
          order_role,
          order_type,
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

function getOrderRole(order: Record<string, any>): "Maker" | "Taker" {
  if (order.pre_order == SolanaZeroed) {
    return "Maker";
  } else {
    if (["unknown", "canceled"].includes(order.maker_status)) {
      return "Taker";
    } else {
      return "Maker";
    }
  }
}
