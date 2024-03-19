import { useAllOrders } from "./use-all-orders";
import { useMemo } from "react";

export function useMarketplaceOrders({
  marketplaceId,
}: {
  marketplaceId: string;
}) {
  const allOrdersRes = useAllOrders();

  const marketplaceOrders = useMemo(
    () =>
      (allOrdersRes.data || [])?.filter(
        (order) => order.marketplace.market_place_id === marketplaceId,
      ),
    [allOrdersRes.data, marketplaceId],
  );

  return {
    ...allOrdersRes,
    data: marketplaceOrders,
  };
}
