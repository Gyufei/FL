import { formatNum } from "@/lib/utils/number";

export default function TotalBanner() {
  const totalGmv = 9291210;
  const totalValueLocked = 9291210;
  const activeUser = 291918;

  return (
    <div className="mt-5 flex flex-col items-center py-10">
      <div className="text-4xl leading-[54px] text-black">
        The First Pre SuperMarket
      </div>
      <div className="leading-5 text-lightgray">
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
    <div className="relative flex w-[300px] flex-col items-center justify-center py-5">
      <div className="z-10 text-4xl leading-[54px] text-black">{value}</div>
      <div
        className="absolute top-[42%] z-0 h-4 w-[128px] rounded-md"
        style={{
          background:
            "linear-gradient(270deg, rgba(224, 255, 98, 0) 0%, #E0FF62 100%)",
        }}
      ></div>
      <div className="text-lg leading-5 text-gray">{label}</div>
    </div>
  );
}
