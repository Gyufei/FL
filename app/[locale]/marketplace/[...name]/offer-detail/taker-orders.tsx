import NP from "number-precision";
import Image from "next/image";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { IToken } from "@/lib/types/token";
import { formatTimestamp } from "@/lib/utils/time";
import { useMemo } from "react";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { formatNum } from "@/lib/utils/number";
import { useTranslations } from "next-intl";
import { ITakerOrder } from "@/lib/hooks/api/use-taker-orders-of-offer";
import { IOffer } from "@/lib/types/offer";

export function TakerOrders({
  orders,
  offer,
  offerLogo,
  offerEqTokenInfo,
  orderTokenInfo,
}: {
  orders: Array<ITakerOrder>;
  offer: IOffer;
  offerLogo: string;
  offerEqTokenInfo: IToken;
  orderTokenInfo: IToken;
}) {
  const T = useTranslations("drawer-OfferDetail");

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
      grid-template-columns: 60px repeat(5, minmax(0, 1fr));
      font-weight: 400;
      grid-auto-rows: 48px;
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
      renderCell: (o: any) => (
        <PointsCell order={o} offer={offer} offerLogo={offerLogo} />
      ),
    },
    {
      label: T("th-Deposits"),
      renderCell: (o: ITakerOrder) => (
        <AmountCell order={o} tokenInfo={orderTokenInfo} />
      ),
    },
    {
      label: T("th-EqToken"),
      renderCell: () => (
        <div className="flex items-center justify-end space-x-1">
          <span>{offerEqTokenInfo.symbol}</span>
          <Image
            src={offerEqTokenInfo.logoURI}
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
      renderCell: (o: ITakerOrder) => (
        <div className="flex items-center justify-end">
          {truncateAddr(o.tx_hash || "")}
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, o.tx_hash || "", "tx")
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
      label: T("th-Time"),
      renderCell: (o: ITakerOrder) => (
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
  offer,
  offerLogo,
}: {
  order: ITakerOrder;
  offer: IOffer;
  offerLogo: string;
}) {
  const points = order.item_amount;
  const totalPoints = offer.item_amount;
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
  order: ITakerOrder;
  tokenInfo: IToken;
}) {
  const amount = useMemo(() => {
    return NP.divide(order.notional_value, 10 ** tokenInfo.decimals);
  }, [order.notional_value, tokenInfo]);

  return (
    <div className="flex items-center justify-end space-x-1">
      <span>{formatNum(amount)}</span>
      <Image src={tokenInfo.logoURI} width={16} height={16} alt="token" />
    </div>
  );
}
