import { NumericalInput } from "@/components/share/numerical-input";
import { WithTip } from "./with-tip";

export default function TaxForSubTrades({
  value,
  onValueChange,
  disabled = false,
}: {
  value: string;
  onValueChange: (_v: string) => void;
  disabled?: boolean;
}) {
  function handleInput(v: string) {
    if (Number(v) > 20) {
      onValueChange("20");
    } else {
      onValueChange(v);
    }
  }

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
          disabled={disabled}
          className="h-[50px] w-full rounded-xl border border-[#d8d8d8] p-[14px] focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
          placeholder="1%"
          value={value}
          onUserInput={handleInput}
        />
        <div className="absolute right-4 top-[15px]">%</div>
      </div>
    </div>
  );
}
