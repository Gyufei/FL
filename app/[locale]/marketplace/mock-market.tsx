"use client";

// import Image from "next/image";
import { useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { range } from "lodash";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { formatNum } from "@/lib/utils/number";
import { format } from "date-fns";
import useTge from "@/lib/hooks/marketplace/useTge";
import { useRouter } from "@/app/navigation";

export default function MockMarket({ className }: { className?: string }) {
  const t = useTranslations("page-MarketList");

  const router = useRouter();

  const { data, isLoading: isLoadingFlag } = useMarketplaces();

  const { checkIsDuringTge } = useTge();

  const { currentChainInfo } = useCurrentChain();

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 64px);
      grid-template-columns: repeat(7,minmax(0,1fr)),
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
      font-size: 14px;
      font-weight: normal;

      text-align: right;

      &:first-of-type {
        text-align: left;
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
      height: 64px;
    `,
  });

  const tableData = useMemo(() => {
    if (isLoadingFlag) {
      const nodes = range(4)
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

    const nodes = (data || [])
      .filter((m) => m.status !== "offline")
      .map((item: any, index: number) => {
        return {
          id: index + 1,
          ...item,
        };
      });

    return {
      nodes,
    };
  }, [data, isLoadingFlag]);

  function handleGo(marketId: string) {
    const path = `/marketplace/${marketId}`;

    router.push(path);
  }

  const COLUMNS = [
    {
      label: t("th-Asset"),
      renderCell: (item: any) => {
        return isLoadingFlag ? (
          <div className="flex items-center">
            <Skeleton className="h-[32px] w-[32px] rounded-full" />
            <div className="ml-3 flex flex-col">
              <Skeleton className="h-[18px] w-[100px]" />
              <Skeleton className="mt-2 h-[16px] w-[80px]" />
            </div>
          </div>
        ) : (
          <div
            className="flex cursor-pointer items-center pl-2"
            onClick={() => handleGo(item.market_id)}
          >
            <TokenPairImg
              src1={item?.projectLogo}
              src2={currentChainInfo.logo}
              width1={32}
              height1={32}
              width2={14}
              height2={14}
            />
            <div className="ml-3 flex flex-col">
              <div className="text-sm leading-5 text-black">
                {item.market_name}
              </div>
              <div className="text-[10px] leading-4 text-gray">#{12}</div>
            </div>
          </div>
        );
      },
    },
    {
      label: t("th-LastPrice"),
      renderCell: (_item: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[150px]" />
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={233.566} />
            <PercentText num={-12.34} />
          </div>
        ),
    },
    {
      label: t("th-Vol24h"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={item.vol_24h} />
            <PercentText num={item.change_rate_24h} />
          </div>
        ),
    },
    {
      label: t("th-TotalVol"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={item.total_vol} />
            <PercentText num={-12.34} />
          </div>
        ),
    },
    {
      label: t("th-SetterStarts"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            {item.tge === "0" ? (
              <div>TBA</div>
            ) : (
              <>
                <div className="text-sm leading-5 text-black">
                  {format(item.tge * 1000, "dd/MM/yyyy")}
                </div>
                <div className="text-[10px] leading-4 text-gray">
                  {format(item.tge * 1000, "HH:mm a")}
                </div>
              </>
            )}
          </div>
        ),
    },
    {
      label: t("th-SetterEnds"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            {item.tge === "0" ? (
              <div>TBA</div>
            ) : (
              <>
                <div className="text-sm leading-5 text-black">
                  {format(
                    (Number(item.tge) + Number(item.settlement_period)) * 1000,
                    "dd/MM/yyyy",
                  )}
                </div>
                <div className="text-[10px] leading-4 text-gray">
                  {format(
                    (Number(item.tge) + Number(item.settlement_period)) * 1000,
                    "HH:mm a",
                  )}
                </div>
              </>
            )}
          </div>
        ),
    },
    {
      label: t("th-Countdown"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="text-sm leading-5 text-black">
            {checkIsDuringTge(item.tge, Number(item.settlement_period))
              ? ""
              : t("txt-NotStarted")}
          </div>
        ),
    },
  ];

  return (
    <div className={cn(className, "flex flex-1 flex-col")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">{t("cap-MockMarket")}</div>
        </div>
      </div>
      <div className="max-h-auto relative min-h-[296px] w-full flex-1 flex-col overflow-y-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-1 flex-col">
          <CompactTable
            columns={COLUMNS}
            data={tableData}
            theme={theme}
            layout={{ fixedHeader: true }}
          />
        </div>
      </div>
    </div>
  );
}

function PriceText({ num }: { num: number }) {
  return (
    <div className="text-sm leading-5 text-black ">${formatNum(num, 3)}</div>
  );
}

function PercentText({ num }: { num: number }) {
  const isGreater = num > 0;
  return (
    <div
      data-greater={Number(num) === 0 ? "zero" : isGreater}
      className="text-[10px] leading-4 data-[greater=zero]:text-black data-[greater=true]:text-green data-[greater=false]:text-red"
    >
      {num === 0 ? "0%" : `${isGreater ? "+" : "-"}${Math.abs(num).toFixed(2)}`}
      %
    </div>
  );
}
