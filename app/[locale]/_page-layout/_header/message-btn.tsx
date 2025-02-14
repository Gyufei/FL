"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Drawer from "react-modern-drawer";

import { useMemo, useState } from "react";
import DrawerTitle from "@/components/share/drawer-title";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { IMsg, useWsMsgSub } from "@/lib/hooks/api/use-ws-msgs";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { useTokens } from "@/lib/hooks/api/token/use-tokens";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { formatNum } from "@/lib/utils/number";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function MessageBtn() {
  const t = useTranslations("Header");
  const { data } = useWsMsgSub(ChainType.BNB);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const showLen = useMemo(() => {
    if (!data) return 0;
    if (data.length < 99) return data.length;
    return "99+";
  }, [data]);

  const { isMobileSize } = useDeviceSize();

  return (
    <>
      <div
        onClick={() => setDrawerOpen(true)}
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#D3D4D6] hover:border-transparent hover:bg-yellow sm:h-12 sm:w-12 sm:rounded-full"
      >
        <Image
          src="/icons/bell.svg"
          width={isMobileSize ? 20 : 24}
          height={isMobileSize ? 20 : 24}
          alt="bell"
        />
        {(data || []).length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -right-2 -top-2 h-4 min-w-4 px-1 sm:-right-1 sm:-top-1"
          >
            {showLen}
          </Badge>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction={isMobileSize ? "top" : "right"}
        size={isMobileSize ? "99%" : 500}
        className="overflow-y-auto rounded-b-2xl p-6 sm:rounded-l-2xl"
        customIdSuffix="msg-drawer"
      >
        {isMobileSize ? (
          <MobileDrawerTitle
            title={t("cap-Notifications")}
            onClose={() => setDrawerOpen(false)}
          />
        ) : (
          <DrawerTitle
            title={t("cap-Notifications")}
            onClose={() => setDrawerOpen(false)}
          />
        )}
        {(data || []).map((i, idx) => (
          <MsgRow key={idx} msgDetail={i} />
        ))}
      </Drawer>
    </>
  );
}

function MsgRow({ msgDetail }: { msgDetail: IMsg }) {
  const { data: markets } = useMarketplaces();

  const marketplace = markets?.find(
    (marketplace) => marketplace.market_place_account === msgDetail.market_id,
  );

  const { data: tokens } = useTokens(marketplace?.chain);

  const token = useMemo(() => {
    if (!tokens) return null;
    return tokens.find((i) => i.address === msgDetail.token_mint);
  }, [tokens, msgDetail.token_mint]);

  const direction =
    Number(Number(msgDetail.value).toFixed()) % 2 === 0 ? "sell" : "buy";

  return (
    <div className="flex space-x-3">
      <div className="relative mt-3 h-fit">
        <Image
          src={marketplace?.projectLogo || "/icons/empty.svg"}
          width={48}
          height={48}
          alt="avatar"
          className="rounded-full"
        />
        <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-white">
          <Image
            src={token?.logoURI || "/icons/empty.svg"}
            width={8.8}
            height={7.2}
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>

      <div
        className="flex flex-1 flex-col space-y-1 py-3"
        style={{
          boxShadow: "inset 0px -1px 0px 0px #EEEEEE",
        }}
      >
        <div className="flex items-start space-x-1">
          <div className="mr-1 leading-6 text-black font-[700]">
            {marketplace?.market_symbol}
          </div>
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{msgDetail.item_id}
          </div>
        </div>

        <div className="flex items-center text-sm leading-5 text-gray">
          User
          <span className="mx-1 inline-block text-black">
            {truncateAddr(msgDetail.buyer)}
          </span>
          just
          <span
            data-type={direction}
            className="mx-1 inline-block data-[type=buy]:text-green data-[type=sell]:text-red"
          >
            {direction === "sell" ? "selling" : "bought"}
          </span>
          <span className="mr-1 inline-block text-black">
            {formatNum(msgDetail.amount)} {marketplace?.item_name}
          </span>
          for
          <span className="mx-1 inline-block text-black">
            {formatNum(msgDetail.token_amount)} {token?.symbol}
          </span>
        </div>

        <div className="flex items-center text-xs leading-[18px] text-lightgray">
          <div className="flex items-center">
            <div>3 hours ago ·</div>
            <div
              className="flex cursor-pointer items-center"
              onClick={() => {
                handleGoScan(
                  marketplace?.chain || ChainType.ETH,
                  "",
                  // msgDetail?.txHash,
                );
              }}
            >
              Solscan
              <Image
                src="/icons/arrow-right-gray.svg"
                width={16}
                height={16}
                alt="right"
                className="absolute right-8 ml-1 -rotate-45 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
