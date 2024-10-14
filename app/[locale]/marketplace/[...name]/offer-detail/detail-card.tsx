import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { WithTip } from "../create-offer/with-tip";
import { truncateAddr } from "@/lib/utils/web3";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { formatTimestamp } from "@/lib/utils/time";

export default function DetailCard({ offer }: { offer: IOffer }) {
  const T = useTranslations("drawer-OfferDetail");
  const { handleGoScan } = useGoScan();

  const { amount, orderTokenInfo, orderPointInfo, makerDetail } =
    useOfferFormat({
      offer,
    });

  const totalColl = useMemo(() => {
    if (Number(offer.collateral_ratio) <= 100) {
      return amount;
    } else {
      return NP.times(amount, Number(offer.collateral_ratio) / 10 ** 4);
    }

    return amount;
  }, [amount, offer.collateral_ratio]);

  const orderType = offer.entry.direction;

  const originOffer = useMemo(() => {
    return (offer as any).origin_offer_detail;
  }, [offer]);

  const tgeTime = useMemo(() => {
    const tge = Number(offer?.marketplace?.tge) || null;

    if (!tge) return null;

    const period = Number(offer.marketplace?.settlement_period) || 0;
    return (tge + period) * 1000;
  }, [offer]);

  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">{T("cap-OfferDetail")}</div>
      <DetailRow>
        <DetailLabel
          tipText={
            orderType === "ask" ? T("tip-SellerAmount") : T("tip-BuyerAmount")
          }
        >
          {orderType === "ask" ? T("lb-SellerAmount") : T("lb-BuyerAmount")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(offer.item_amount)} Vol
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
        <DetailLabel
          tipText={orderType === "ask" ? T("tip-Seller") : T("tip-Buyer")}
        >
          {orderType === "ask" ? T("lb-Seller") : T("lb-Buyer")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {truncateAddr(offer?.offer_maker || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() => handleGoScan(offer?.offer_maker || "")}
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel
          tipText={
            orderType === "ask"
              ? T("tip-BonusRateForEachTX")
              : T("tip-BonusForMaker")
          }
        >
          {orderType === "ask"
            ? T("lb-BonusRateForEachTX")
            : T("lb-BonusForMaker")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            {NP.divide(makerDetail?.each_trade_tax || 0, 100)}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText={T("tip-CollateralRate")}>
          {T("lb-CollateralRate")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">
            {NP.divide(offer.collateral_ratio, 100)}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel
          tipText={
            orderType === "ask"
              ? T("tip-TotalCollateral")
              : T("tip-TotalDeposit")
          }
        >
          {orderType === "ask" ? T("lb-TotalCollateral") : T("lb-TotalDeposit")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(totalColl)}
          </div>
          <Image
            src={orderTokenInfo?.logoURI || "/icons/empty.png"}
            width={16}
            height={16}
            alt="stable token"
            className="rounded-full"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText={T("tip-EstSettlingOn")}>
          {T("lb-EstSettlingOn")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          {tgeTime ? (
            formatTimestamp(tgeTime)
          ) : (
            <div className="text-sm leading-5 text-gray">
              {T("txt-NotStarted")}
            </div>
          )}
        </div>
      </DetailRow>

      {orderType === "ask" && (
        <>
          <DetailRow>
            <DetailLabel tipText={T("tip-InitialOfferMaker")}>
              {T("lb-InitialOfferMaker")}
            </DetailLabel>
            <div className="flex items-center space-x-1">
              <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
                #{originOffer?.offer_id}
              </div>
              <div className="text-sm leading-5 text-black">
                {truncateAddr(originOffer?.offer_id || "", {
                  nPrefix: 4,
                  nSuffix: 4,
                })}
              </div>
              <Image
                onClick={() => handleGoScan(originOffer?.offer_maker)}
                src="/icons/right-45.svg"
                width={16}
                height={16}
                alt="goScan"
                className="cursor-pointer"
              />
            </div>
          </DetailRow>

          <DetailRow showBottomLine={false}>
            <DetailLabel tipText={T("tip-InitialOfferMakerBonus")}>
              {T("lb-InitialOfferMakerBonus")}
            </DetailLabel>
            <div className="flex items-center space-x-1">
              <div className="text-sm leading-5 text-green">
                $
                {NP.divide(
                  offer?.trade_tax_accum || 0,
                  Math.pow(10, orderTokenInfo?.decimals || 0),
                )}
              </div>
            </div>
          </DetailRow>
        </>
      )}
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
