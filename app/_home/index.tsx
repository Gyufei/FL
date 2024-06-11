import HomeBanner from "./home-banner";
import MakeMoney from "./make-money";
import MarketPlace from "./marketplace-list";
import Faqs from "./faqs";
import OutPerforms from "./outperforms";
// import BigPicture from "./big-picture";
import GetStart from "./get-start";
import ContactUs from "./contact-us";

export default function Home() {
  return (
    <div className="mx-0">
      <HomeBanner />
      <MakeMoney />
      <OutPerforms />
      {/* <BigPicture /> */}
      <GetStart />
      <MarketPlace />
      <Faqs />
      <ContactUs />
    </div>
  );
}
