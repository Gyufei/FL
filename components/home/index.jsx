import HomeCarousel from "./home-carousel";
import TotalBanner from "./total-banner";
import OrderList from "./order-list";
import Faqs from "./faqs";
import LatestNews from "./latest-news";
import SubscribeInput from "./subscribe-input";
import HomeLinks from "./home-links";
import HomeFooter from "./home-footer";

export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <TotalBanner />
      <OrderList />
      <Faqs />
      <LatestNews />
      <SubscribeInput />
      <HomeLinks />
      <HomeFooter />
    </div>
  );
}
