import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OfferTabs from "./offer-tabs";

export default function BidDetail({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  const [sliderMax] = useState(100);
  const [sliderValue, setSliderValue] = useState(80);

  return (
    <>
      <div className="flex justify-between">
        {/* left card */}
        <div className="flex-1 rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offerDetail.avatar}
            img2={offerDetail.token.logoURI}
            name={offerDetail.name}
            no={offerDetail.no}
            progress={offerDetail.progress}
          />

          <SliderCard
            topText={<>You will sell</>}
            bottomText={<>1 Diamond = ${offerDetail.pointPrice}</>}
            value={offerDetail.offer}
            sliderMax={sliderMax}
            sliderValue={sliderValue}
            tokenLogo={offerDetail.token.logoURI}
            setSliderValue={setSliderValue}
          />

          <ReceiveCard
            topText={<>You will receive</>}
            bottomText={<>~${formatNum(offerDetail.offerValue)} </>}
            value={offerDetail.for}
            tokenLogo={offerDetail.stableToken.logoURI}
          />

          <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white">
            Confirm Maker Order
          </button>
        </div>

        {/* right card */}
        <DetailCard offerDetail={offerDetail} />
      </div>
      <OfferTabs />
    </>
  );
}
