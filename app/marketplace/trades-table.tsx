import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatTimeDuration } from "@/lib/utils/time";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useMemo } from "react";
import { formatNum } from "@/lib/utils/number";

const data = [
  {
    id: 1,
    time: 60,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    amount: 12312,
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
  {
    id: 2,
    time: 21,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    amount: 12312,
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
  {
    id: 3,
    time: 3600,
    no: "883104",
    value: 2.61,
    token: {
      logoURI: "/icons/eth.svg",
    },
    amount: 12312,
    buyer: "61djCzB4Vq37RFt3vDUr7cu7hZpmtdPBvYwsV9VLaiNi",
  },
];

const trades = new Array(10)
  .fill(data)
  .flat()
  .map((item, index) => ({ ...item, id: index }));

export function TradesTable() {
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
    `,
    Cell: `
      color: #2d2e33;
      height: 40px;
    `,
  });

  const data = useMemo(() => {
    return {
      nodes: trades,
    };
  }, []);

  const COLUMNS = [
    {
      label: "",
      renderCell: (trade: any) => <div>{formatTimeDuration(trade.time)}</div>,
    },
    {
      label: "Item Id",
      renderCell: (trade: any) => <div>#{trade.no}</div>,
    },
    {
      label: "Value",
      renderCell: (trade: any) => (
        <div className="flex items-center justify-center">
          <span>{trade.value}</span>
          <Image src={trade.token.logoURI} width={12} height={12} alt="token" />
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
