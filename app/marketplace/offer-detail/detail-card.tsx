import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { WithTip } from "../create-offer/with-tip";
import { truncateAddr } from "@/lib/utils/web3";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";
import { useOrderMakerDetail } from "@/lib/hooks/order/use-order-maker-detail";

export default function DetailCard({ order }: { order: IOrder }) {
  const { handleGoScan } = useGoScan();

  const { amount, orderTokenInfo, orderPointInfo } = useOrderFormat({
    order,
  });

  const orderType = order.order_type;

  const { makerDetail, preOrderMakerDetail } = useOrderMakerDetail({
    order,
  });

  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-black">Offer Details</div>

      <DetailRow>
        <DetailLabel tipText="">
          {orderType === "ask" ? "Selling" : "Buying"} Amount
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
            {formatNum(order.points)} pts
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
            {truncateAddr(order.maker_id || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() => handleGoScan(order.maker_id || "")}
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
        <DetailLabel tipText="">Settlement Breach Fee</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-[#FFA95B]">
            {NP.divide(order.settle_breach_fee, 100)}%
          </div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">
          {orderType === "ask" ? "Total collateral" : "Total Deposit"}
        </DetailLabel>
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
        <DetailLabel tipText="">Est. Settling On</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-gray">Not Started</div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText="">Origin Offer Maker</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{order.preOrderDetail?.order_id}
          </div>
          <div className="text-sm leading-5 text-black">
            {truncateAddr(order.preOrderDetail?.maker_id || order.maker_id, {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(order.preOrderDetail?.maker_id || order.maker_id)
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
        <DetailLabel tipText="">Origin Offer Maker Tax Income</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-green">
            $
            {NP.divide(
              preOrderMakerDetail?.trade_tax || 0,
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
