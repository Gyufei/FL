import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";
import { WithTip } from "@/app/marketplace/create-offer/with-tip";
import { formatTimeObj } from "@/lib/utils/time";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/use-order-format";
import { useGoScan } from "@/lib/hooks/use-go-scan";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function MyDetailCard({ order }: { order: IOrder }) {
  const { publicKey } = useWallet();

  const { amount, orderTokenInfo, orderPointInfo, makerDetail } =
    useOrderFormat({
      order,
    });

  const { handleGoScan } = useGoScan();

  const originOrder = useMemo(() => {
    function getOriginOrder(order: IOrder) {
      if (order.preOrderDetail) {
        return getOriginOrder(order.preOrderDetail);
      } else {
        return order;
      }
    }

    return getOriginOrder(order);
  }, [order]);

  const originMaker = useMemo(() => {
    return originOrder.maker_id;
  }, [originOrder]);

  const isYouAreOriginMaker = publicKey?.toBase58() === originMaker;

  const taxIncome = useMemo(() => {
    const tax = Number(makerDetail?.trade_tax || 0);
    const fmtTax = NP.divide(tax, 10 ** orderTokenInfo.decimals);

    return fmtTax;
  }, [makerDetail, orderTokenInfo]);

  const seconds = order?.create_at
    ? Date.now() -
      Number(new Date(order?.relist_at || order?.create_at).getTime())
    : 0;

  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">Offer Details</div>

      <DetailRow>
        <DetailLabel tipText="">
          Filled / {order.order_type === "ask" ? "Selling" : "Buying"} Amount
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            5K / {formatNum(order.points)} pts
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
        <DetailLabel tipText="">$USDC to Pay</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(amount)}
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
        <DetailLabel tipText="">Settlement Breach Fee</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">
            {Number(order.settle_breach_fee) / 100}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Tax for Sub Trade</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            {Number(makerDetail?.each_trade_tax || 0) / 100}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Inherit From</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{originOrder.order_id}
          </div>
          <div className="text-sm leading-5 text-black">
            {truncateAddr(order.preOrderDetail?.order || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() => handleGoScan(order.preOrderDetail?.order || "")}
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
            #{order.order_id}
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
        <DetailLabel tipText="">Your Tax Income</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            ${formatNum(taxIncome)}
          </div>
        </div>
      </DetailRow>

      <TimeDisplay seconds={seconds} />
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
