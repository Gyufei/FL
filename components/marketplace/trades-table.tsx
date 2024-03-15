import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateAddr } from "@/lib/utils/web3";

const data = [
  {
    time: 60,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    seller: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
  {
    time: 21,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    seller: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
  {
    time: 3600,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    seller: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
];

const trades = new Array(10).fill(data).flat();

function formatTime(seconds: number) {
  const secs = seconds % 60;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${secs}s`;
  }
}

export function TradesTable() {
  return (
    <Table className="text-xs leading-[18px]">
      <TableHeader className="text-gray">
        <TableRow className="border-[#d8d8d8]">
          <TableHead className="w-5 px-1 py-[11px]">
            <Image src="/icons/time.svg" width={16} height={16} alt="time" />
          </TableHead>
          <TableHead className="px-1 py-[11px]">No.</TableHead>
          <TableHead className="px-1 py-[11px]">Value</TableHead>
          <TableHead className="px-1 py-[11px]">Seller</TableHead>
          <TableHead className="px-1 py-[11px]">Buyer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.map((trade) => (
          <TableRow key={trade.no} className="border-none">
            <TableCell className="px-1 py-[11px] text-gray">
              {formatTime(trade.time)}
            </TableCell>
            <TableCell className="px-1 py-[11px]">#{trade.no}</TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center">
                <span>{trade.value}</span>
                <Image
                  src={trade.token.logoURI}
                  width={12}
                  height={12}
                  alt="token"
                />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              {truncateAddr(trade.seller)}
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              {truncateAddr(trade.buyer)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
