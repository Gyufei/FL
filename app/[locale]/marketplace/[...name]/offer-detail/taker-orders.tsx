import NP from "number-precision";
import Image from "next/image";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { truncateAddr } from "@/lib/utils/web3";
import { IToken } from "@/lib/types/token";
import { useGoScan } from "@/lib/hooks/web3/use-go-scan";
import { formatTimestamp } from "@/lib/utils/time";
import { useMemo } from "react";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { formatNum } from "@/lib/utils/number";
import { useTranslations } from "next-intl";

export interface TakerOrder {
  create_at: string;
  deposits: string;
  from: string;
  points: string;
  sub_no: string;
  to: string;
  total_points: string;
  tx_hash: string;
  order_id: string;
}

export function TakerOrders({
  orders,
  offerLogo,
  orderEqTokenInfo,
  orderTokenInfo,
}: {
  orders: Array<TakerOrder>;
  offerLogo: string;
  forLogo: string;
  orderEqTokenInfo: IToken;
  orderTokenInfo: IToken;
}) {
  const T = useTranslations("drawer-OfferDetail");
  const { handleGoScan } = useGoScan();

  const data = useMemo(() => {
    const orderData = orders.map((o, index) => {
      return {
        ...o,
        id: index,
      };
    });

    return {
      nodes: orderData,
    };
  }, [orders]);

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 48px);
      grid-template-columns:  60px repeat(5, minmax(0, 1fr));
      font-weight: 400;
    `,
    Header: "",
    Body: "",
    BaseRow: `
      background-color: #fafafa;
    `,
    HeaderRow: `
      background: transparent;
    `,
    Row: `
      box-shadow: inset 0px -1px 0px 0px #EEEEEE;
    `,
    BaseCell: `
      font-size: 14px;
      &:not(:first-of-type) {
        text-align: right;
      }
    `,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #c0c4cc;
      line-height: 18px;
    `,
    Cell: `
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
    { label: T("th-SubNo"), renderCell: (o: any) => `#${o.sub_no}` },
    {
      label: T("th-FillAmount"),
      renderCell: (o: any) => <PointsCell order={o} offerLogo={offerLogo} />,
    },
    {
      label: T("th-Deposits"),
      renderCell: (o: TakerOrder) => (
        <AmountCell order={o} tokenInfo={orderTokenInfo} />
      ),
    },
    {
      label: T("th-EqToken"),
      renderCell: () => (
        <div className="flex items-center justify-end space-x-1">
          <span>{orderEqTokenInfo.symbol}</span>
          <Image
            src={orderEqTokenInfo.logoURI}
            width={16}
            height={16}
            alt="token"
            className="rounded-full"
          />
        </div>
      ),
    },
    {
      label: T("th-TxHash"),
      renderCell: (o: TakerOrder) => (
        <div className="flex items-center justify-end">
          {truncateAddr(o.tx_hash || "")}
          <Image
            onClick={() => handleGoScan(o.tx_hash || "", "tx")}
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
      label: T("th-Time"),
      renderCell: (o: TakerOrder) => (
        <div className="flex items-center justify-end">{`${formatTimestamp(
          Number(o.create_at) * 1000,
        )}`}</div>
      ),
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
    </>
  );
}

function PointsCell({
  order,
  offerLogo,
}: {
  order: TakerOrder;
  offerLogo: string;
}) {
  const points = order.points;
  const totalPoints = order.total_points;
  const percent = formatNum(NP.divide(points, totalPoints) * 100);

  return (
    <div className="flex items-center justify-end space-x-1">
      <div>
        #{points} ({percent}%)
      </div>
      <Image
        src={offerLogo}
        width={16}
        height={16}
        alt="token"
        className="rounded-full"
      />
    </div>
  );
}

function AmountCell({
  order,
  tokenInfo,
}: {
  order: TakerOrder;
  tokenInfo: IToken;
}) {
  const amount = useMemo(() => {
    return NP.divide(order.deposits, 10 ** tokenInfo.decimals);
  }, [order.deposits, tokenInfo]);

  return (
    <div className="flex items-center justify-end space-x-1">
      <span>{formatNum(amount)}</span>
      <Image src={tokenInfo.logoURI} width={16} height={16} alt="token" />
    </div>
  );
}