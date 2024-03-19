import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/marketplace/offer-detail.tsx/offer-info";
// import OrderTabs from "@/app/marketplace/offer-detail.tsx/order-tabs";
import { SwapItemPanel } from "./swap-item-panel";
import ArrowBetween from "@/app/marketplace/create-offer/arrow-between";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import MyDetailCard from "./my-detail-card";
import ConfirmAskSettleDialog from "./confirm-ask-settle-dialog";
import { useState } from "react";

export default function MyBidDetail({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

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
            topText={<>You have to sell</>}
            bottomText={<>~${formatNum(offerDetail.offerValue)} </>}
            value={offerDetail.offer}
            tokenLogo={offerDetail.token.logoURI}
            onValueChange={() => {}}
            isCanInput={false}
          />

          <ArrowBetween className="z-[110] -my-4 self-center" />

          <SwapItemPanel
            onValueChange={() => {}}
            isCanInput={false}
            bottomText={<>1 Diamond = ${offerDetail.pointPrice}</>}
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
            tokenLogo={offerDetail.stableToken.logoURI}
          />

          <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white">
            Close this offer
          </button>
        </div>

        {/* right card */}
        <MyDetailCard offerDetail={offerDetail} />
      </div>
      {/* <OrderTabs /> */}
      <ConfirmAskSettleDialog
        offerDetail={offerDetail}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
      />
    </>
  );
}
