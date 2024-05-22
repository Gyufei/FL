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

import { truncateAddr } from "@/lib/utils/web3";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useMemo } from "react";
import { useMyOffers } from "@/lib/hooks/api/use-my-offers";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { IOffer } from "@/lib/types/offer";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";
import { formatTimestamp } from "@/lib/utils/time";
import { IRole, IStatus } from "./filter-select";
import { useCurrentChain } from "@/lib/hooks/web3/use-chain";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import DetailDrawer from "../common/detail-drawer/detail-drawer";
import { IOfferType } from "@/components/share/offer-type-select";

export function OrderTable({
  role,
  status,
  types,
}: {
  role: IRole;
  status: IStatus;
  types: Array<IOfferType>;
}) {
  const { setAnchorValue } = useAnchor();
  const { data: offers, mutate: refreshOrders } = useMyOffers();

  function openDetail(oId: any) {
    setAnchorValue(oId);
  }

  const data = useMemo(() => {
    const orderData = (offers || [])
      .map((o) => {
        return {
          ...o,
          id: o.offer_id,
        };
      })
      .filter((o) => {
        const oRole = "Maker";
        const oStatus = o.offer_status;
        const oType = o.offer_type;

        const isRole = role === "All" || role === oRole;
        const isStatus = status === "All" || status.toLowerCase() === oStatus;

        return isRole && isStatus && types.includes(oType as IOfferType);
      });
    return {
      nodes: orderData,
    };
  }, [offers, role, status, types]);

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
                <HeaderCell className="h-10 px-1 py-[11px]">Tx</HeaderCell>
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
                        {ord.marketplace?.market_name}
                      </div>
                      <div className="text-[10px] leading-4 text-gray">
                        #{ord.offer_id}
                      </div>
                    </div>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OrderRole offer={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OrderEqToken order={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OrderFromTo order={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OrderHash offer={ord} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <span className="text-sm leading-5 text-black">
                      {formatTimestamp(ord.create_at * 1000)}
                    </span>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <div
                      onClick={() => openDetail(ord.offer_id)}
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

      <DetailDrawer orders={offers || []} onSuccess={refreshOrders} />
    </>
  );
}

function OrderItem({ order }: { order: IOffer }) {
  const { currentChain } = useCurrentChain();

  return (
    <div className="relative h-fit w-fit">
      <Image
        src={order.marketplace?.projectLogo}
        width={32}
        height={32}
        alt="avatar"
        className="rounded-full"
      />
      <div className="absolute right-0 bottom-0 flex h-[14px] w-[14px] items-center justify-center rounded-full border border-white bg-white">
        <Image
          src={currentChain.logo}
          width={14}
          height={14}
          alt="avatar"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

function OrderEqToken({ order }: { order: IOffer }) {
  const { orderEqTokenInfo } = useOfferFormat({ offer: order });

  return (
    <div className="flex items-center space-x-1">
      <span>{orderEqTokenInfo.symbol}</span>
      <Image
        src={orderEqTokenInfo.logoURI}
        width={16}
        height={16}
        alt="token"
        className="rounded-full"
      />
    </div>
  );
}

function OrderFromTo({ order }: { order: IOffer }) {
  const { offerValue, forValue, offerLogo, forLogo } = useOfferFormat({
    offer: order,
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

function OrderRole({ offer }: { offer: IOffer }) {
  offer;
  const orderRole = "Maker";

  return (
    <div
      data-type={orderRole}
      className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
    >
      {orderRole}
    </div>
  );
}

function OrderHash({ offer }: { offer: IOffer }) {
  const { handleGoScan } = useGoScan();

  const hash = offer.tx_hash;

  return (
    <div className="flex items-center">
      <span className="text-sm leading-5 text-black">
        {truncateAddr(hash || "")}
      </span>
      <Image
        onClick={() => handleGoScan(hash || "", "tx")}
        src="/icons/right-45.svg"
        width={16}
        height={16}
        alt="goScan"
        className="cursor-pointer"
      />
    </div>
  );
}
