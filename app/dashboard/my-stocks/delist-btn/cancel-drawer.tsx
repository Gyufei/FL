import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { WithTip } from "../../../marketplace/create-offer/with-tip";

export default function CancelDrawer({
  drawerOpen,
  handleDrawerOpen,
  stockDetail,
}: {
  drawerOpen: boolean;
  handleDrawerOpen: (_o: boolean) => void;
  stockDetail: Record<string, any>;
}) {
  const myDeposit = 63;
  const myCompensation = 63;
  const platFormFee = 0.025;

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
            <div className="relative h-fit">
              <Image
                src={stockDetail.avatar}
                width={40}
                height={40}
                alt="avatar"
                className="rounded-full"
              />
              <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-white">
                <Image
                  src={stockDetail.token.logoURI}
                  width={8.8}
                  height={7.2}
                  alt="avatar"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="ml-3 text-xl leading-[30px] text-black">
              {stockDetail.name}
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
