import { format } from "date-fns";
import { GaugeComponent } from "./gauge";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export function TadleXp() {
  const T = useTranslations("ct-Rank");

  const xp = 660;
  const rank = 10;
  const updateAt = new Date().getTime();
  const value = 10;
  const maxValue = 100;

  const ticks = useMemo(() => {
    const step = maxValue / 20;
    const result = [];

    for (let i = 1; i < 20; i++) {
      result.push(i * step);
    }

    const res = result.map((item) => ({
      value: item,
    }));

    return res;
  }, []);

  return (
    <div className="min-h-[210px]">
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 rounded-lg bg-yellow"></div>
        <div className="leading-6 text-black">Tadle XP</div>
      </div>
      <div className="relative mt-4">
        <GaugeComponent
          type="semicircle"
          marginInPercent={{
            top: 0.02,
            right: 0.04,
            left: 0.04,
            bottom: 0.02,
          }}
          arc={{
            colorArray: ["#FF6162", "#FFD95C", "#FFA95B", "#4DBF87"],
            padding: 0.02,
            cornerRadius: 14,
            subArcs: [
              { limit: 40 },
              { limit: 60 },
              { limit: 70 },
              { limit: 90 },
            ],
          }}
          pointer={{ type: "blob", animationDelay: 0, color: "#fff" }}
          value={value}
          maxValue={maxValue}
          labels={{
            valueLabel: {
              hide: true,
            },
            tickLabels: {
              type: "inner",
              hideMinMax: true,
              ticks: ticks,
              defaultTickValueConfig: {
                hide: true,
              },
              defaultTickLineConfig: {
                distanceFromArc: 7,
                width: 4,
                length: 1,
              },
            },
          }}
        />
        <div className="absolute top-[75px] flex w-full flex-col items-center">
          <div className="text-4xl leading-[54px] text-black">{xp}</div>
          <div className="flex items-center text-sm leading-5">
            <div className="mr-1 text-gray">{T("txt-YourRank")}</div>
            <div className="text-black">{rank}</div>
          </div>
          <div className="text-xs leading-[18px] text-gray">
            {T("txt-UpdatedOn")} {format(updateAt, "LLL dd")}
          </div>
        </div>
      </div>
    </div>
  );
}
