import { useAllOrders } from "./use-all-orders";
import { useMemo } from "react";

export function useMarketplaceOrders({
  marketplaceId,
}: {
  marketplaceId: string;
}) {
  const allOrdersRes = useAllOrders();

  const marketplaceOrders = useMemo(
    () => {

      const marketOrders = (allOrdersRes.data || [])?.filter(
        (order) => order.marketplace.market_id === marketplaceId,
      );

      const canBuyOrders = marketOrders?.filter(
        (order) => ['virgin', 'ongoing'].includes(order.maker_status)
      )

      return canBuyOrders;
    },
    [allOrdersRes.data, marketplaceId],
  );

  return {
    ...allOrdersRes,
    data: marketplaceOrders,
  };
}
