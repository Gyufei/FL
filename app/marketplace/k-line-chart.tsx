"use client";

import Image from "next/image";
import { useState } from "react";

type IChartType = "depth" | "sales";

type IDurationType = "hour" | "day" | "week";

const Durations: { name: string; value: IDurationType }[] = [
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

export default function KLineChart() {
  const [chartType, setChartType] = useState<IChartType>("sales");
  const [duration, setDuration] = useState<IDurationType>(Durations[0].value);

  function handleChangType(type: IChartType) {
    setChartType(type);
  }

  function handleChangeDuration(duration: IDurationType) {
    setDuration(duration);
  }

  return (
    <div className="rounded-3xl bg-[#FAFAFA] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[6px]">
          <ChartSwitch
            chartType={chartType}
            handleChangeType={handleChangType}
          />
          {chartType === "sales" && (
            <DurationSelect
              duration={duration}
              handleChangeDuration={handleChangeDuration}
            />
          )}
        </div>

        <div className="flex cursor-pointer items-center justify-center rounded-full p-[6px]">
          <Image src="/icons/extend.svg" width={20} height={20} alt="extend" />
        </div>
      </div>

      <div className="mt-5">
        <Image
          src="/img/chart.jpg"
          width={280}
          height={260}
          className="h-[260px]"
          alt="chart"
        />
      </div>
    </div>
  );
}

function ChartSwitch({
  chartType,
  handleChangeType,
}: {
  chartType: IChartType;
  handleChangeType: (_type: IChartType) => void;
}) {
  const isDepth = chartType === "depth";
  const isSales = chartType === "sales";
  return (
    <div className="flex space-x-1 rounded-full bg-[#F0F1F5] p-1">
      <div
        data-checked={isDepth}
        className="flex cursor-pointer items-center rounded-full bg-transparent data-[checked=true]:bg-[#FAFAFA] data-[checked=true]:px-3 data-[checked=false]:px-[6px] data-[checked=true]:py-[6px]"
        onClick={() => handleChangeType("depth")}
      >
        <Image
          src={isDepth ? "/icons/depth.svg" : "/icons/depth-gray.svg"}
          width={20}
          height={20}
          alt="depth"
        />
        {isDepth && (
          <div className="ml-[6px] text-sm leading-5 text-black">Depth</div>
        )}
      </div>
      <div
        data-checked={isSales}
        className="flex cursor-pointer items-center rounded-full bg-transparent data-[checked=true]:bg-[#FAFAFA] data-[checked=true]:px-3 data-[checked=false]:px-[6px] data-[checked=true]:py-[6px]"
        onClick={() => handleChangeType("sales")}
      >
        <Image
          src={isSales ? "/icons/sales.svg" : "/icons/sales-gray.svg"}
          width={20}
          height={20}
          alt="sales"
        />
        {isSales && (
          <div className="ml-[6px] text-sm leading-5 text-black">Sales</div>
        )}
      </div>
    </div>
  );
}

function DurationSelect({
  duration,
  handleChangeDuration,
}: {
  duration: string;
  handleChangeDuration: (_duration: IDurationType) => void;
}) {
  return (
    <div className="flex items-center space-x-1">
      {Durations.map((d) => (
        <div
          key={d.value}
          data-checked={duration === d.value}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm leading-5 text-gray data-[checked=true]:bg-white data-[checked=true]:text-black"
          onClick={() => handleChangeDuration(d.value)}
        >
          {d.name}
        </div>
      ))}
    </div>
  );
}