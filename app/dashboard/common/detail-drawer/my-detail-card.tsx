import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import { formatTimeObj } from "@/lib/utils/time";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";
import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useOfferMakerDetail } from "@/lib/hooks/offer/use-offer-maker-detail";

export default function MyDetailCard({ offer }: { offer: IOffer }) {
  const { publicKey } = useWallet();

  const { orderTokenInfo, orderPointInfo, duringTGE } = useOfferFormat({
    offer: offer,
  });

  const isAsk = offer.offer_type === "ask";

  const { originOffer, makerDetail } = useOfferMakerDetail({
    offer: offer,
  });

  const { handleGoScan } = useGoScan();

  const originMaker = useMemo(() => {
    return originOffer?.maker_account || offer.maker_account;
  }, [originOffer, offer]);

  const isYouAreOriginMaker = publicKey?.toBase58() === originMaker;

  const taxIncome = useMemo(() => {
    const ti = offer?.trade_tax || makerDetail?.trade_tax;

    const tax = Number(ti || 0);
    const fmtTax = NP.divide(tax, 10 ** orderTokenInfo.decimals);

    return fmtTax;
  }, [makerDetail, offer, orderTokenInfo]);

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
  }, []);

  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">Offer Details</div>

      <DetailRow>
        <DetailLabel tipText="">
          Filled / {isAsk ? "Selling" : "Buying"} Amount
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(offer.used_points, 2, true)} /{" "}
            {formatNum(offer.points, 2, true)} pts
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
          {isAsk ? "Base Tax for each Trade" : "Tax for Sub Trade"}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            {Number(makerDetail?.each_trade_tax || 0) / 100}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Settlement Breach Fee</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">
            {Number(offer.settle_breach_fee) / 100}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Inherit From</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{originOffer?.offer_id || offer?.offer_id}
          </div>
          <div className="text-sm leading-5 text-black">
            {truncateAddr(
              originOffer?.offer_account || offer.maker_account || "",
              {
                nPrefix: 4,
                nSuffix: 4,
              },
            )}
          </div>
          <Image
            onClick={() =>
              handleGoScan(
                originOffer?.offer_account || offer.maker_account || "",
              )
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
          <DetailLabel tipText="">Est. Settling At</DetailLabel>
          <div className="flex items-center space-x-1">
            <div className="text-sm leading-5 text-gray">Not Started</div>
          </div>
        </DetailRow>
      )}

      <DetailRow>
        <DetailLabel tipText="">Origin Offer Maker</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{offer?.offer_id}
          </div>
          <div className="text-sm leading-5 text-red">
            {isYouAreOriginMaker
              ? "You"
              : truncateAddr(originMaker, {
                  nPrefix: 4,
                  nSuffix: 4,
                })}
          </div>
          <Image
            onClick={() => handleGoScan(originMaker || "")}
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow showBottomLine={false}>
        <DetailLabel tipText="">
          {isAsk ? "Origin Offer Maker Tax Income" : "Your Tax Income"}
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

  return (
    <div className="mt-4 flex justify-center space-x-4">
      <TimeItem num={dateObj.days || 0} text="Days" />
      <TimeItem num={dateObj.hours || 0} text="Hours" />
      <TimeItem num={dateObj.minutes || 0} text="Minutes" />
      <TimeItem num={dateObj.seconds || 0} text="Seconds" />
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
