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

export function TradesTable({
  type,
  marketplace,
}: {
  type: ITradeType;
  marketplace: IMarketplace;
}) {
  const { msgEvents } = useWsMsgs();

  const tradeMsgs = useMemo(() => {
    const msgAll = msgEvents.filter((msg) => !!msg);
    return msgAll;
  }, [msgEvents]);

  const data = useMemo(() => {
    const trades = tradeMsgs
      .filter((msg) => msg.market_id === marketplace?.market_place_id)
      .map((msg) => {
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
  }, [tradeMsgs, type, marketplace]);

  const theme = useTheme({
    Table: `
      height: 250px;
      grid-template-rows: 40px repeat(auto-fit, 40px);
      grid-template-columns:  30px repeat(4, minmax(0, 1fr));
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

      &:nth-child(n+3) {
        text-align: right;
      }

      &:nth-child(3) {
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
    `,
  });

  const COLUMNS = [
    {
      label: "",
      renderCell: (trade: any) => <div>{formatTimeDuration(trade.time)}</div>,
    },
    {
      label: "Item Id",
      renderCell: (trade: any) => <div>#{trade.item_id}</div>,
    },
    {
      label: "Value",
      renderCell: (trade: any) => (
        <div className="flex items-center justify-center">
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
      label: "Amount",
      renderCell: (trade: any) => <div>{formatNum(trade.amount)}</div>,
    },
    {
      label: "Buyer",
      renderCell: (trade: any) => <div>{truncateAddr(trade.buyer)}</div>,
    },
  ];

  return (
    <div className="overflow-y- relative h-[250px] w-full flex-1 border-b border-[#eee] pb-[10px]">
      <Image
        src="/icons/time.svg"
        width={16}
        height={16}
        alt="time"
        className="absolute left-0 top-[10px] z-10"
      />
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ fixedHeader: true }}
      />
    </div>
  );
}
