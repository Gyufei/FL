"use client";

import { useMemo, useState } from "react";
import {
  IOrderType,
  OrderTypeSelect,
} from "../../components/share/order-type-select";
import {
  ISortDir,
  ISortField,
  SortSelect,
} from "../../components/share/sort-select";
import SearchInput from "./search-input";
import { OrderCard } from "./order-card";
import { useMarketplaceOrders } from "@/lib/hooks/api/use-marketplace-orders";
import { IMarketplace } from "@/lib/types/marketplace";
import HoverIcon from "@/components/share/hover-icon";

export default function OrderList({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  const { data: orders } = useMarketplaceOrders({
    marketplaceId: marketplace.market_place_id,
  });

  const [orderType, setOrderType] = useState<IOrderType>("ask");

  const filterOrders = useMemo(() => {
    return (orders || [])?.filter((o) => o.order_type === orderType);
  }, [orders, orderType]);

  const [sortField, setSortField] = useState<ISortField>("Collateral");
  const [sortDir, setSortDir] = useState<ISortDir>("Descending");

  const [layout, setLayout] = useState<"grid" | "list">("grid");

  function handleTypeChange(t: IOrderType) {
    setOrderType(t);
  }

  function handleSortFieldChange(field: ISortField) {
    setSortField(field);
  }

  function handleSortDirChange(dir: ISortDir) {
    setSortDir(dir);
  }

  function handleSearch(text: string) {
    console.log(text);
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-[#fafafa] p-5">
      <div className="flex items-center justify-between border-b border-[#d8d8d8] py-5">
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

      <div className="no-scroll-bar mt-5 grid flex-1 auto-rows-min grid-cols-2 gap-5 overflow-y-auto">
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
