import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import FeeDisplay from "./fee-display";

export default function OrderNoteAndFee({
  value,
  onValueChange,
  type,
}: {
  value: string;
  onValueChange: (_v: string) => void;
  type: "buy" | "sell";
}) {
  const [showInput, setShowInput] = useState(false);

  function handleInputNote(v: string) {
    if (v.length > 50) {
      return;
    }

    onValueChange(v);
  }

  function handleShowInput(val: boolean) {
    setShowInput(val);
    if (!val) {
      onValueChange("");
    }
  }

  return (
    <div className="mt-4 flex flex-col">
      <div className="mb-2 flex items-center space-x-1">
        <div className="mr-[6px]  text-sm leading-6 text-black">Order Note</div>
        <Checkbox
          checked={showInput}
          onCheckedChange={(v) => handleShowInput(!!v)}
          className="rounded-full"
        />
      </div>
      {showInput && (
        <>
          <div className="relative">
            <Textarea
              value={value}
              onChange={(e) => handleInputNote(e.target.value)}
              placeholder={`Anything you want to inform the ${
                type === "buy" ? "seller" : "buyer"
              }...`}
              className="h-[66px] rounded-xl border border-[#d8d8d8] focus:border-focus"
            />
            <div className="absolute right-4 bottom-2 text-xs leading-[18px] text-gray">
              {value.length} / 50
            </div>
          </div>
          <FeeDisplay />
        </>
      )}
    </div>
  );
}
