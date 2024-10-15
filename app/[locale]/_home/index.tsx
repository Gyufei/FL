import HomeBanner from "./home-banner";
import MakeMoney from "./make-money";
import MarketPlace from "./trending-projects";
import Faqs from "./faqs";
import OutPerforms from "./outperforms";
import GetStart from "./get-start";
import ContactUs from "./contact-us";

export default function Home() {
  return (
    <div className="mx-0">
      <HomeBanner />
      <MakeMoney />
      <OutPerforms />
      <GetStart />
      <MarketPlace />
      <Faqs />
      <ContactUs />
    </div>
  );
}
