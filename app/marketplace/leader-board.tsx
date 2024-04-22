"use client";

import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatNum } from "@/lib/utils/number";
import { ILeaderType, LeaderTypeSelect } from "./leader-type-select";
import { useMemo, useState } from "react";
import { IRangeType, LeaderRangeSelect } from "./leader-range-select";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useTaxIncome } from "@/lib/hooks/api/use-tax-income";
import { sortBy } from "lodash";
import { useMakerOrders } from "@/lib/hooks/api/use-maker-orders";
import { useTradingVol } from "@/lib/hooks/api/use-trading-vol";

export default function LeaderBoard() {
  const [leaderType, setLeaderType] = useState<ILeaderType>("Tax Income");
  const [timeRange, setTimeRange] = useState<IRangeType>("hour");

  const { data: taxIncomeData } = useTaxIncome(timeRange);
  const { data: makerOrdersData } = useMakerOrders(timeRange);
  const { data: tradingVolData } = useTradingVol(timeRange);

  function handleTradeTypeChange(t: ILeaderType) {
    setLeaderType(t);
  }

  function handleRangeTypeChange(r: IRangeType) {
    setTimeRange(r);
  }

  const data = useMemo(() => {
    switch (leaderType) {
      case "Tax Income":
        return taxIncomeData;
      case "Maker Orders":
        return makerOrdersData;
      case "Trading Vol":
        return tradingVolData;
    }
  }, [leaderType, taxIncomeData, makerOrdersData, tradingVolData]);

  const theme = useTheme({
    Table: `
      height: 250px;
      grid-template-rows: 40px repeat(auto-fit, 40px);
      grid-template-columns: 50px 150px 1fr;
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
    Row: `
    `,
    BaseCell: `
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;

      &:first-of-type {
        text-align: left;
      }

      &:nth-of-type(3) {
        text-align: right;
      }
    `,
    HeaderCell: `
      color: #c0c4cc;
      &:first-of-type {
        padding-left: 8px;
      }
      border-bottom: 1px solid #eee;
    `,
    Cell: `
      color: #2d2e33;
      height: 40px;
    `,
  });

  const tableData = useMemo(() => {
    const nodes = sortBy(data || [], ["amount"])
      .reverse()
      .map((item: any, index: number) => {
        return {
          id: index + 1,
          no: index + 1,
          wallet: item.wallet,
          amount: item.amount,
        };
      });
    return {
      nodes,
    };
  }, [data]);

  const COLUMNS = [
    {
      label: "#",
      renderCell: (item: any) => {
        if (Number(item.no) === 1) {
          return (
            <Image src="/icons/one.svg" width={24} height={24} alt="reward" />
          );
        }
        if (Number(item.no) === 2) {
          return (
            <Image src="/icons/two.svg" width={24} height={24} alt="reward" />
          );
        }
        if (Number(item.no) === 3) {
          return (
            <Image src="/icons/three.svg" width={24} height={24} alt="reward" />
          );
        }

        return <div className="pl-2">{item.no}</div>;
      },
    },
    {
      label: "Wallet",
      renderCell: (item: any) => (
        <div>
          {truncateAddr(item.wallet, {
            nPrefix: 4,
            nSuffix: 4,
          })}
        </div>
      ),
    },
    {
      label: leaderType !== "Maker Orders" ? "Amount" : "Count",
      renderCell: (item: any) => (
        <div>
          {leaderType === "Maker Orders"
            ? formatNum(item.count || 0)
            : `$${formatNum(item.amount)}`}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">Leaderboard</div>
        </div>
        <LeaderTypeSelect
          type={leaderType}
          handleTypeChange={handleTradeTypeChange}
        />
        <LeaderRangeSelect
          type={timeRange}
          handleTypeChange={handleRangeTypeChange}
        />
      </div>
      <div className="h-[250px] w-full flex-1 overflow-y-hidden  pb-[10px]">
        <CompactTable
          columns={COLUMNS}
          data={tableData}
          theme={theme}
          layout={{ fixedHeader: true }}
        />
      </div>
    </div>
  );
}
