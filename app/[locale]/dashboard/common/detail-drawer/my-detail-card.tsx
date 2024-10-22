import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { WithTip } from "@/components/share/with-tip";
import { formatTimeObj, formatTimestamp } from "@/lib/utils/time";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useEntryById } from "@/lib/hooks/api/use-entry-by-id";

export default function MyDetailCard({ offer }: { offer: IOffer }) {
  const ot = useTranslations("drawer-OfferDetail");

  const { address } = useChainWallet();

  const { offerTokenInfo, offerPointInfo, duringTGE } = useOfferFormat({
    offer: offer,
  });

  const { data: entryInfo } = useEntryById(offer.entry.id);

  const isAsk = offer.entry.direction === "sell";

  const originId = entryInfo?.root_entry_id || offer.entry.id;
  const originMaker = entryInfo?.original_creator || offer.offer_maker;

  const isYouAreOriginMaker = address === originMaker;

  const taxIncome = useMemo(() => {
    const ti = offer?.trade_tax_accum;

    const tax = Number(ti || 0);
    const fmtTax = NP.divide(tax, 10 ** (offerTokenInfo?.decimals || 0));

    return fmtTax;
  }, [offer, offerTokenInfo]);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!duringTGE) return;

    const interval = setInterval(() => {
      const period = Number(offer.marketplace?.settlement_period) || 0;
      const tgeTime = Number(offer?.marketplace?.tge) || 0;
      const ss = Math.floor(period - (Date.now() / 1000 - tgeTime));
      setSeconds(ss);
    }, 1000);

    return () => clearInterval(interval);
  }, [duringTGE, offer]);

  const tgeTime = useMemo(() => {
    const tge = Number(offer?.marketplace?.tge) || null;

    if (!tge) return null;

    const period = Number(offer.marketplace?.settlement_period) || 0;
    return (tge + period) * 1000;
  }, [offer]);

  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">{ot("cap-OfferDetail")}</div>

      <DetailRow>
        <DetailLabel tipText={ot("tip-Filled")}>
          {isAsk ? ot("lb-Filled/SellingAmount") : ot("lb-Filled/BuyingAmount")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(offer.taken_item_amount, 2, true)} /{" "}
            {formatNum(offer.item_amount, 2, true)} pts
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
          tipText={
            isAsk ? ot("tip-BaseTaxForEachTrade") : ot("tip-TaxForSubTrade")
          }
        >
          {isAsk ? ot("lb-BaseTaxForEachTrade") : ot("lb-TaxForSubTrade")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            {Number(offer?.trade_tax_pct || 0) / 100}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText={ot("tip-CollateralRate")}>
          {ot("lb-CollateralRate")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">
            {Number(offer.collateral_ratio) / 100}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">{ot("lb-Previous")} Maker / Taker</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            {offer.entry.id ? `#${offer.entry.id}` : ""}
          </div>
          <div className="text-sm leading-5 text-black">
            {truncateAddr(offer.offer_maker || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, offer.offer_maker || "")
            }
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      {isAsk && (
        <DetailRow>
          <DetailLabel tipText={ot("tip-EstSettlingOn")}>
            {ot("lb-EstSettlingOn")}
          </DetailLabel>
          <div className="flex items-center space-x-1">
            {tgeTime ? (
              formatTimestamp(tgeTime)
            ) : (
              <div className="text-sm leading-5 text-gray">
                {ot("txt-NotStarted")}
              </div>
            )}
          </div>
        </DetailRow>
      )}

      <DetailRow>
        <DetailLabel tipText={ot("tip-InitialOfferMaker")}>
          {ot("lb-InitialOfferMaker")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            {originId ? `#${originId}` : ""}
          </div>
          <div className="text-sm leading-5 text-red">
            {isYouAreOriginMaker
              ? ot("lb-You")
              : truncateAddr(originMaker, {
                  nPrefix: 4,
                  nSuffix: 4,
                })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, originMaker || "")
            }
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow showBottomLine={false}>
        <DetailLabel
          tipText={
            isAsk ? ot("tip-InitialOfferMakerBonus") : ot("tip-YourBonus")
          }
        >
          {isAsk ? ot("lb-InitialOfferMakerBonus") : ot("lb-YourBonus")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            ${formatNum(taxIncome)}
          </div>
        </div>
      </DetailRow>

      {duringTGE && <TimeDisplay seconds={seconds} />}
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

function TimeDisplay({ seconds }: { seconds: number }) {
  const dateObj = formatTimeObj(seconds);
  const ct = useTranslations("Common");

  return (
    <div className="mt-4 flex justify-center space-x-4">
      <TimeItem num={dateObj.days || 0} text={ct("Days")} />
      <TimeItem num={dateObj.hours || 0} text={ct("Hours")} />
      <TimeItem num={dateObj.minutes || 0} text={ct("Minutes")} />
      <TimeItem num={dateObj.seconds || 0} text={ct("Seconds")} />
    </div>
  );
}

function TimeItem({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-xl leading-[30px] text-yellow">
        {num}
      </div>
      <div className="text-xs leading-[18px] text-lightgray">{text}</div>
    </div>
  );
}
