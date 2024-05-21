import { IOffer } from "@/lib/types/order";

export function useOfferTree() {
  function getOriginOrderAccount(order: IOffer, defaultValue: string) {
    if (order.pre_offer_detail) {
      return getOriginOrderAccount(order.pre_offer_detail, order.pre_offer_account);
    } else {
      return defaultValue;
    }
  }

  function getOriginOrder(order: IOffer) {
    if (order.pre_offer_detail) {
      return getOriginOrder(order.pre_offer_detail);
    } else {
      return order;
    }
  }

  return {
    getOriginOrderAccount,
    getOriginOrder
  };
}
