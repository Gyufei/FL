import HomeBanner from "./home-carousel";
import TotalBanner from "./total-banner";
import MarketPlace from "./marketplace-list";
import Faqs from "./faqs";
import LatestNews from "./latest-news";
import SubscribeInput from "./subscribe-input";
import HomeLinks from "./home-links";
import HomeFooter from "./home-footer";

export default function Home() {
  return (
    <div className="mx-0">
      <HomeBanner />
      <TotalBanner />
      <MarketPlace />
      <Faqs />
      <LatestNews />
      <SubscribeInput />
      <HomeLinks />
      <HomeFooter />
    </div>
  );
}
