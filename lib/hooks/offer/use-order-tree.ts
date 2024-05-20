import { IOffer } from "@/lib/types/order";

export function useOrderTree() {
  function getOrigin(order: IOffer, defaultValue: string) {
    if (order.preOrderDetail) {
      return getOrigin(order.preOrderDetail, order.pre_order);
    } else {
      return defaultValue;
    }
  }

  return {
    getOrigin,
  };
}
