"use client";

import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatNum } from "@/lib/utils/number";
import { ILeaderType, LeaderTypeSelect } from "./leader-type-select";
import { useMemo, useState } from "react";
import { IRangeType, LeaderRangeSelect } from "./leader-range-select";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";

const data = [
  {
    no: "1",
    wallet: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    amount: "123",
  },
  {
    no: "2",
    wallet: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    amount: "123",
  },
  {
    no: "3",
    wallet: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    amount: "123",
  },
];

const leader = new Array(10)
  .fill(data)
  .flat()
  .map((i, idx) => {
    return {
      ...i,
      no: idx + 1,
    };
  });

export default function LeaderBoard() {
  const [leaderType, setLeaderType] = useState<ILeaderType>("Tax Income");
  const [timeRange, setTimeRange] = useState<IRangeType>("1h");

  function handleTradeTypeChange(t: ILeaderType) {
    setLeaderType(t);
  }

  function handleRangeTypeChange(r: IRangeType) {
    setTimeRange(r);
  }

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

      &:first-child {
        text-align: left;
      }

      &:nth-child(3) {
        text-align: right;
      }
    `,
    HeaderCell: `
      color: #c0c4cc;
      &:first-child {
        padding-left: 8px;
      }
    `,
    Cell: `
      color: #2d2e33;
      height: 40px;
    `,
  });

  const data = useMemo(() => {
    return {
      nodes: leader,
    };
  }, []);

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
      label: "Amount",
      renderCell: (item: any) => <div>${formatNum(item.amount)}</div>,
    },
  ];

  return (
    <div>
      <div className="mt-4 flex items-center justify-between">
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
      <div className="h-[250px] w-full flex-1 overflow-y-hidden border-b border-[#eee] pb-[10px]">
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={theme}
          layout={{ fixedHeader: true }}
        />
      </div>
    </div>
  );
}
