import NP from "number-precision";
import Image from "next/image";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { truncateAddr } from "@/lib/utils/web3";
import { IOrder } from "@/lib/types/order";
import { IToken } from "@/lib/types/token";
import { useGoScan } from "@/lib/hooks/use-go-scan";
import { formatTimestamp } from "@/lib/utils/time";
import { useMemo } from "react";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useTheme } from "@table-library/react-table-library/theme";

export function TakerOrders({
  orders,
  offerLogo,
  forLogo,
  orderEqTokenInfo,
}: {
  orders: Array<IOrder>;
  offerLogo: string;
  forLogo: string;
  orderEqTokenInfo: IToken;
}) {
  const { handleGoScan } = useGoScan();

  const data = useMemo(() => {
    const orderData = orders.map((o) => {
      return {
        ...o,
        id: o.order_id,
      };
    });
    return {
      nodes: orderData,
    };
  }, [orders]);

  const theme = useTheme({
    Table: `
      height: 280px;
      grid-template-rows: 40px repeat(5, 48px);
      font-weight: 400;
    `,
    Header: "",
    Body: "",
    BaseRow: `
    `,
    HeaderRow: `
      background: transparent;
    `,
    Row: `
    `,
    BaseCell: ``,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #c0c4cc;
      line-height: 18px;

      &:not(:first-child) {
        text-align: right;
      }
    `,
    Cell: `
      &:not(:first-child) {
        text-align: right;
      }
    `,
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

  const COLUMNS = [
    { label: "Sub No.", renderCell: (o: IOrder) => `#${o.order_id}` },
    {
      label: "Fill Amount",
      renderCell: (o: IOrder) => (
        <div className="flex items-center space-x-1">
          <div>
            #{o.used_points} ({NP.divide(o.used_points, o.points) * 100}
            %)
          </div>
          <Image src={offerLogo} width={16} height={16} alt="token" />
        </div>
      ),
    },
    {
      label: "Deposits",
      renderCell: (o: IOrder) => (
        <div className="flex items-center space-x-1">
          <span>{o.amount}</span>
          <Image src={forLogo} width={12} height={12} alt="token" />
        </div>
      ),
    },
    {
      label: "Eq.Token",
      renderCell: () => (
        <div className="flex items-center space-x-1">
          <span>{orderEqTokenInfo.symbol}</span>
          <Image
            src={orderEqTokenInfo.logoURI}
            width={12}
            height={12}
            alt="token"
          />
        </div>
      ),
    },
    {
      label: "Tx Hash",
      renderCell: (o: IOrder) => (
        <div className="flex items-center">
          {truncateAddr(o.relist_tx_hash || o.order_tx_hash || "")}
          <Image
            onClick={() =>
              handleGoScan(o.relist_tx_hash || o.order_tx_hash || "", "tx")
            }
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      ),
    },
    {
      label: "Time",
      renderCell: (o: IOrder) =>
        `${formatTimestamp(new Date(o.create_at).getTime())}`,
    },
  ];

  return (
    <>
      <CompactTable
        theme={theme}
        columns={COLUMNS}
        data={data}
        pagination={pagination}
      />
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
    </>
  );
}
