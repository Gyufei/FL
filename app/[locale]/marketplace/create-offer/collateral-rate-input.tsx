import { NumericalInput } from "@/components/share/numerical-input";
import { useTranslations } from "next-intl";

export default function CollateralRateInput({
  value,
  disabled = false,
  onValueChange,
}: {
  value: string;
  disabled?: boolean;
  onValueChange: (_v: string) => void;
}) {
  const cot = useTranslations("drawer-CreateOffer");

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
    if (Number(value) < 100) {
      onValueChange("100");
    }
  }

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex items-center">
        <div className="mr-1 text-sm leading-6 text-black">
          {cot("cap-CollateralRate")}
        </div>
      </div>

      <div className="relative text-sm">
        <NumericalInput
          disabled={disabled}
          className="h-[50px] w-full rounded-xl border border-[#d8d8d8] py-[14px] px-4 pr-[32px] focus:border-focus disabled:bg-[#f0f1f5]"
          placeholder="100%"
          value={value}
          onUserInput={handleInput}
          onBlur={handleBlur}
        />
        <div className="absolute right-4 top-[15px]">%</div>
      </div>
    </div>
  );
}
