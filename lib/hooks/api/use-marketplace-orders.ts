import { useAllOrders } from "./use-all-orders";
import { useMemo } from "react";

export function useMarketplaceOrders({
  marketId: marketId,
}: {
  marketId: string;
}) {
  const allOrdersRes = useAllOrders();

  const marketplaceOrders = useMemo(
    () => {

      const marketOrders = (allOrdersRes.data || [])?.filter(
        (order) => order.marketplace.market_id === marketId,
      );

      const canBuyOrders = marketOrders?.filter(
        (order) => ['virgin', 'ongoing'].includes(order.maker_status)
      )

      return canBuyOrders;
    },
    [allOrdersRes.data, marketId],
  );

  return {
    ...allOrdersRes,
    data: marketplaceOrders,
  };
}
