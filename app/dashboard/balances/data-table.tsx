import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DataTable({
  data,
  handleGet,
}: {
  data: any[];
  handleGet: (row: any) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#eee]">
          <TableHead className="h-10 pl-0 text-lightgray">Token</TableHead>
          <TableHead className="h-10 text-lightgray">Amount</TableHead>
          <TableHead className="h-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((i) => (
          <TableRow className="border-none" key={i}>
            <TableCell className="py-[14px] pl-0">
              <div className="flex items-center">
                <Image
                  src="/icons/point.svg"
                  width={16}
                  height={16}
                  alt="point"
                />
                <div className="ml-1 text-sm leading-5 text-black">BNB</div>
              </div>
            </TableCell>
            <TableCell className="py-[14px] text-sm leading-5 text-black">
              300
            </TableCell>
            <TableCell className="py-[14px] text-right">
              <Button
                onClick={() => handleGet(i)}
                className="h-7 rounded-full border border-[#eee] hover:border-black"
              >
                Get
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
