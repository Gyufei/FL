import React, { useMemo, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export default function SalesChart(props: any) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

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
        minPadding: 0,
        maxPadding: 0,
        tickWidth: 0,
        tickLength: 0,
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
      yAxis: {
        lineWidth: 1,
        lineColor: "#F0F1F5",
        min: 0,
        gridLineWidth: 0,
        title: undefined,
        tickWidth: 0,
        tickLength: 0,
        tickPosition: "inside",
        showFirstLabel: false,
        labels: {
          align: "left",
          x: 4,
          style: {
            color: "#99A0AF",
            fontSize: "12px",
          },
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        column: {
          pointPadding: 0.8, // Adjust the height of the column
          groupPadding: 0.1,
        },
      },
      tooltip: {
        shared: true,
        crosshairs: true,
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
          data: [5, 10, 15, 20, 25],
        },
        {
          name: "Line",
          type: "line",
          data: [25, 20, 15, 10, 5],
          yAxis: 0,
        },
        {
          name: "Scatter",
          type: "scatter",
          marker: {
            symbol: "circle",
            fillColor: "red",
            lineColor: "black",
            lineWidth: 2,
            radius: 8,
          },
          data: [
            [1, 12],
            [3, 14],
            [5, 16],
            [7, 18],
          ],
          yAxis: 0,
        },
      ],
    }),
    [],
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
}
