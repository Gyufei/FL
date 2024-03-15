import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { WithTip } from "../create-offer/with-tip";
import { truncateAddr } from "@/lib/utils/web3";

export default function DetailCard({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">Offer Details</div>

      <DetailRow>
        <DetailLabel tipText="">
          {offerDetail.type === "sell" ? "Selling" : "Buying"} Amount
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(offerDetail.offerValue)} pts
          </div>
          <Image
            src={offerDetail.stableToken.logoURI}
            width={16}
            height={16}
            alt="stable token"
            className="rounded-full"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Total collateral</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(offerDetail.offerValue)}
          </div>
          <Image
            src={offerDetail.stableToken.logoURI}
            width={16}
            height={16}
            alt="stable token"
            className="rounded-full"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Eq. Tokens</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">TBA</div>
          <Image
            src={offerDetail.token.logoURI}
            width={16}
            height={16}
            alt="stable token"
            className="rounded-full"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Est. Settling On</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-gray">Not Started</div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Settlement Breach Fee</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">3%</div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Base Tax for Each Trade</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">0%</div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Inherit From</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{offerDetail.no}
          </div>
          <div className="text-sm leading-5 text-black">
            {truncateAddr(offerDetail.seller, { nPrefix: 4, nSuffix: 4 })}
          </div>
          <Image
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Origin Offer Maker</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{offerDetail.no}
          </div>
          <div className="text-sm leading-5 text-black">
            {truncateAddr(offerDetail.buyer, { nPrefix: 4, nSuffix: 4 })}
          </div>
          <Image
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow showBottomLine={false}>
        <DetailLabel tipText="">Origin Offer Maker Tax Income</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            ${offerDetail.offerValue}
          </div>
        </div>
      </DetailRow>
    </div>
  );
}

function DetailRow({
  showBottomLine = true,
  children,
}: {
  showBottomLine?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-1 flex items-center justify-between py-[10px]"
      style={{
        boxShadow: showBottomLine ? "inset 0px -1px 0px 0px #EEEEEE" : "none",
      }}
    >
      {children}
    </div>
  );
}

function DetailLabel({
  tipText,
  children,
}: {
  tipText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
      {children}
      <WithTip>{tipText}</WithTip>
    </div>
  );
}
