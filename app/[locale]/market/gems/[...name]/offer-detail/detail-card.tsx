import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { WithTip } from "../../../../../../components/share/with-tip";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { formatTimestamp } from "@/lib/utils/time";
import { useEntryById } from "@/lib/hooks/api/use-entry-by-id";
import { checkIsNeedCollateral } from "@/lib/helper/market";
import { format } from "date-fns";

export default function DetailCard({ offer }: { offer: IOffer }) {
  const T = useTranslations("drawer-OfferDetail");

  const { amount, offerTokenInfo, offerPointInfo, pointDecimalNum } =
    useOfferFormat({
      offer,
    });

  const { data: entryInfo } = useEntryById(offer.entry.id);

  const totalColl = useMemo(() => {
    if (Number(offer.collateral_ratio) <= 100) {
      return amount;
    } else {
      return NP.times(amount, Number(offer.collateral_ratio) / 10 ** 4);
    }

    return amount;
  }, [amount, offer.collateral_ratio]);

  const offerType = offer.entry.direction;
  const isNeedCollateral = checkIsNeedCollateral(
    offer.marketplace.market_catagory,
  );

  const tgeTime = useMemo(() => {
    const tge = Number(offer?.marketplace?.tge) || null;

    if (!tge) return null;

    const period = Number(offer.marketplace?.settlement_period) || 0;
    return (tge + period) * 1000;
  }, [offer]);

  const originId = entryInfo?.root_entry_id || offer.entry.id;
  const originMaker = entryInfo?.original_creator || offer.offer_maker;

  return (
    <div className="flex-1 px-0 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="leading-6 text-black font-medium">{T("cap-OfferDetail")}</div>
      </div>
      <DetailRow>
        <DetailLabel
          tipText={
            offerType === "sell" ? T("tip-SellerAmount") : T("tip-BuyerAmount")
          }
        >
          {offerType === "sell" ? T("lb-SellerAmount") : T("lb-BuyerAmount")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(NP.divide(offer.item_amount, pointDecimalNum))}
          </div>
          <Image
            src={offerPointInfo.logoURI}
            width={16}
            height={16}
            alt="stable token"
            className="rounded-full"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel
          tipText={offerType === "sell" ? T("tip-Seller") : T("tip-Buyer")}
        >
          {offerType === "sell" ? T("lb-Seller") : T("lb-Buyer")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {truncateAddr(offer?.offer_maker || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, offer?.offer_maker || "")
            }
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText={T("tip-BonusForMaker")}>
          {T("lb-BonusForMaker")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            {NP.divide(offer?.trade_tax_pct || 0, 100)}%
          </div>
        </div>
      </DetailRow>
      {offer?.marketplace?.trading_ends_at !== "0" && (
        <DetailRow>
          <DetailLabel tipText={""}>{T("lb-TradingEndsAt")}</DetailLabel>
          <div className="flex items-center space-x-1">
            <div className="text-sm leading-5 text-green">
              <div className="text-sm leading-5 text-black">
                {format(
                  Number(offer?.marketplace?.trading_ends_at) * 1000,
                  "dd/MM/yyyy",
                )}
              </div>
              <div className="text-[10px] leading-4 text-gray">
                {format(
                  Number(offer?.marketplace?.trading_ends_at) * 1000,
                  "HH:mm a",
                )}
              </div>
            </div>
          </div>
        </DetailRow>
      )}

      {isNeedCollateral ? (
        <>
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
                offerType === "sell"
                  ? T("tip-TotalCollateral")
                  : T("tip-TotalDeposit")
              }
            >
              {offerType === "sell"
                ? T("lb-TotalCollateral")
                : T("lb-TotalDeposit")}
            </DetailLabel>
            <div className="flex items-center space-x-1">
              <div className="text-sm leading-5 text-black">
                {formatNum(totalColl)}
              </div>
              <Image
                src={offerTokenInfo?.logoURI || "/icons/empty.png"}
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
        </>
      ) : (
        <>
          {/* TODO: trending ends at */}
          {false && (
            <DetailRow showBottomLine={offerType === "sell"}>
              <DetailLabel tipText={T("tip-TrendingEndsAt")}>
                {T("lb-TrendingEndsAt")}
              </DetailLabel>
              <div className="flex items-center space-x-1">
                <div className="text-sm leading-5">--</div>
              </div>
            </DetailRow>
          )}
        </>
      )}

      {offerType === "sell" && (
        <>
          <DetailRow showBottomLine={Number(offer.trade_tax_accum) > 0}>
            <DetailLabel tipText={T("tip-InitialOfferMaker")}>
              {T("lb-InitialOfferMaker")}
            </DetailLabel>
            <div className="flex items-center space-x-1">
              <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
                {originId ? `#${originId}` : ""}
              </div>
              <div className="text-sm leading-5 text-black">
                {truncateAddr(originMaker || "", {
                  nPrefix: 4,
                  nSuffix: 4,
                })}
              </div>
              <Image
                onClick={() =>
                  handleGoScan(offer.marketplace.chain, String(originMaker))
                }
                src="/icons/right-45.svg"
                width={16}
                height={16}
                alt="goScan"
                className="cursor-pointer"
              />
            </div>
          </DetailRow>

          {Number(offer.trade_tax_accum) > 0 && (
            <DetailRow showBottomLine={false}>
              <DetailLabel tipText={T("tip-InitialOfferMakerBonus")}>
                {T("lb-InitialOfferMakerBonus")}
              </DetailLabel>
              <div className="flex items-center space-x-1">
                <div className="text-sm leading-5 text-green">
                  $
                  {NP.divide(
                    offer?.trade_tax_accum || 0,
                    Math.pow(10, offerTokenInfo?.decimals || 0),
                  )}
                </div>
              </div>
            </DetailRow>
          )}
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
      {tipText && <WithTip>{tipText}</WithTip>}
    </div>
  );
}
