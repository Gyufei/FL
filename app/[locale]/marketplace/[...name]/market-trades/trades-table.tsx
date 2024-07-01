import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatTimeDuration } from "@/lib/utils/time";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useMemo } from "react";
import { formatNum } from "@/lib/utils/number";
import { ITradeType } from "./trade-type-select";
import { useWsMsgs } from "@/lib/hooks/api/use-ws-msgs";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketTrades } from "@/lib/hooks/api/use-market-trades";
import { range, sortBy } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export function TradesTable({
  type,
  marketplace,
  isLoading,
}: {
  type: ITradeType;
  marketplace: IMarketplace | undefined;
  isLoading: boolean;
}) {
  const t = useTranslations("tb-MarketTrades");
  const { data: historyData, isLoading: isHistoryLoading } = useMarketTrades(
    marketplace?.market_place_id,
  );

  const isLoadingFlag = !marketplace || isLoading || isHistoryLoading;

  const { msgEvents } = useWsMsgs();

  const tradeMsgs = useMemo<any[]>(() => {
    const sortHistory = sortBy(historyData || [], "trade_at").reverse();
    const history = sortHistory.map((item: any) => {
      return {
        ...item,
        timestamp: item.trade_at * 1000,
      };
    });
    const msgAll = msgEvents.filter((msg) => !!msg);
    return msgAll.concat(history || []);
  }, [msgEvents, historyData]);

  const data = useMemo(() => {
    if (isLoadingFlag) {
      const nodes = range(6)
        .fill(0)
        .map((_: any) => {
          return {
            id: Math.floor(Math.random() * 100000),
          };
        });

      return {
        nodes,
      };
    }

    const trades = tradeMsgs.map((msg) => {
      const time = (Date.now() - msg.timestamp) / 1000;
      return {
        ...msg,
        time: time < 2 ? 2 : time,
        token: {
          logoURI: "/icons/usdc.svg",
        },
      };
    });

    const typeTrades = trades.filter(() => type === "All" || true);

    return {
      nodes: typeTrades,
    };
  }, [tradeMsgs, type, marketplace, isLoadingFlag]);

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 40px);
      grid-template-columns:  50px repeat(4, minmax(0, 1fr));
      font-weight: 400;

      &::-webkit-scrollbar {
        display: none;
      }
    `,
    Header: "",
    Body: "",
    BaseRow: `
    `,
    HeaderRow: `
      background: #fff;
    `,
    Row: ``,
    BaseCell: `
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;

      &:nth-of-type(n+3) {
        text-align: right;
      }

    `,
    HeaderCell: `
      color: #c0c4cc;
      border-bottom: 1px solid #eee;

      &:nth-of-type(3) {
        text-align: center;
      }
    `,
    Cell: `
      color: #2d2e33;
      height: 40px;

      &:nth-of-type(3) {
        text-align: right;
      }
    `,
  });

  const COLUMNS = [
    {
      label: "",
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[50px]" />
        ) : (
          <div>{formatTimeDuration(trade.time)}</div>
        ),
    },
    {
      label: t("th-ItemId"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[100px]" />
        ) : (
          <div>#{trade.item_id}</div>
        ),
    },
    {
      label: t("th-Value"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[50px]" />
        ) : (
          <div className="flex w-full items-center justify-end">
            <span>{formatNum(trade.value)}</span>
            <Image
              className="ml-1"
              src={trade.token.logoURI}
              width={12}
              height={12}
              alt="token"
            />
          </div>
        ),
    },
    {
      label: t("th-Amount"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[50px]" />
        ) : (
          <div>{formatNum(trade.amount)}</div>
        ),
    },
    {
      label: t("th-Buyer"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[60px]" />
        ) : (
          <div>{truncateAddr(trade.buyer)}</div>
        ),
    },
  ];

  return (
    <div className="relative flex w-full flex-1 shrink grow flex-col border-b border-[#eee]">
      <Image
        src="/icons/time.svg"
        width={16}
        height={16}
        alt="time"
        className="absolute left-0 top-[10px] z-10"
      />
      <div className="max-h-auto relative w-full flex-1 flex-col overflow-y-hidden pb-0">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-1 flex-col">
          <CompactTable
            columns={COLUMNS}
            data={data}
            theme={theme}
            layout={{ fixedHeader: true }}
          />
        </div>
      </div>
    </div>
  );
}
