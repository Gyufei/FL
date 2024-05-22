"use client";
import { useMyStocks } from "@/lib/hooks/api/use-my-stocks";
import { SortSelect } from "../../../components/share/sort-select";
import DetailDrawer from "../common/detail-drawer/detail-drawer";
import StockCard from "./stock-card";
import { useSortOrder } from "@/lib/hooks/offer/use-sort-offer";

export default function MyStocks() {
  const { data: stocks, mutate: refreshOrders } = useMyStocks();

  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOrders,
  } = useSortOrder((stocks as any[]) || []);

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

      <DetailDrawer
        orders={(stocks as any[]) || []}
        onSuccess={refreshOrders}
      />

      <div className="no-scroll-bar mt-5 grid max-h-[calc(100vh-248px)] flex-1 auto-rows-min grid-cols-1 gap-5 overflow-y-auto border-t border-[#eee] pt-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {(sortOrders || []).map((order) => (
          <StockCard
            key={order.stock_id}
            order={order}
            onSuccess={refreshOrders}
          />
        ))}
      </div>
    </div>
  );
}
