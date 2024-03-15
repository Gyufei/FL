"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import { useState } from "react";
import DrawerTitle from "@/components/share/drawer-title";
import { range } from "lodash";
import { truncateAddr } from "@/lib/utils/web3";

export default function MessageBtn() {
  const msgDetail = {
    avatar: "/img/avatar-placeholder-3.png",
    name: "Magic Eden",
    no: 123456,
    user: "DkVN7RKTNjSSER5oyurf3vddQU2ZneSCYwXvpErvTCFA",
    type: "sell",
    num: 1,
    value: 644,
    token: {
      logoURI: "/icons/solana.svg",
    },
    stableToken: {
      name: "USDC",
    },
  };
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (pathname === "/") return null;

  return (
    <>
      <div
        onClick={() => setDrawerOpen(true)}
        className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#D3D4D6]"
      >
        <Image src="/icons/bell.svg" width={24} height={24} alt="bell" />
        <Badge variant="destructive" className="absolute -right-3 -top-2 px-1">
          3+
        </Badge>
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={500}
        className="rounded-l-2xl p-6"
      >
        <DrawerTitle
          title="Notifications"
          onClose={() => setDrawerOpen(false)}
        />
        {range(3).map((i) => (
          <MsgRow key={i} msgDetail={msgDetail} />
        ))}
      </Drawer>
    </>
  );
}

function MsgRow({ msgDetail }: { msgDetail: Record<string, any> }) {
  return (
    <div className="flex space-x-3">
      <div className="relative mt-3 h-fit">
        <Image
          src={msgDetail.avatar}
          width={48}
          height={48}
          alt="avatar"
          className="rounded-full"
        />
        <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-white">
          <Image
            src={msgDetail.token.logoURI}
            width={8.8}
            height={7.2}
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>

      <div
        className="flex flex-col py-3"
        style={{
          boxShadow: "inset 0px -1px 0px 0px #EEEEEE",
        }}
      >
        <div className="flex items-start space-x-1">
          <div className="leading-6 text-black">{msgDetail.name}</div>
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{msgDetail.no}
          </div>
        </div>

        <div className="flex items-center text-sm leading-5 text-gray">
          User{" "}
          <span className="text-black">
            {truncateAddr(msgDetail.user)}
          </span>{" "}
          just{" "}
          <span
            data-type={msgDetail.type}
            className="data-[type=sell]:text-red data-[type=buy]:text-green"
          >
            {msgDetail.type === "sell" ? "selling" : "bought"}
          </span>
          <span className="text-black">
            {msgDetail.num} {msgDetail.name}
          </span>{" "}
          for{" "}
          <span className="text-black">
            {msgDetail.value} {msgDetail.stableToken.name}
          </span>
        </div>

        <div className="flex items-center text-xs leading-[18px] text-lightgray">
          <div>3 hours ago · Solscan</div>
          <Image
            src="/icons/arrow-right-gray.svg"
            width={16}
            height={16}
            alt="right"
            className="-rotate-45 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
