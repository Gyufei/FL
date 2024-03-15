import KLineChart from "@/components/marketplace/k-line-chart";
import MarketTrades from "@/components/marketplace/market-trades";
import PageFooter from "@/components/share/page-footer";
import OfferList from "@/components/marketplace/offer-list";
import OverviewCard from "@/components/marketplace/overview-card";

export default function Marketplace() {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
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
      <PageFooter />
    </div>
  );
}
