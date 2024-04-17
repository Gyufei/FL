import NP from "number-precision";
import { ISortDir, ISortField } from "@/components/share/sort-select";
import { IOrder } from "@/lib/types/order";
import { sortBy } from "lodash";
import { useMemo, useState } from "react";

export function useSortOrder(orders: IOrder[]) {
  const [sortField, setSortField] = useState<ISortField>("Collateral");
  const [sortDir, setSortDir] = useState<ISortDir>("Descending");

  function handleSortFieldChange(field: ISortField) {
    setSortField(field);
  }

  function handleSortDirChange(dir: ISortDir) {
    setSortDir(dir);
  }

  const sortOrders = useMemo(() => {
    if (!sortField) return orders;

    let sortArr = orders;
    if (sortField === "Collateral") {
      const collateralFunc = (order: IOrder) => {
        return order.order_role === "Taker"
          ? order.taker_amount
          : order.maker_amount;
      };
      sortArr = sortBy(orders, [collateralFunc]);
    }

    if (sortField === "Price") {
      const priceFunc = (order: IOrder) => {
        const amount =
          order.order_role === "Taker"
            ? order.taker_amount
            : order.maker_amount;
        const pointPerPrice = NP.divide(amount, order.points);
        return pointPerPrice;
      };
      sortArr = sortBy(orders, [priceFunc]);
    }

    if (sortField === "Created") {
      const createdFunc = (order: IOrder) => {
        return new Date(order.create_at).getTime();
      };

      sortArr = sortBy(orders, [createdFunc]);
    }

    if (sortDir === "Descending") {
      return sortArr.reverse();
    } else {
      return sortArr;
    }
  }, [orders, sortField, sortDir]);

  return {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOrders,
  };
}
