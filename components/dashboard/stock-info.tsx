import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import { Input } from "../ui/input";
// import { GaugeComponent } from "./gauge";

export default function StockInfo() {
  const uid = 3098219;
  const name = "Autumn Phillips";
  const date = "Mar 4, 2024";

  const tradeVol = 10000;
  const profit = 10000;
  const makerOrders = 10000;
  const takerOrders = 10000;
  const valueToSettle = 10000;
  const taxIncome = 300;

  return (
    <div className="flex h-full flex-col px-4">
      {/* top header */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-xs leading-6 text-gray">UID {uid}</div>
          <div className="leading-6 text-black">{name}</div>
        </div>

        <div className="flex h-12 items-center space-x-2 rounded-full bg-[#fafafa] px-5 text-sm leading-5 text-black">
          <Image
            src="/icons/calendar.svg"
            width={24}
            height={24}
            alt="calendar"
          />
          <span>{date}</span>
        </div>
      </div>

      {/* overview */}
      <div className="mt-6 rounded-3xl bg-[#fafafa] p-5">
        <div className="leading-6 text-black">Account Overview</div>
        <div className="mt-5 flex justify-between">
          <div>
            <LabelText>Trade Vol.</LabelText>
            <div className="leading-6 text-black">${formatNum(tradeVol)}</div>
          </div>
          <div className="flex flex-col items-end">
            <LabelText>Profit</LabelText>
            <div
              data-loss={profit < 0}
              className="leading-6 data-[loss=true]:text-red data-[loss=false]:text-green"
            >
              {profit > 0 ? "+" : "-"} ${formatNum(tradeVol)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <LabelText>Maker Orders</LabelText>
            <div className="leading-6 text-black">{formatNum(makerOrders)}</div>
          </div>
          <div className="flex flex-col items-end">
            <LabelText>Profit</LabelText>
            <div className="leading-6 text-black">{formatNum(takerOrders)}</div>
          </div>
        </div>

        <div className="mt-5 flex justify-between">
          <div>
            <LabelText>Notional Value to Settle</LabelText>
            <div className="leading-6 text-black">
              ${formatNum(valueToSettle)}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <LabelText>Profit</LabelText>
            <div
              data-loss={taxIncome < 0}
              className="leading-6 data-[loss=true]:text-red data-[loss=false]:text-green"
            >
              {taxIncome > 0 ? "+" : "-"} ${formatNum(taxIncome)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 min-h-[210px]">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">Tadle XP</div>
        </div>
        {/* <GaugeComponent
          type="semicircle"
          arc={{
            colorArray: ["#00FF15", "#FF2121"],
            padding: 0.02,
            subArcs: [
              { limit: 40 },
              { limit: 60 },
              { limit: 70 },
              {},
              {},
              {},
              {},
            ],
          }}
          pointer={{ type: "blob", animationDelay: 0 }}
          value={50}
        /> */}
      </div>

      <div className="mt-16 mb-5">
        <div className="leading-[18px] text-gray">Your referral link</div>
        <div className="relative mt-2">
          <Input
            placeholder="https://"
            className="h-12 border-[#d4d4d4] pr-[52px] text-base focus:border-black"
          />
          <div className="absolute right-2 top-[13px] leading-[22px] text-lightgray">
            Copy
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return <div className="text-xs leading-[18px] text-gray">{children}</div>;
}
