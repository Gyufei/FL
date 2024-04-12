"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import { useState } from "react";
import DrawerTitle from "@/components/share/drawer-title";
import { truncateAddr } from "@/lib/utils/web3";
import { useWsMsgs } from "@/lib/hooks/api/use-ws-msgs";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";

export default function MessageBtn() {
  const { messageHistory } = useWsMsgs();
  const msgDetail = {
    avatar: "/img/token-placeholder-3.png",
    name: "Points",
    no: 123456,
    user: "DkVN7RKTNjSSER5oyurf3vddQU2ZneSCYwXvpErvTCFA",
    type: "sell",
    num: 1,
    txHash: "",
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
        {!!messageHistory.length && (
          <Badge
            variant="destructive"
            className="absolute -right-3 -top-2 px-1"
          >
            {messageHistory.length}+
          </Badge>
        )}
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={500}
        className="overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title="Notifications"
          onClose={() => setDrawerOpen(false)}
        />
        {messageHistory.map((i, idx) => (
          <MsgRow key={idx} msgDetail={msgDetail} />
        ))}
      </Drawer>
    </>
  );
}

function MsgRow({ msgDetail }: { msgDetail: Record<string, any> }) {
  const { handleGoScan } = useGoScan();

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
          <div className="mr-1 leading-6 text-black">{msgDetail.name}</div>
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{msgDetail.no}
          </div>
        </div>

        <div className="flex items-center text-sm leading-5 text-gray">
          User
          <span className="mx-1 inline-block text-black">
            {truncateAddr(msgDetail.user)}
          </span>
          just
          <span
            data-type={msgDetail.type}
            className="mx-1 inline-block data-[type=sell]:text-red data-[type=buy]:text-green"
          >
            {msgDetail.type === "sell" ? "selling" : "bought"}
          </span>
          <span className="mr-1 inline-block text-black">
            {msgDetail.num} {msgDetail.name}
          </span>
          for
          <span className="mx-1 inline-block text-black">
            {msgDetail.value} {msgDetail.stableToken.name}
          </span>
        </div>

        <div className="flex items-center text-xs leading-[18px] text-lightgray">
          <div className="flex items-center">
            <div>3 hours ago ·</div>
            <div
              className="flex cursor-pointer items-center"
              onClick={() => handleGoScan(msgDetail.txHash)}
            >
              Solscan
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
      </div>
    </div>
  );
}
