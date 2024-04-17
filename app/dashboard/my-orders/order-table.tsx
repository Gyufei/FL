import Image from "next/image";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";

import { truncateAddr } from "@/lib/utils/web3";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useMemo, useState } from "react";
import MyAskDetail from "./my-offer-detail/my-ask-detail";
import MyBidDetail from "./my-offer-detail/my-bid-detail";
import { useMyOrders } from "@/lib/hooks/api/use-my-orders";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { IOrder } from "@/lib/types/order";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";
import { formatTimestamp } from "@/lib/utils/time";
import { IRole, IStatus } from "./filter-select";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";

export function OrderTable({
  role,
  status,
  type,
}: {
  role: IRole;
  status: IStatus;
  type: string;
}) {
  const { data: orders } = useMyOrders();
  const { handleGoScan } = useGoScan();

  function openDetail(ord: any) {
    setCurDetail(ord);
    setDrawerOpen(true);
  }

  const [curDetail, setCurDetail] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isAsk = curDetail?.order_type === "ask";

  const data = useMemo(() => {
    const orderData = orders
      .map((o) => {
        return {
          ...o,
          id: o.order_id,
        };
      })
      .filter((o) => {
        const oRole = o.pre_order ? "Taker" : "Maker";
        const oStatus = o.maker_status;
        const oType = o.order_type;

        const isRole = role === "All" || role === oRole;
        const isStatus = status === "All" || status.toLowerCase() === oStatus;

        return isRole && isStatus && oType === type;
      });
    return {
      nodes: orderData,
    };
  }, [orders, role, status, type]);

  const theme = useTheme({
    Table: `
    `,
    Header: "",
    Body: "",
    BaseRow: `
      font-size: 14px;
      line-height: 18px;
    `,
    HeaderRow: `
      background: transparent;
    `,
    Row: `
    `,
    BaseCell: `
      &:nth-last-of-type(2) > div,
      &:last-of-type > div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      &:not(:first-of-type) > div {
        padding-left: 10px;
      }
    `,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #c0c4cc;
      line-height: 18px;

    `,
    Cell: ``,
  });

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: () => {},
  });

  const handlePageChange = (page: number) => {
    pagination.fns.onSetPage(page);
  };

  return (
    <>
      <Table
        data={data}
        theme={theme}
        pagination={pagination}
        className="flex-1 !grid-cols-[100px_repeat(7,minmax(0,1fr))] grid-rows-[40px_repeat(7,64px)] gap-2"
      >
        {(tableList: Array<any>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="border-none">
                <HeaderCell className="h-10 px-1 py-[11px]">Items</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">Offer</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">Type</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  Eq.Token
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">From/To</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">Seller</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  Created Time
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]"></HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((ord) => (
                <Row
                  key={ord.order_id}
                  item={ord}
                  className="h-12 border-none !bg-transparent"
                >
                  <Cell className="h-12 px-1 py-[11px] align-top text-gray">
                    <OrderItem order={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <div>
                      <div className="text-sm leading-5 text-black">
                        {ord.marketplace.market_place_name}
                      </div>
                      <div className="text-[10px] leading-4 text-gray">
                        #{ord.order_id}
                      </div>
                    </div>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OrderRole order={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OrderEqToken order={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OrderFromTo order={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <div className="flex items-center">
                      {ord.preOrderDetail?.maker_id && (
                        <>
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
                        </>
                      )}
                    </div>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <span className="text-sm leading-5 text-black">
                      {formatTimestamp(new Date(ord.create_at).getTime())}
                    </span>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <div
                      onClick={() => openDetail(ord)}
                      className="flex h-7 w-fit cursor-pointer items-center rounded-full border border-[#eee] px-[14px] text-sm leading-5 text-black hover:border-black"
                    >
                      Detail
                    </div>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

      <Pagination
        totalPages={pagination.state.getTotalPages(data.nodes)}
        edgePageCount={3}
        middlePagesSiblingCount={1}
        currentPage={pagination.state.page}
        setCurrentPage={handlePageChange}
      >
        <Pagination.PrevButton />

        <nav className="mx-2 flex items-center justify-center">
          <ul className="flex items-center gap-2">
            <Pagination.PageButton
              activeClassName=""
              inactiveClassName=""
              className=""
            />
          </ul>
        </nav>

        <Pagination.NextButton />
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
  const { offerLogo } = useOrderFormat({ order });
  const { currentChain } = useCurrentChain();

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
          src={currentChain.logo}
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

function OrderRole({ order }: { order: IOrder }) {
  const { orderRole } = useOrderFormat({ order });

  return (
    <div
      data-type={orderRole}
      className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
    >
      {orderRole}
    </div>
  );
}
