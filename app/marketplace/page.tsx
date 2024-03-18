import Image from "next/image";
import MarketTrades from "@/app/marketplace/market-trades";
import PageFooter from "@/app/_page-layout/_page-footer";
import OfferList from "@/app/marketplace/offer-list";
import OverviewCard from "@/app/marketplace/overview-card";
import LeaderBoard from "@/app/marketplace/leader-board";

export default function Marketplace() {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full flex-col">
      <div className="flex flex-1 items-stretch">
        <div className="flex w-[368px] flex-col space-y-6 px-6">
          <OverviewCard />
          <LeaderBoard />
          <div>
            <Image src="/img/point-fi.svg" width={280} height={160} alt="fi" />
          </div>
        </div>
        <div className="max-h-[734px] flex-1 ">
          <OfferList />
        </div>
        <div className="w-[368px] px-6">
          <MarketTrades />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
