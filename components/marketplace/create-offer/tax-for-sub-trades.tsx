import { NumericalInput } from "@/components/share/numerical-input";
import { WithTip } from "./with-tip";

export default function TaxForSubTrades({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (_v: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex items-center">
        <div className="mr-1 text-sm leading-6 text-black">
          Tax for Sub Trades
        </div>
        <WithTip></WithTip>
      </div>

      <div className="relative text-sm">
        <NumericalInput
          className="h-[50px] w-full rounded-xl border border-[#d8d8d8] p-[14px] focus:border-black"
          placeholder="1%"
          value={value}
          onUserInput={onValueChange}
        />
        <div className="absolute right-4 top-[15px]">%</div>
      </div>
    </div>
  );
}
