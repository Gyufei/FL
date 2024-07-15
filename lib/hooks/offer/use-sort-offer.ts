import NP from "number-precision";
import { ISortDir, ISortField } from "@/components/share/sort-select";
import { IOffer } from "@/lib/types/offer";
import { sortBy } from "lodash";
import { useMemo, useState } from "react";

export function useSortOffer(orders: Array<any>) {
  const [sortField, setSortField] = useState<ISortField>("Created");
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
      const collateralFunc = (order: IOffer) => {
        return order.amount
      };
      sortArr = sortBy(orders, [collateralFunc]);
    }

    if (sortField === "Price") {
      const priceFunc = (order: IOffer) => {
        const amount = order.amount
        const pointPerPrice = NP.divide(amount, order.points);
        return pointPerPrice;
      };
      sortArr = sortBy(orders, [priceFunc]);
    }

    if (sortField === "Created") {
      const createdFunc = (order: IOffer) => {
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
