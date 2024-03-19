import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { WithTip } from "../../../marketplace/create-offer/with-tip";
import SettleAskTaker from "./settle-ask-taker";
import SettleBidTaker from "./settle-bid-taker";
import SettleAskMaker from "./settle-ask-maker";
import SettleBidMaker from "./settle-bid-maker";
import { IOrder } from "@/lib/types/order";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { useOrderFormat } from "@/lib/hooks/use-order-format";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { formatNum } from "@/lib/utils/number";

export default function SettleDrawer({
  drawerOpen,
  handleDrawerOpen,
  order,
}: {
  drawerOpen: boolean;
  handleDrawerOpen: (_o: boolean) => void;
  order: IOrder;
}) {
  const { platFormFee } = useGlobalConfig();

  const { offerLogo, forLogo } = useOrderFormat({
    order,
  });

  const filledAmount = order.used_points;
  const myCollateral = order.amount;
  const mySettlementAmount = order.amount;
  const status = "open";

  const isAsk = true;
  const isTaker = true;

  return (
    <Drawer
      open={drawerOpen}
      onClose={() => handleDrawerOpen(false)}
      direction="right"
      size={500}
      className="overflow-y-auto rounded-l-2xl p-6"
    >
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-[10px]">
              <div className="h-6 w-6 rounded-lg bg-yellow"></div>
              <div className="text-xl leading-[30px] text-black">
                Settle Order
              </div>
              <div
                data-status={"open"}
                className="flex h-5 items-center px-2 data-[status=open]:bg-[#edf8f4] data-[status=open]:text-green"
              >
                {status}
              </div>
            </div>
            <Image
              src="/icons/close.svg"
              width={24}
              height={24}
              alt="close"
              className="cursor-pointer"
              onClick={() => handleDrawerOpen(false)}
            />
          </div>
          <div className="flex items-center">
            <TokenPairImg
              src1={offerLogo}
              src2={forLogo}
              width1={40}
              height1={40}
              width2={8.8}
              height2={7.2}
            />

            <div className="ml-3 text-xl leading-[30px] text-black">
              {order.marketplace?.market_place_name}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#FFF6EE] p-3 text-sm leading-5 text-[#FFA95B]">
            Settle your order to retrieve your collateral and claim your
            settlement amount. lf you don&apos;t settle, your collateral will be
            transferred to the buyer.
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              Filled Amount
              <WithTip></WithTip>
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{formatNum(filledAmount)}</span>
              <Image
                src="/icons/solana.svg"
                width={16}
                height={16}
                alt="token"
              />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              My Collateral
              <WithTip></WithTip>
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{formatNum(myCollateral)}</span>
              <Image src="/icons/usdc.svg" width={16} height={16} alt="token" />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              My settlement Amount
              <WithTip></WithTip>
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{formatNum(mySettlementAmount)}</span>
              <Image src="/icons/usdc.svg" width={16} height={16} alt="token" />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              Platform fee
              <WithTip></WithTip>
            </div>
            <div className="flex items-center text-xs leading-[18px]">
              {platFormFee * 100}%
            </div>
          </div>
        </div>
        <div className="mt-[140px] flex items-center justify-between space-x-[6px]">
          <button
            onClick={() => handleDrawerOpen(false)}
            className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#F0F1F5] text-black"
          >
            Back
          </button>
          {isAsk &&
            (isTaker ? (
              <SettleAskTaker
                preOrderStr={order.pre_order}
                orderStr={order.order}
                makerStr={order.maker_id}
              />
            ) : (
              <SettleAskMaker
                orderStr={order.order}
                makerStr={order.maker_id}
              />
            ))}
          {!isAsk &&
            (isTaker ? (
              <SettleBidTaker
                preOrderStr={order.pre_order}
                orderStr={order.order}
                makerStr={order.maker_id}
              />
            ) : (
              <SettleBidMaker
                preOrderStr={order.pre_order}
                orderStr={order.order}
                makerStr={order.maker_id}
              />
            ))}
        </div>
      </div>
    </Drawer>
  );
}
