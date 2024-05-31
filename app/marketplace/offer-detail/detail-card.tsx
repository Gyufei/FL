import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { WithTip } from "../create-offer/with-tip";
import { truncateAddr } from "@/lib/utils/web3";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";
import { useMemo } from "react";

export default function DetailCard({ offer }: { offer: IOffer }) {
  const { handleGoScan } = useGoScan();

  const { amount, orderTokenInfo, orderPointInfo, makerDetail } =
    useOfferFormat({
      offer,
    });

  const totalColl = useMemo(() => {
    if (Number(offer.settle_breach_fee) <= 100) {
      return amount;
    } else {
      return NP.times(amount, Number(offer.settle_breach_fee) / 10 ** 4);
    }

    return amount;
  }, [amount, offer.settle_breach_fee]);

  const orderType = offer.offer_type;

  const originOffer = useMemo(() => {
    return (offer as any).origin_offer_detail;
  }, [offer]);

  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">Offer Details</div>

      <DetailRow>
        <DetailLabel tipText="">
          {orderType === "ask" ? "Selling" : "Buying"} Amount
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(offer.points)} pts
          </div>
          <Image
            src={orderPointInfo.logoURI}
            width={16}
            height={16}
            alt="stable token"
            className="rounded-full"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">
          {orderType === "ask" ? "Seller" : "Buyer"}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {truncateAddr(offer?.authority || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() => handleGoScan(offer?.authority || "")}
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">
          {orderType === "ask"
            ? "Base Tax for Each Trade"
            : "Tax for Sub Trades"}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            {NP.divide(makerDetail?.each_trade_tax || 0, 100)}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Collateral Rate</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">
            {NP.divide(offer.settle_breach_fee, 100)}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">
          {orderType === "ask" ? "Total collateral" : "Total Deposit"}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(totalColl)}
          </div>
          <Image
            src={orderTokenInfo.logoURI}
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
        <DetailLabel tipText="">Origin Offer Maker</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{originOffer?.offer_id}
          </div>
          <div className="text-sm leading-5 text-black">
            {truncateAddr(originOffer?.offer_account || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() => handleGoScan(originOffer?.maker_account)}
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
            $
            {NP.divide(
              offer?.trade_tax || 0,
              Math.pow(10, orderTokenInfo.decimals),
            )}
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
