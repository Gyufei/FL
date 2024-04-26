import { NumericalInput } from "@/components/share/numerical-input";
import { WithTip } from "./with-tip";

export default function SettleBreachFee({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (_v: string) => void;
}) {
  function handleInput(v: string) {
    if (v && Number(v) < 1) {
      onValueChange("1");
    } else if (Number(v) > 100) {
      onValueChange("100");
    } else {
      onValueChange(v);
    }
  }

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex items-center">
        <div className="mr-1 text-sm leading-6 text-black">
          Settle Breach Fee
        </div>
        <WithTip></WithTip>
      </div>

      <div className="relative text-sm">
        <NumericalInput
          className="h-[50px] rounded-xl border border-[#d8d8d8] p-[14px] pr-[30px] focus:border-focus"
          placeholder="50%"
          value={value}
          onUserInput={handleInput}
        />
        <div className="absolute right-4 top-[15px]">%</div>
      </div>
    </div>
  );
}
