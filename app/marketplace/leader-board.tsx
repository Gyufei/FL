"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateAddr } from "@/lib/utils/web3";
import { formatNum } from "@/lib/utils/number";
import { ILeaderType, LeaderTypeSelect } from "./leader-type-select";
import { useState } from "react";
import { IRangeType, LeaderRangeSelect } from "./leader-range-select";

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
    no: "2",
    wallet: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    amount: "123",
  },
];

const leader = new Array(2).fill(data).flat().slice(0, 5);

export default function LeaderBoard() {
  const [leaderType, setLeaderType] = useState<ILeaderType>("Tax Income");
  const [timeRange, setTimeRange] = useState<IRangeType>("1h");

  function handleTradeTypeChange(t: ILeaderType) {
    setLeaderType(t);
  }

  function handleRangeTypeChange(r: IRangeType) {
    setTimeRange(r);
  }

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
      <div className="no-scroll-bar max-h-[250px] w-full flex-1 overflow-y-auto border-b border-[#eee] pb-[10px]">
        <Table className="text-xs leading-[18px]">
          <TableHeader className="text-gray">
            <TableRow className="border-[#eee]">
              <TableHead className="h-10 w-5 px-1 py-[6px]">#</TableHead>
              <TableHead className="h-10 px-1 py-[6px]">Wallet</TableHead>
              <TableHead className="h-10 px-1 py-[6px]">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leader.map((row) => (
              <TableRow key={row.no} className="border-none">
                <TableCell className="px-1 py-[11px] text-gray">
                  {row.no}
                </TableCell>
                <TableCell className="px-1 py-[11px]">
                  {truncateAddr(row.wallet, {
                    nPrefix: 4,
                    nSuffix: 4,
                  })}
                </TableCell>
                <TableCell className="px-1 py-[11px]">
                  ${formatNum(row.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
