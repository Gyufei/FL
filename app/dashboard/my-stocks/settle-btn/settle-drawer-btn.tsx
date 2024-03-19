import Image from "next/image";
import { useState } from "react";
import SettleDrawer from "./settle-drawer";
import { IOrder } from "@/lib/types/order";

export default function SettleDrawerBtn({ order }: { order: IOrder }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleDrawerOpen(open: boolean) {
    setDrawerOpen(open);
  }

  return (
    <div>
      <div
        onClick={() => handleDrawerOpen(true)}
        className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black data-[disabled=true]:bg-gray"
      >
        <Image src="/icons/settle.svg" width={16} height={16} alt="list" />
        <span>Settle</span>
      </div>
      <SettleDrawer
        drawerOpen={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        order={order}
      />
    </div>
  );
}
