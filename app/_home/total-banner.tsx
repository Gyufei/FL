import { formatNum } from "@/lib/utils/number";

export default function TotalBanner() {
  const totalGmv = 9291210;
  const totalValueLocked = 9291210;
  const activeUser = 291918;

  return (
    <div className="mt-5 flex flex-col items-center py-10">
      <div className="text-2xl leading-9 text-black sm:text-4xl sm:leading-[54px]">
        The First Pre SuperMarket
      </div>
      <div className="text-xs leading-[18px] text-lightgray sm:text-base sm:leading-5">
        FASTEST DATA · DEEPEST LIQUIDITY · FUN REWARDS
      </div>
      <div className="mt-4 flex flex-wrap justify-center space-y-2">
        <TotalCard value="1000×" label="Financial Efficiency" />
        <TotalCard
          value={`$${formatNum(totalGmv, 2, true)}`}
          label="Total GMV"
        />
        <TotalCard
          value={`$${formatNum(totalValueLocked, 2, true)}`}
          label="Total Value Locked"
        />
        <TotalCard value={`$${formatNum(activeUser)}`} label="Active Users" />
      </div>
    </div>
  );
}

function TotalCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative flex w-[50%] flex-col items-center justify-center py-5 sm:w-[300px]">
      <div className="z-10 text-2xl leading-9 text-black sm:text-4xl sm:leading-[54px]">
        {value}
      </div>
      <div
        className="absolute top-[48%] z-0 h-1 w-[64px] rounded-md sm:top-[42%] sm:h-4 sm:w-[128px]"
        style={{
          background:
            "linear-gradient(270deg, rgba(224, 255, 98, 0) 0%, #E0FF62 100%)",
        }}
      ></div>
      <div className="text-xs leading-[18px] text-gray sm:text-lg sm:leading-5">
        {label}
      </div>
    </div>
  );
}
