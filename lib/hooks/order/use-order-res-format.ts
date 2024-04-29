import { SolanaZeroed } from "@/lib/constant";
import { useMarketplaces } from "../api/use-marketplaces";

export function useOrderResFormat() {
  const { data: marketplaceData } = useMarketplaces();

  function orderResFieldFormat(order: Record<string, any>) {
    const marketplace = marketplaceData?.find((m) => m.market_id === order.market_id);
    const order_role = getOrderRole(order);
    const is_relist = isRelistBothTakerMaker(order);

    const order_type =
      order_role === "Maker"
        ? order.order_type
        : order.order_type === "ask"
        ? "bid"
        : "ask";

    return {
      ...order,
      is_relist,
      order_role,
      order_type,
      marketplace,
    };
  }

  function orderResPreDetailFormat(order: Record<string, any>, orders: Array<Record<string, any>>) {
    const isZeroed = order.pre_order === SolanaZeroed;
    const preOrderDetail = isZeroed
      ? null
      : orders.find(
          (o: Record<string, any>) => o.order === order.pre_order,
        ) || null;

    return {
      ...order,
      pre_order_included_zero: order.pre_order,
      pre_order: isZeroed ? "" : order.pre_order,
      preOrderDetail,
    };
  }

  return {
    orderResFieldFormat,
    orderResPreDetailFormat,
  }
}

export function isRelistBothTakerMaker(order: Record<string, any>): boolean {
  return order.maker_status !== 'unknown' && order.taker_status !== 'unknown';
}

function getOrderRole(order: Record<string, any>): "Maker" | "Taker" {
  if (order.pre_order == SolanaZeroed) {
    return "Maker";
  } else {
    if (order.maker_status !== 'unknown') {
      return "Maker";
    } else if (order.taker_status !== 'unknown') {
      return "Taker";
    } else {
      return "Maker";
    }
  }
}