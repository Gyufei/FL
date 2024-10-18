"use client";

import NP from "number-precision";
import { useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { range } from "lodash";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { formatNum } from "@/lib/utils/number";
import { format } from "date-fns";
import useTge from "@/lib/hooks/marketplace/useTge";
import { useRouter } from "@/app/navigation";
import { IMarketplace } from "@/lib/types/marketplace";
import { ChainConfigs } from "@/lib/const/chain-config";

export default function PointMarket({ className }: { className?: string }) {
  const t = useTranslations("page-MarketList");

  const router = useRouter();

  const { data, isLoading: isLoadingFlag } = useMarketplaces();

  const { checkIsDuringTge } = useTge();

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
      renderCell: (item: IMarketplace) => {
        const chainInfo = ChainConfigs[item.chain];
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
            onClick={() => handleGo(item.market_symbol)}
          >
            <TokenPairImg
              src1={item?.projectLogo}
              src2={chainInfo.logo}
              width1={32}
              height1={32}
              width2={14}
              height2={14}
            />
            <div className="ml-3 flex flex-col">
              <div className="text-sm leading-5 text-black">
                {item.market_name}
              </div>
              <div className="text-[10px] leading-4 text-gray">#{item.id}</div>
            </div>
          </div>
        );
      },
    },
    {
      label: t("th-LastPrice"),
      renderCell: (item: IMarketplace) => {
        const lastPrice = item.last_price || 0;
        const lastPrice24hAgo = item.last_price_24h_ago || 0;
        const lastPricePercent =
          Number(lastPrice24hAgo) === 0
            ? 0
            : NP.divide(NP.minus(lastPrice, lastPrice24hAgo), lastPrice24hAgo);
        return isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[150px]" />
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={Number(item.last_price)} />
            <PercentText num={lastPricePercent * 100} />
          </div>
        );
      },
    },
    {
      label: t("th-Vol24h"),
      renderCell: (item: IMarketplace) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={Number(item.vol_24h)} />
            <PercentText num={Number(item.change_rate_24h)} />
          </div>
        ),
    },
    {
      label: t("th-TotalVol"),
      renderCell: (item: IMarketplace) => {
        const total = Number(item.total_vol);
        const h24Change = Number(item.vol_24h);

        const totalPercent =
          total === 0
            ? 0
            : total === h24Change
            ? 1
            : NP.divide(h24Change || 0, total - h24Change);

        return isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={Number(item.total_vol)} />
            <PercentText num={totalPercent * 100} />
          </div>
        );
      },
    },
    {
      label: t("th-SetterStarts"),
      renderCell: (item: IMarketplace) =>
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
                  {format(Number(item.tge) * 1000, "dd/MM/yyyy")}
                </div>
                <div className="text-[10px] leading-4 text-gray">
                  {format(Number(item.tge) * 1000, "HH:mm a")}
                </div>
              </>
            )}
          </div>
        ),
    },
    {
      label: t("th-SetterEnds"),
      renderCell: (item: IMarketplace) =>
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
      renderCell: (item: IMarketplace) =>
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

  if (!tableData.nodes.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-base text-gray">
        {t("txt-NoMarketData")}
      </div>
    );
  }

  return (
    <div className={cn(className, "flex flex-1 flex-col")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">{t("cap-PointMarket")}</div>
        </div>
      </div>
      <div className="max-h-auto relative min-h-[296px] w-full flex-1 flex-col overflow-y-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col">
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
      className="text-[10px] leading-4 data-[greater=false]:text-red data-[greater=true]:text-green data-[greater=zero]:text-black"
    >
      {Number(num) === 0
        ? "0"
        : `${isGreater ? "+" : "-"}${Math.abs(num).toFixed(2)}`}
      %
    </div>
  );
}
