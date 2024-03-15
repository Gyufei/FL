import KLineChart from "@/components/marketplace/k-line-chart";
import MarketTrades from "@/components/marketplace/market-trades";
import MarketplaceFooter from "@/components/marketplace/marketplace-footer";
import OfferList from "@/components/marketplace/offer-list";
import OverviewCard from "@/components/marketplace/overview-card";

export default function Marketplace() {
  return (
    <div className="w-full">
      <div className="flex items-stretch">
        <div className="flex w-[368px] flex-col space-y-6 px-6">
          <OverviewCard />
          <KLineChart />
        </div>
        <div className="max-h-[734px] flex-1 ">
          <OfferList />
        </div>
        <div className="w-[328px] px-6">
          <MarketTrades />
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
}
