"use client";
import { useMyStocks } from "@/lib/hooks/api/use-my-stocks";
import { SortSelect } from "../../../components/share/sort-select";
import DetailDrawer from "../common/detail-drawer/detail-drawer";
import StockCard from "./stock-card";
import { useSortOffer } from "@/lib/hooks/offer/use-sort-offer";
import { useMemo } from "react";
import { uniqBy } from "lodash";

export default function MyStocks() {
  const { data: stocks, mutate: refreshOrders } = useMyStocks();

  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOrders,
  } = useSortOffer((stocks as any[]) || []);

  const offers = useMemo(() => {
    const offs = [];

    for (const s of stocks || []) {
      if (s.pre_offer_detail) offs.push(s.pre_offer_detail);
      if (s.offer_detail) offs.push(s.offer_detail);
    }

    return uniqBy(offs, "offer_id");
  }, [stocks]);

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

      <DetailDrawer orders={offers || []} onSuccess={refreshOrders} />

      <div className="no-scroll-bar mt-5 grid max-h-[calc(100vh-248px)] flex-1 auto-rows-min grid-cols-1 gap-5 overflow-y-auto border-t border-[#eee] pt-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {(sortOrders || []).map((order) => (
          <StockCard
            key={order.stock_id}
            stock={order}
            onSuccess={refreshOrders}
          />
        ))}
      </div>
    </div>
  );
}
