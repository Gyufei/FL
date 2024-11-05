"use client";
import { useMyHoldings } from "@/lib/hooks/api/use-my-holdings";
import { SortSelect } from "@/components/share/sort-select";
import OfferAboutMineDetailDrawer from "../common/offer-about-mine-detail-drawer";
import HoldingCard from "./holding-card";
import OtherHoldingCard from "./other-holding-card";
import { useSortHolding } from "@/lib/hooks/holding/use-sort-holding";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { NetworkSelect } from "@/components/share/network-select";

export default function MyHoldings() {
  const T = useTranslations("page-MyStocks");
  const [selectedChain, setSelectedChain] = useState<ChainType>(ChainType.ETH);

  const { data: holdings, mutate: refreshHoldings } = useMyHoldings({
    chain: selectedChain,
  });

  const [selectHId, setSelectHId] = useState("");

  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOffers,
  } = useSortHolding(holdings || []);
  console.log("🚀 ~ MyHoldings ~ sortOffers:", sortOffers);

  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleOpenHoldingDrawer(hId: string) {
    setSelectHId(hId);
    setDrawerOpen(true);
  }

  function handleChainChange(chain: ChainType) {
    setSelectedChain(chain);
  }

  const selectedHolding = holdings?.find((h) => h.holding_id === selectHId);

  return (
    <div className="ml-5 flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="text-xl leading-[30px] text-black">
          {T("cap-MyStocks")}
        </div>
        <div className="flex items-center justify-end space-x-6">
          <NetworkSelect
            selectedChain={selectedChain}
            handleChainChange={handleChainChange}
          />
          <SortSelect
            sortField={sortField}
            sortDir={sortDir}
            handleSortFieldChange={handleSortFieldChange}
            handleSortDirChange={handleSortDirChange}
          />
        </div>
      </div>

      <OfferAboutMineDetailDrawer
        holdingId={selectHId}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        offer={selectedHolding?.offer}
        onSuccess={refreshHoldings}
      />

      {sortOffers.length ? (
        <div className="no-scroll-bar mt-5 grid max-h-[calc(100vh-248px)] flex-1 auto-rows-min grid-cols-1 gap-5 overflow-y-auto border-t border-[#eee] pt-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {(sortOffers || []).map((holding) => {
            if (!holding.offer) {
              return (
                <OtherHoldingCard key={holding.holding_id} holding={holding} />
              );
            }
            return (
              <HoldingCard
                key={holding.holding_id}
                holding={holding}
                openHoldingDrawer={(hId: string) =>
                  handleOpenHoldingDrawer(hId)
                }
                onSuccess={refreshHoldings}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-base text-gray">
          {T("txt-YourStockAppearHere")}
        </div>
      )}
    </div>
  );
}
