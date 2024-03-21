import { NumericalInput } from "@/components/share/numerical-input";
import { ReactElement } from "react";

export function InputPanel({
  value,
  onValueChange,
  topText,
  bottomText,
  tokenSelect,
  isCanInput = true,
}: {
  value: string;
  onValueChange: (_v: string) => void;
  topText: ReactElement;
  bottomText: ReactElement;
  tokenSelect: ReactElement;
  isCanInput?: boolean;
}) {
  return (
    <div className="flex w-full justify-between rounded-2xl border border-transparent bg-[#fafafa] p-4 focus-within:border focus-within:border-focus">
      <div className="flex-1">
        <div className="text-xs leading-[18px] text-gray">{topText}</div>
        {isCanInput ? (
          <NumericalInput
            className="mt-2 mr-1 h-9 text-2xl placeholder:text-lightgray"
            placeholder="Enter Amount"
            value={value}
            onUserInput={onValueChange}
          />
        ) : (
          <div className="mt-2 h-9 text-2xl">{value}</div>
        )}
        <div className="text-xs leading-[18px] text-gray">{bottomText}</div>
      </div>
      <div className="flex items-end">{tokenSelect}</div>
    </div>
  );
}
