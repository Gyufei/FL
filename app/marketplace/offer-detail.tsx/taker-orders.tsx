import NP from "number-precision";
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
import { IOrder } from "@/lib/types/order";
import { IToken } from "@/lib/types/token";
import { useGoScan } from "@/lib/hooks/use-go-scan";
import { formatTimestamp } from "@/lib/utils/time";

export function TakerOrders({
  orders,
  offerLogo,
  forLogo,
  orderEqTokenInfo,
}: {
  orders: Array<IOrder>;
  offerLogo: string;
  forLogo: string;
  orderEqTokenInfo: IToken;
}) {
  const { handleGoScan } = useGoScan();

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
            key={o.order_id}
            className="border-[#eee] text-sm leading-5 text-black"
          >
            <TableCell className="px-1 py-[11px]">#{o.order_id}</TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center space-x-1">
                <div>
                  #{o.used_points} ({NP.divide(o.used_points, o.points) * 100}
                  %)
                </div>
                <Image src={offerLogo} width={16} height={16} alt="token" />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center space-x-1">
                <span>{o.amount}</span>
                <Image src={forLogo} width={12} height={12} alt="token" />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center space-x-1">
                <span>{orderEqTokenInfo.symbol}</span>
                <Image
                  src={orderEqTokenInfo.logoURI}
                  width={12}
                  height={12}
                  alt="token"
                />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              <div className="flex items-center">
                {truncateAddr(o.relist_tx_hash || o.order_tx_hash || "")}
                <Image
                  onClick={() =>
                    handleGoScan(
                      o.relist_tx_hash || o.order_tx_hash || "",
                      "tx",
                    )
                  }
                  src="/icons/right-45.svg"
                  width={16}
                  height={16}
                  alt="goScan"
                  className="cursor-pointer"
                />
              </div>
            </TableCell>
            <TableCell className="px-1 py-[11px]">
              {formatTimestamp(o.create_at)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
