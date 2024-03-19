import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { WithTip } from "../../../marketplace/create-offer/with-tip";
import { IOrder } from "@/lib/types/order";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { useOrderFormat } from "@/lib/hooks/use-order-format";
import { TokenPairImg } from "@/components/share/token-pair-img";

export default function CancelDrawer({
  drawerOpen,
  handleDrawerOpen,
  order,
}: {
  drawerOpen: boolean;
  handleDrawerOpen: (_o: boolean) => void;
  order: IOrder;
}) {
  const { platFormFee } = useGlobalConfig();

  const { offerLogo, forLogo, amount } = useOrderFormat({
    order,
  });

  const myDeposit = amount;
  const myCompensation = myDeposit;

  function handleCancel() {}

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
          <DrawerTitle
            title="Cancel Order"
            onClose={() => handleDrawerOpen(false)}
          />
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
            You can cancel your order if the seller is overdue on settlement to
            reclaim your deposit and receive compensation from the seller&apos;s
            collateral, based on your filled amount.
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              My Deposit
              <WithTip></WithTip>
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{myDeposit}</span>
              <Image src="/icons/usdc.svg" width={16} height={16} alt="token" />
            </div>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-[#eee]">
            <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
              My Compensation
              <WithTip></WithTip>
            </div>
            <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
              <span>{myCompensation}</span>
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
          <button
            onClick={handleCancel}
            className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#FFA95B] text-white"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </Drawer>
  );
}
