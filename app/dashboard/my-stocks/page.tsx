"use client";
import { SortSelect } from "../../../components/share/sort-select";
import StockCard from "./stock-card";
import { useMyOrders } from "@/lib/hooks/api/use-my-orders";
import { useSortOrder } from "@/lib/hooks/order/use-sort-order";

export default function MyStocks() {
  const { data: orders } = useMyOrders();

  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOrders,
  } = useSortOrder(orders);

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

      <div className="no-scroll-bar mt-5 grid max-h-[calc(100vh-248px)] flex-1 grid-cols-1 gap-5 overflow-y-auto border-t border-[#eee] pt-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {(sortOrders || []).map((order) => (
          <StockCard key={order.order_id} order={order} />
        ))}
      </div>
    </div>
  );
}
