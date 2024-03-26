import { IOrder } from "@/lib/types/order";
import { useMarketplaceOrders } from "../api/use-marketplace-orders";
import { useMemo } from "react";

export function useOrderSubOrders({ order }: { order: IOrder }) {
  const { data: orders } = useMarketplaceOrders({
    marketplaceId: order.marketplace?.market_place_id || "",
  });

  const subOrders = useMemo(
    () => (orders || [])?.filter((o: IOrder) => o.pre_order === order.order),
    [orders, order.order],
  );

  function getOrigin(order: IOrder, defaultValue: string) {
    if (order.preOrderDetail) {
      return getOrigin(order.preOrderDetail, order.pre_order);
    } else {
      return defaultValue;
    }
  }

  return {
    subOrders,
    getOrigin,
  };
}
