import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatTimeDuration } from "@/lib/utils/time";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useEffect, useMemo, useState } from "react";
import { formatNum } from "@/lib/utils/number";
import { ITradeType } from "./trade-type-select";
import { useWsMsgs } from "@/lib/hooks/api/use-ws-msgs";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketTrades } from "@/lib/hooks/api/use-market-trades";
import { range, sortBy } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useTokens } from "@/lib/hooks/api/token/use-tokens";

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
    marketplace?.market_place_account,
  );

  const { data: tokens } = useTokens();
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

    const allMsg = msgAll.concat(history || []).map((item: any) => {
      const token = tokens?.find((token) => token.address === item.token_mint);

      return {
        ...item,
        token: token || item.token,
      };
    });

    return allMsg;
  }, [msgEvents, historyData, tokens]);

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
        id: Math.floor(Math.random() * 100000),
        ...msg,
        time: time < 2 ? 2 : time,
      };
    });

    const typeTrades = trades.filter(() => type === "All" || true);

    const tableData =
      typeTrades.length > 30 ? typeTrades.slice(0, 30) : typeTrades;
    return {
      nodes: tableData,
    };
  }, [tradeMsgs, type, isLoadingFlag]);

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

      &:nth-of-type(3) {
        text-align: center;
      }
    `,
    HeaderCell: `
      color: #c0c4cc;
      border-bottom: 1px solid #eee;
    `,
    Cell: `
      color: #2d2e33;
      height: 40px;

      &:nth-of-type(3) {
        text-align: center;
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
          <TimeDisplay time={trade.time} />
        ),
    },
    {
      label: t("th-ItemId"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[80px]" />
        ) : (
          <div>#{trade.item_id}</div>
        ),
    },
    {
      label: t("th-Value"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[100px]" />
        ) : (
          <div className="flex w-full items-center justify-end pr-4">
            <span>{formatNum(trade.token_amount)}</span>
            {trade.token && (
              <Image
                className="ml-1 rounded-full"
                src={trade.token?.logoURI}
                width={12}
                height={12}
                alt="token"
              />
            )}
          </div>
        ),
    },
    {
      label: t("th-Amount"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[50px]" />
        ) : (
          <div>{formatNum(trade.amount, 2, true)}</div>
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
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col">
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

function TimeDisplay({ time }: { time: number }) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (time > 3600) {
      setDuration(formatTimeDuration(time));
      return;
    }

    const interval = setInterval(() => {
      setDuration(formatTimeDuration(time));
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return <div>{duration}</div>;
}
