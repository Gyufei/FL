"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { usePathname, useRouter } from "@/app/navigation";
import { useState } from "react";

export default function MobileRouterMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="block md:hidden">
      <button
        data-show={showMenu ? true : false}
        className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#d3d4d6] bg-white transition-all data-[show=true]:border-black"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <X className="h-4 w-4" />
        ) : (
          <div className="flex flex-col space-y-[5.5px]">
            <Image
              src="/icons/line-menu.svg"
              width={20}
              height={20}
              alt="menu"
            />
          </div>
        )}
      </button>
      {showMenu && <MenuList onEnd={() => setShowMenu(false)} />}
    </div>
  );
}

function MenuList({ onEnd }: { onEnd: () => void }) {
  const router = useRouter();
  const routePath = [`/dashboard`, `/marketplace`];
  const currentRoute = usePathname();

  const isDashboardActive = currentRoute.includes(routePath[0]);
  const isMarketplaceActive = currentRoute.includes(routePath[1]);

  const handleClick = (r: string) => {
    if (currentRoute.includes(r)) {
      onEnd();
      return;
    }

    router.push(r);
    onEnd();
  };

  return (
    <div className="fixed left-0 top-[100px] z-10 h-[calc(100vh-100px)] w-screen bg-white p-4">
      <div
        data-active={isDashboardActive}
        className="mb-2 flex items-center space-x-3 py-3 data-[active=true]:opacity-50"
        style={{
          boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
        }}
        onClick={() => handleClick("/dashboard")}
      >
        <Image
          src={
            isDashboardActive ? "/icons/dashboard.svg" : "/icons/dashboard.svg"
          }
          width={40}
          height={40}
          alt="pools"
        />
        <div className="text-lg leading-5 text-black">Dashboard</div>
      </div>
      <div
        data-active={isMarketplaceActive}
        className="mb-2 flex items-center space-x-3 py-3 data-[active=true]:opacity-50"
        style={{
          boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
        }}
        onClick={() => handleClick("/marketplace")}
      >
        <Image
          src={
            isMarketplaceActive
              ? "/icons/marketplace.svg"
              : "/icons/marketplace.svg"
          }
          width={40}
          height={40}
          alt="governance"
        />
        <div className="text-lg leading-5 text-black">Marketplace</div>
      </div>
    </div>
  );
}
