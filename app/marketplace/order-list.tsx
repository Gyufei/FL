"use client";

import { useMemo, useState } from "react";
import {
  IOrderType,
  OrderTypeSelect,
} from "../../components/share/order-type-select";
import { SortSelect } from "../../components/share/sort-select";
import SearchInput from "./search-input";
import { OrderCard } from "./order-card";
import { useMarketplaceOrders } from "@/lib/hooks/api/use-marketplace-orders";
import { IMarketplace } from "@/lib/types/marketplace";
import HoverIcon from "@/components/share/hover-icon";
import { IOrder } from "@/lib/types/order";
import { useSortOrder } from "@/lib/hooks/order/use-sort-order";

export default function OrderList({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  const { data: orders } = useMarketplaceOrders({
    marketplaceId: marketplace.market_place_id,
  });

  const [orderType, setOrderType] = useState<IOrderType>("ask");
  const [searchText, setSearchText] = useState("");

  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOrders,
  } = useSortOrder(orders);

  const filterOrders = useMemo(() => {
    const typeOrders = (sortOrders || [])?.filter(
      (o: IOrder) => o.order_type === orderType,
    );
    if (!searchText) {
      return typeOrders;
    }

    return typeOrders?.filter((o: IOrder) => {
      const isIdMatch = o.order_id
        .toLocaleUpperCase()
        .includes(searchText.toLocaleUpperCase());

      return isIdMatch;
    });
  }, [sortOrders, orderType, searchText]);

  const [layout, setLayout] = useState<"grid" | "list">("grid");

  function handleTypeChange(t: IOrderType) {
    setOrderType(t);
  }

  function handleSearch(text: string) {
    setSearchText(text);
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-[#fafafa] p-5">
      <div className="flex items-center justify-between border-b border-[#d8d8d8] pb-5">
        <div className="flex items-center space-x-4">
          <OrderTypeSelect
            type={orderType}
            handleTypeChange={handleTypeChange}
          />
          <SortSelect
            sortField={sortField}
            sortDir={sortDir}
            handleSortFieldChange={handleSortFieldChange}
            handleSortDirChange={handleSortDirChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <SearchInput handleSearch={handleSearch} />
          <div
            data-active={layout === "list"}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full data-[active=true]:bg-white"
          >
            <HoverIcon
              src="/icons/menu-gray.svg"
              hoverSrc="/icons/menu.svg"
              active={layout === "list"}
              width={20}
              height={20}
              onClick={() => setLayout("list")}
              alt="menu"
            />
          </div>
          <div
            data-active={layout === "grid"}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full data-[active=true]:bg-white"
          >
            <HoverIcon
              src="/icons/grid-gray.svg"
              hoverSrc="/icons/grid.svg"
              active={layout === "grid"}
              width={20}
              height={20}
              onClick={() => setLayout("grid")}
              alt="menu"
            />
          </div>
        </div>
      </div>

      <div className="no-scroll-bar mt-5 grid flex-1 auto-rows-min grid-cols-1 gap-5 overflow-y-auto xl:grid-cols-2">
        {(filterOrders || []).map((order) => (
          <OrderCard
            order={order}
            marketplace={marketplace}
            key={order.order_id}
          />
        ))}
      </div>
    </div>
  );
}
