"use client";
import NP from "number-precision";
import { useMemo, useState } from "react";
import {
  ISortDir,
  ISortField,
  SortSelect,
} from "../../../components/share/sort-select";
import StockCard from "./stock-card";
import { useMyOrders } from "@/lib/hooks/api/use-my-orders";
import { sortBy } from "lodash";
import { IOrder } from "@/lib/types/order";

export default function MyStocks() {
  const { data: orders } = useMyOrders();

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
  console.log(sortOrders);

  return (
    <div className="ml-5 flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="text-xl leading-[30px] text-black">My Stocks</div>
        <SortSelect
          sortField={sortField}
          sortDir={sortDir}
          handleSortFieldChange={handleSortFieldChange}
          handleSortDirChange={handleSortDirChange}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 border-t border-[#eee] pt-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {(sortOrders || []).map((order) => (
          <StockCard key={order.order_id} order={order} />
        ))}
      </div>
    </div>
  );
}
