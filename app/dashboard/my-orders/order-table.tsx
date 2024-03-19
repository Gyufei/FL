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
import { useMyOrders } from "@/lib/hooks/api/use-my-orders";
import { useOrderFormat } from "@/lib/hooks/use-order-format";
import { IOrder } from "@/lib/types/order";
import { useGoScan } from "@/lib/hooks/use-go-scan";
import { formatTimestamp } from "@/lib/utils/time";

export function OrderTable() {
  const { data: orders } = useMyOrders();
  const { handleGoScan } = useGoScan();

  function openDetail(ord: any) {
    setCurDetail(ord);
    setDrawerOpen(true);
  }

  const [curDetail, setCurDetail] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isAsk = curDetail?.order_type === "ask";

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
            <TableRow key={ord.order_id} className="border-none">
              <TableCell className="px-1 py-[11px] text-gray">
                <OrderItem order={ord} />
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div>
                  <div className="text-sm leading-5 text-black">
                    {ord.marketplace.market_place_name}
                  </div>
                  <div className="text-[10px] leading-4 text-gray">
                    #{ord.order_id}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div
                  data-type={ord.order_type}
                  className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
                >
                  {ord.order_type}
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <OrderEqToken order={ord} />
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <OrderFromTo order={ord} />
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <div className="flex items-center">
                  <span className="text-sm leading-5 text-black">
                    {truncateAddr(ord.preOrderDetail?.maker_id || "")}
                  </span>
                  <Image
                    onClick={() =>
                      handleGoScan(ord.preOrderDetail?.maker_id || "")
                    }
                    src="/icons/right-45.svg"
                    width={16}
                    height={16}
                    alt="goScan"
                    className="cursor-pointer"
                  />
                </div>
              </TableCell>
              <TableCell className="px-1 py-[11px]">
                <span className="text-sm leading-5 text-black">
                  {formatTimestamp(ord.create_at)}
                </span>
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
          title={`My ${isAsk ? "Ask" : "Bid"} Offer Detail`}
          onClose={() => setDrawerOpen(false)}
        />
        {curDetail &&
          (isAsk ? (
            <MyAskDetail order={curDetail} />
          ) : (
            <MyBidDetail order={curDetail} />
          ))}
      </Drawer>
    </>
  );
}

function OrderItem({ order }: { order: IOrder }) {
  const { offerLogo, forLogo } = useOrderFormat({ order });

  return (
    <div className="relative h-fit w-fit">
      <Image
        src={offerLogo}
        width={32}
        height={32}
        alt="avatar"
        className="rounded-full"
      />
      <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full border border-white bg-white">
        <Image
          src={forLogo}
          width={6.6}
          height={5.4}
          alt="avatar"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

function OrderEqToken({ order }: { order: IOrder }) {
  const { orderEqTokenInfo } = useOrderFormat({ order });

  return (
    <div className="flex items-center space-x-1">
      <span>{orderEqTokenInfo.symbol}</span>
      <Image
        src={orderEqTokenInfo.logoURI}
        width={12}
        height={12}
        alt="token"
      />
    </div>
  );
}

function OrderFromTo({ order }: { order: IOrder }) {
  const { offerValue, forValue, offerLogo, forLogo } = useOrderFormat({
    order,
  });

  return (
    <div className="flex w-fit flex-col items-end">
      <div className="flex items-center space-x-2">
        <span className="text-sm leading-5 text-black">{offerValue}</span>
        <Image src={offerLogo} width={16} height={16} alt="token" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm leading-5 text-black">{forValue}</span>
        <Image src={forLogo} width={16} height={16} alt="token" />
      </div>
    </div>
  );
}
