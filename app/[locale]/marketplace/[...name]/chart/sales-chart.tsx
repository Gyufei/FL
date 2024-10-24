import NP from "number-precision";
import React, { useMemo, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { IMarketplace } from "@/lib/types/marketplace";
import { useSalesVolume } from "@/lib/hooks/api/use-sales-volume";
import { useWsMsgs } from "@/lib/hooks/api/use-ws-msgs";
import { useEffect } from "react";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export type IDurationType = "hour" | "day" | "week";

export const Durations: { name: string; value: IDurationType }[] = [
  {
    name: "1H",
    value: "hour",
  },
  {
    name: "1D",
    value: "day",
  },
  {
    name: "1W",
    value: "week",
  },
];

export default function SalesChart({
  marketplace,
  duration,
}: {
  marketplace: IMarketplace;
  duration: IDurationType;
}) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const marketplaceId = marketplace?.market_place_account;

  const { data: salesData, mutate } = useSalesVolume(
    marketplace.chain,
    marketplaceId,
  );
  const { msgEvents } = useWsMsgs(marketplace.chain);

  useEffect(() => {
    if (msgEvents.length > 0) {
      mutate();
    }
  }, [msgEvents]);

  const now = new Date().getTime();
  const oneHourDuration = 3600 * 1000;

  const chartData = useMemo(() => {
    const durationData = (salesData || []).filter((item) => {
      if (duration === "hour") {
        return item.create_at > now - oneHourDuration;
      }
      if (duration === "day") {
        return item.create_at > now - oneHourDuration * 24;
      }
      if (duration === "week") {
        return item.create_at > now - oneHourDuration * 24 * 7;
      }
    });

    const col = durationData.map((item) => {
      return [
        item.create_at,
        Number(NP.divide(NP.times(item.sales_volume, item.sales_price), 500)),
      ];
    });

    const line = durationData.map((item) => {
      return [item.create_at, Number(item.sales_price)];
    });

    const scatter = durationData.map((item) => {
      return [item.create_at, Number(item.sales_price)];
    });

    return {
      col,
      line,
      scatter,
    };
  }, [salesData, duration, now, oneHourDuration]);

  const xAxisOptions = useMemo(() => {
    if (duration === "hour") {
      return {
        min: now - oneHourDuration,
        dateTimeLabelFormats: {
          minute: "%H:%M",
        },
      };
    }

    if (duration === "day") {
      return {
        min: now - oneHourDuration * 24,
        // tickInterval: oneHourDuration,
        dateTimeLabelFormats: {
          hour: "%H:%M",
        },
      };
    }

    if (duration === "week") {
      return {
        min: now - oneHourDuration * 24 * 7,
        dateTimeLabelFormats: {
          day: "%e. %b",
        },
      };
    }
  }, [duration]);

  const options = useMemo<Options>(
    () => ({
      chart: {
        backgroundColor: "transparent",
        height: "249px",
      },
      time: {
        useUTC: false,
      },
      title: undefined,
      exporting: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        ...(xAxisOptions as any),
        tickAmount: 5,
        max: now,
        tickWidth: 0,
        title: undefined,
        lineColor: "#F0F1F5",
        lineWidth: 1,
        labels: {
          style: {
            color: "#99A0AF",
            fontSize: "12px",
          },
        },
        showFirstLabel: false,
      },
      yAxis: [
        {
          lineWidth: 1,
          lineColor: "#F0F1F5",
          min: 0,
          gridLineWidth: 0,
          title: undefined,
          tickWidth: 0,
          showFirstLabel: false,
          labels: {
            align: "left",
            x: 4,
            style: {
              color: "#99A0AF",
              fontSize: "12px",
            },
          },
          crosshairs: true,
        },
      ],
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
        shared: true,
        useHTML: true,
        headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
        pointFormat:
          '<tr><td style="color: {series.color}">{series.name} ' +
          "</td>" +
          '<td style="text-align: right"><b>{point.y} ETH</b></td></tr>',
        footerFormat: "</table>",
        valueDecimals: 2,
      },
      series: [
        {
          name: "Column",
          type: "column",
          color: "#D8F36B",
          column: {
            borderColor: "#D8F36B",
            borderWidth: 3,
            borderRadius: 40,
            shadow: true,
          },
          data: chartData?.col,
          // data: [
          //   [Date.now(), 150],
          //   [Date.now() - 10 * 60000, 150],
          //   [Date.now() - 20 * 60000, 50],
          //   [Date.now() - 30 * 60020, 250],
          //   [Date.now() - 40 * 60000, 350],
          //   [Date.now() - 50 * 60000, 350],
          // ],
        },
        {
          name: "Line",
          type: "line",
          data: chartData?.line,
          color: "#D8F36B",
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        {
          name: "Scatter",
          type: "scatter",
          marker: {
            symbol: "circle",
            fillColor: "transparent",
            lineColor: "#c0c4cc",
            lineWidth: 1,
            radius: 3,
          },
          data: chartData?.scatter,
        },
      ],
      accessibility: {
        enabled: false,
      },
    }),
    [xAxisOptions, chartData, now],
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
}
