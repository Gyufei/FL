import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateAddr } from "@/lib/utils/web3";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import MyAskDetail from "./my-offer-detail/my-ask-detail";
import MyBidDetail from "./my-offer-detail/my-bid-detail";

const data = [
  {
    avatar: "/img/avatar-placeholder.png",
    token: {
      logoURI: "/icons/magic-eden.svg",
    },
    stableToken: {
      logoURI: "/icons/usdc.svg",
    },
    name: "kamino",
    no: "883104",
    progress: 0.11,
    type: "sell",
    orderType: "Maker",
    eqToken: {
      name: "TBA",
      logoURI: "/icons/magic-eden.svg",
    },
    offer: 63,
    for: 157586,
    seller: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    date: "22:33 Jan 4, 2023",
    offerValue: 0.0232,
    forValue: 240.8,
    pointPrice: 18.84,
    filled: false,
    time: 15,
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    seconds: 23131311,
  },
];

const orders = new Array(10).fill(data).flat();

export function OrderTable() {
  function openDetail(ord: any) {
    setCurDetail(ord);
    setDrawerOpen(true);
  }

  const [curDetail, setCurDetail] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSell = curDetail?.type === "sell";

  return (
    <>
      <Table className="text-xs leading-[18px]">
        <TableHeader className="text-xs leading-[18px] text-gray">
          <TableRow className="border-none ">
            <TableHead className="h-10 px-1 py-[11px]">Items</TableHead>
            <TableHead className="h-10 px-1 py-[11px]">Offer</TableHead>
            <TableHead className="h-10 px-1 py-[11px]">Type</TableHead>
            <TableHead className="h-10 px-1 py-[11px]">Eq.Token</TableHead>
            <TableHead className="h-10 px-1 py-[11px]">From/To</TableHead>
            <TableHead className="h-10 px-1 py-[11px]">Seller</TableHead>
            <TableHead className="h-10 px-1 py-[11px]">Created Time</TableHead>
            <TableHead className="h-10 px-1 py-[11px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((ord) => (
            <TableRow key={ord.no} className="border-none">
              <TableCell className="px-1 py-[11px] text-gray">
                <div className="relative h-fit w-fit">
                  <Image
                    src={ord.token.logoURI}
                    width={32}
                    height={32}
                    alt="avatar"
                    className="rounded-full"
                  />
                  <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full border border-white bg-white">
                    <Image
                      src={ord.stableToken.logoURI}
                      width={6.6}
                      height={5.4}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div>
                  <div className="text-sm leading-5 text-black">{ord.name}</div>
                  <div className="text-[10px] leading-4 text-gray">
                    #{ord.no}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div
                  data-type={ord.orderType}
                  className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
                >
                  {ord.orderType}
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div className="flex items-center space-x-1">
                  <span>{ord.eqToken.name}</span>
                  <Image
                    src={ord.eqToken.logoURI}
                    width={12}
                    height={12}
                    alt="token"
                  />
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div className="flex w-fit flex-col items-end">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm leading-5 text-black">
                      {ord.offer}
                    </span>
                    <Image
                      src={ord.stableToken.logoURI}
                      width={16}
                      height={16}
                      alt="token"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm leading-5 text-black">
                      {ord.for}
                    </span>
                    <Image
                      src={ord.token.logoURI}
                      width={16}
                      height={16}
                      alt="token"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div className="flex items-center">
                  <span className="text-sm leading-5 text-black">
                    {truncateAddr(ord.seller)}
                  </span>
                  <Image
                    src="/icons/right-45.svg"
                    width={16}
                    height={16}
                    alt="goScan"
                    className="cursor-pointer"
                  />
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <span className="text-sm leading-5 text-black">{ord.date}</span>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div
                  onClick={() => openDetail(ord)}
                  className="flex h-7 w-fit cursor-pointer items-center rounded-full border border-[#eee] px-[14px] text-sm leading-5 text-black hover:border-black"
                >
                  Detail
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="h-8 w-8 rounded-lg bg-white"
              href="#"
              isActive
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">8</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={952}
        className="overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title={`My ${isSell ? "Ask" : "Bid"} Offer Detail`}
          onClose={() => setDrawerOpen(false)}
        />
        {curDetail &&
          (isSell ? (
            <MyAskDetail offerDetail={curDetail} />
          ) : (
            <MyBidDetail offerDetail={curDetail} />
          ))}
      </Drawer>
    </>
  );
}
