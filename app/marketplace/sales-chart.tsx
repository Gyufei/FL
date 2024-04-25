import React, { useMemo, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

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

export default function SalesChart({ duration }: { duration: IDurationType }) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const now = new Date().getTime();
  const twoMinutesDuration = 2 * 60 * 1000;
  const oneHourDuration = 3600 * 1000;
  const threeHoursDuration = 3 * oneHourDuration;

  const dayColData = new Array(20).fill(1).map((_, i) => {
    return [now - twoMinutesDuration * (24 - i), Math.floor(Math.random() * 5)];
  });

  const dayLinesData = new Array(20).fill(1).map((_, i) => {
    return [
      now - twoMinutesDuration * (24 - i),
      Math.floor(Math.random() * 50),
    ];
  });

  const dayScatterData = new Array(20).fill(1).map((_, i) => {
    return [
      now - twoMinutesDuration * (24 - i),
      Math.floor(Math.random() * 50),
    ];
  });

  const xAxisOptions = useMemo(() => {
    if (duration === "hour") {
      return {
        min: now - oneHourDuration,
        tickInterval: twoMinutesDuration,
        dateTimeLabelFormats: {
          minutes: "%M",
        },
      };
    }

    if (duration === "day") {
      return {
        min: now - oneHourDuration * 24,
        tickInterval: oneHourDuration,
      };
    }

    if (duration === "week") {
      return {
        min: now - oneHourDuration * 24 * 7,
        tickInterval: threeHoursDuration,
      };
    }
  }, []);

  const options = useMemo<Options>(
    () => ({
      chart: {
        backgroundColor: "transparent",
        height: "249px",
      },
      title: undefined,
      exporting: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        ...(xAxisOptions as any),
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
          data: dayColData,
          color: "#D8F36B",
          column: {
            borderColor: "#D8F36B",
            borderWidth: 3,
            borderRadius: 40,
            shadow: true,
          },
        },
        {
          name: "Line",
          type: "line",
          data: dayLinesData,
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
          data: dayScatterData,
        },
      ],
    }),
    [xAxisOptions],
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
}
