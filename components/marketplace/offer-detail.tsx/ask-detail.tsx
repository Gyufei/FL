import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";

export default function AskDetail({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  const [sliderMax] = useState(100);
  const [sliderValue, setSliderValue] = useState(80);

  return (
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
          topText={<>You pay</>}
          bottomText={<>~${formatNum(offerDetail.offerValue)} </>}
          value={offerDetail.offer}
          tokenLogo={offerDetail.stableToken.logoURI}
          sliderMax={sliderMax}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        />

        <ReceiveCard
          topText={<>You will receive</>}
          bottomText={<>1 Diamond = ${offerDetail.pointPrice}</>}
          value={offerDetail.for}
          tokenLogo={offerDetail.token.logoURI}
        />

        {offerDetail.filled ? (
          <>
            <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black">
              Offer 100% Filled
            </button>
            <div className="mt-3 rounded-2xl bg-[#FBF2EA] px-4 py-3 leading-5 text-[#FFA95B]">
              You have the option to close the offer before it is 100% filled.
            </div>
          </>
        ) : (
          <>
            <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white">
              Confirm Maker Order
            </button>
            <div className="mt-3 text-xs leading-5 text-gray">
              You will automatically receive the{" "}
              <span className="text-black">
                equivalent amount of the protocol&apos;s tokens
              </span>{" "}
              once the Origin Offer Creator settle the offer.
            </div>
          </>
        )}
      </div>

      {/* right card */}
      <DetailCard offerDetail={offerDetail} />
    </div>
  );
}
