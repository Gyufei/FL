"use client";
import { useState } from "react";
import {
  ISortDir,
  ISortField,
  SortSelect,
} from "../../../components/share/sort-select";
import StockCard from "./stock-card";
import { useMyOrders } from "@/lib/hooks/api/use-my-orders";

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

      <div className="mt-5 grid grid-cols-2 gap-5 border-t border-[#eee] pt-5 sm:grid-cols-3 md:grid-cols-4">
        {(orders || []).map((order) => (
          <StockCard key={order.order_id} order={order} />
        ))}
      </div>
    </div>
  );
}
