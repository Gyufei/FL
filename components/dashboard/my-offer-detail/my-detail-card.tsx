import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";
import { WithTip } from "@/components/marketplace/create-offer/with-tip";

function formatTime(secs: number) {
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedTime = {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: secs % 60,
  };

  return formattedTime;
}

export default function MyDetailCard({
  offerDetail,
}: {
  offerDetail: Record<string, any>;
}) {
  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">Offer Details</div>

      <DetailRow>
        <DetailLabel tipText="">
          Filled / {offerDetail.type === "sell" ? "Selling" : "Buying"} Amount
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            5K / {formatNum(offerDetail.offerValue)} pts
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
        <DetailLabel tipText="">$USDC to Pay</DetailLabel>
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
        <DetailLabel tipText="">Settlement Breach Fee</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">3%</div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Tax for Sub Trade</DetailLabel>
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
          <div className="text-sm leading-5 text-red">YOU</div>
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
        <DetailLabel tipText="">Your Tax Income</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            ${offerDetail.offerValue}
          </div>
        </div>
      </DetailRow>

      <TimeDisplay seconds={offerDetail.seconds} />
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
  const dateObj = formatTime(seconds);

  return (
    <div className="mt-4 flex justify-center space-x-4">
      <TimeItem num={dateObj.days} text="Days" />
      <TimeItem num={dateObj.hours} text="Hours" />
      <TimeItem num={dateObj.minutes} text="Minutes" />
      <TimeItem num={dateObj.seconds} text="Seconds" />
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
