import Image from "next/image";

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

import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useMemo, useState } from "react";
import { useMyOrders } from "@/lib/hooks/api/use-my-orders";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { IOrder } from "@/lib/types/order";
import { formatTimestamp } from "@/lib/utils/time";
import { IRole, IStatus } from "./filter-select";
import DetailDrawer from "../common/detail-drawer/detail-drawer";
import { IOfferType } from "@/components/share/offer-type-select";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";
import { ChainConfigs } from "@/lib/const/chain-config";

export function OrderTable({
  role,
  status,
  types,
}: {
  role: IRole;
  status: IStatus;
  types: Array<IOfferType>;
}) {
  const T = useTranslations("page-MyOrders");

  const { data: orders, mutate: refreshMyOrders } = useMyOrders();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectOrderId, setSelectOrderId] = useState("");
  const selectedOrder = orders?.find((o) => o.order_id === selectOrderId);

  const data = useMemo(() => {
    const orderData = (orders || [])
      .map((o) => {
        return {
          ...o,
          id: o.order_id,
        };
      })
      .filter((o) => {
        const oType = o.offer?.entry?.direction;
        const isRole = role === "All" || role === o.role;
        const isStatus =
          status === "All" || status.toLowerCase() === o.offer.status;

        return isRole && types.includes(oType as IOfferType) && isStatus;
      });

    const sortData = sortBy(orderData, "create_at").reverse();

    return {
      nodes: sortData,
    };
  }, [orders, role, status, types]);

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
      size: 9,
    },
    onChange: () => {},
  });

  const handlePageChange = (page: number) => {
    pagination.fns.onSetPage(page);
  };

  if (!data.nodes.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-base text-gray">
        {T("txt-YourOrderAppearHere")}
      </div>
    );
  }
  function handleOpenOrderDrawer(OId: string) {
    setSelectOrderId(OId);
    setDrawerOpen(true);
  }

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
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Items")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Offer")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Type")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-EqToken")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-From/To")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Tx")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-CreatedTime")}
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
                        {ord.offer.marketplace?.market_name}
                      </div>
                      <div className="text-[10px] leading-4 text-gray">
                        #{ord.entry.id}
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
                    <OrderHash order={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <span className="text-sm leading-5 text-black">
                      {formatTimestamp(ord.create_at * 1000)}
                    </span>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <DetailBtn
                      onClick={() => handleOpenOrderDrawer(ord.order_id)}
                    ></DetailBtn>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

      {pagination.state.getTotalPages(data.nodes) > 1 && (
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
      )}

      <DetailDrawer
        holdingId={selectOrderId}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        offer={selectedOrder?.offer}
        onSuccess={refreshMyOrders}
      />
    </>
  );
}

function OrderItem({ order }: { order: IOrder }) {
  return (
    <div className="relative h-fit w-fit">
      <Image
        src={order.offer.marketplace?.projectLogo}
        width={32}
        height={32}
        alt="avatar"
        className="rounded-full"
      />
      <div className="absolute bottom-0 right-0 flex h-[14px] w-[14px] items-center justify-center rounded-full border border-white bg-white">
        <Image
          src={ChainConfigs[order.offer.marketplace.chain].logo}
          width={14}
          height={14}
          alt="avatar"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

function OrderEqToken({ order }: { order: IOrder }) {
  const { offerEqTokenInfo } = useOfferFormat({ offer: order.offer });

  return (
    <div className="flex items-center space-x-1">
      <span>{offerEqTokenInfo.symbol}</span>
      <Image
        src={offerEqTokenInfo.logoURI}
        width={16}
        height={16}
        alt="token"
        className="rounded-full"
      />
    </div>
  );
}

function OrderFromTo({ order }: { order: IOrder }) {
  const { offerValue, forValue, offerLogo, forLogo } = useOfferFormat({
    offer: order.offer,
  });

  return (
    <div className="flex w-fit flex-col items-start">
      <div className="flex items-center space-x-2">
        <Image
          src={offerLogo}
          width={16}
          height={16}
          alt="token"
          className="rounded-full"
        />
        <span className="text-sm leading-5 text-black">{offerValue}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src={forLogo}
          width={16}
          height={16}
          alt="token"
          className="rounded-full"
        />
        <span className="text-sm leading-5 text-black">{forValue}</span>
      </div>
    </div>
  );
}

function OrderRole({ order }: { order: IOrder }) {
  const orderRole = order.role;

  return (
    <div
      data-type={orderRole}
      className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
    >
      {orderRole}
    </div>
  );
}

function OrderHash({ order }: { order: IOrder }) {
  const hash = order.tx_hash;

  return (
    <div className="flex items-center">
      <span className="text-sm leading-5 text-black">
        {truncateAddr(hash || "")}
      </span>
      <Image
        onClick={() =>
          handleGoScan(order.offer.marketplace.chain, hash || "", "tx")
        }
        src="/icons/right-45.svg"
        width={16}
        height={16}
        alt="goScan"
        className="cursor-pointer"
      />
    </div>
  );
}

function DetailBtn({ onClick }: { onClick: () => void }) {
  const ct = useTranslations("Common");
  return (
    <WithWalletConnectBtn className="flex w-fit" onClick={onClick}>
      <div className="flex h-7 w-full cursor-pointer items-center rounded-full border border-[#eee] px-[14px] text-sm leading-5 text-black hover:border-black">
        {ct("Detail")}
      </div>
    </WithWalletConnectBtn>
  );
}
