import { NumericalInput } from "@/components/share/numerical-input";

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
    } else {
      onValueChange(v);
    }
  }

  function handleBlur() {
    if (!value) {
      onValueChange("");
    }
    if (Number(value) < 50) {
      onValueChange("50");
    }
  }

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex items-center">
        <div className="mr-1 text-sm leading-6 text-black">
          Settle Breach Fee
        </div>
      </div>

      <div className="relative text-sm">
        <NumericalInput
          className="h-[50px] w-full rounded-xl border border-[#d8d8d8] py-[14px] px-4 pr-[32px] focus:border-focus"
          placeholder="50%"
          value={value}
          onUserInput={handleInput}
          onBlur={handleBlur}
        />
        <div className="absolute right-4 top-[15px]">%</div>
      </div>
    </div>
  );
}
