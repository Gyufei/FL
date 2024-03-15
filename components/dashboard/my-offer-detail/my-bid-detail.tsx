import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/components/marketplace/offer-detail.tsx/offer-info";
import OfferTabs from "@/components/marketplace/offer-detail.tsx/offer-tabs";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/components/marketplace/create-offer/arrow-between";
import { WithTip } from "@/components/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";

export default function MyBidDetail({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  return (
    <>
      <div className="flex justify-between">
        {/* left card */}
        <div className="flex flex-1 flex-col rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offerDetail.avatar}
            img2={offerDetail.token.logoURI}
            name={offerDetail.name}
            no={offerDetail.no}
            progress={offerDetail.progress}
          />

          <SwapItemPanel
            className="mt-5"
            topText={<>You have to pay</>}
            bottomText={<>1 Diamond = ${offerDetail.pointPrice}</>}
            value={offerDetail.offer}
            tokenLogo={offerDetail.stableToken.logoURI}
            onValueChange={() => {}}
            isCanInput={false}
          />

          <ArrowBetween className="z-[110] -my-4 self-center" />

          <SwapItemPanel
            onValueChange={() => {}}
            isCanInput={false}
            bottomText={<>~${formatNum(offerDetail.offerValue)} </>}
            topText={
              <div className="flex items-center">
                You will receive
                <WithTip>
                  When buying Diamonds, you need to wait until the diamonds
                  convert into the protocol&apos;s tokens before you can receive
                  tokens.
                </WithTip>
              </div>
            }
            value={offerDetail.for}
            tokenLogo={offerDetail.token.logoURI}
          />

          <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
            Settle this offer
          </button>
        </div>

        {/* right card */}
        <MyDetailCard offerDetail={offerDetail} />
      </div>
      <OfferTabs />
    </>
  );
}
