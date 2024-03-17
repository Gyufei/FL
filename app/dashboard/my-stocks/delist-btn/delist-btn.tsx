import Image from "next/image";
import { useState } from "react";
import CancelDrawer from "./cancel-drawer";

export default function DelistBtn({
  stockDetail,
}: {
  stockDetail: Record<string, any>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleDrawerOpen(open: boolean) {
    setDrawerOpen(open);
  }

  return (
    <div>
      <div
        onClick={() => setDrawerOpen(true)}
        className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black"
      >
        <Image
          src="/icons/upload.svg"
          width={16}
          height={16}
          alt="list"
          className="rotate-180"
        />
        <span>Delist</span>
      </div>
      <CancelDrawer
        drawerOpen={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        stockDetail={stockDetail}
      />
    </div>
  );
}
