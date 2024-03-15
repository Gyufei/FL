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
    no: "883104",
    amount: 38400,
    amountPercent: 0.12,
    deposits: 2.61,
    token: {
      logoURI: "/icons/magic-eden.svg",
    },
    stableToken: {
      logoURI: "/icons/usdc.svg",
    },
    hash: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
    date: "22:33 Jan 4, 2023",
    eqToken: {
      name: "TBA",
      logoURI: "/icons/magic-eden.svg",
    },
  },
];

const orders = new Array(2).fill(data).flat();

export function TakerOrders() {
  return (
    <Table className="flex-1 text-xs leading-[18px]">
      <TableHeader className="text-gray">
        <TableRow className="border-none">
          <TableHead className="h-10 px-1 py-[6px]">Sub No.</TableHead>
          <TableHead className="h-10 px-1 py-[6px]">Fill Amount</TableHead>
          <TableHead className="h-10 px-1 py-[6px]">Deposits</TableHead>
          <TableHead className="h-10 px-1 py-[6px]">Eq.Token</TableHead>
          <TableHead className="h-10 px-1 py-[6px]">Tx Hash</TableHead>
          <TableHead className="h-10 px-1 py-[6px]">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((o) => (
          <TableRow
            key={o.no}
            className="border-[#eee] text-sm leading-5 text-black"
          >
            <TableCell className="px-1 py-[11px]">#{o.no}</TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center space-x-1">
                <div>
                  #{o.amount} ({o.amountPercent * 100}%)
                </div>
                <Image
                  src={o.token.logoURI}
                  width={16}
                  height={16}
                  alt="token"
                />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center space-x-1">
                <span>{o.deposits}</span>
                <Image
                  src={o.stableToken.logoURI}
                  width={12}
                  height={12}
                  alt="token"
                />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center space-x-1">
                <span>{o.eqToken.name}</span>
                <Image
                  src={o.eqToken.logoURI}
                  width={12}
                  height={12}
                  alt="token"
                />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center">
                {truncateAddr(o.hash)}
                <Image
                  src="/icons/right-45.svg"
                  width={16}
                  height={16}
                  alt="goScan"
                  className="cursor-pointer"
                />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">{o.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
