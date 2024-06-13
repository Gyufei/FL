import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Image from "next/image";
import { ISettleMode } from "@/lib/types/maker-detail";
import { capitalize } from "lodash";

export const SettleModes: Array<ISettleMode> = ["protected", "turbo"];

export function SettleModeSelect({
  value,
  onValueChange,
  disabled = false,
}: {
  value: ISettleMode;
  onValueChange: (_v: ISettleMode) => void;
  disabled?: boolean;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleClickOpt(t: ISettleMode) {
    onValueChange(t);
    setPopOpen(false);
  }

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex items-center">
        <div className="mr-1 text-sm leading-6 text-black">Mode</div>
      </div>

      <div className="relative text-sm">
        <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
          <PopoverTrigger asChild>
            <div
              data-open={popOpen}
              data-disabled={disabled}
              className="flex h-[50px] w-full cursor-pointer  items-center justify-between space-x-1 rounded-xl border border-[#D3D4D6] px-[16px] outline-none data-[disabled=true]:pointer-events-none data-[open=true]:border-focus data-[disabled=true]:bg-[#f0f1f5]"
            >
              <div className="overflow-hidden text-clip whitespace-nowrap text-sm leading-5 text-black">
                {capitalize(value)}
              </div>
              <Image
                data-open={popOpen}
                src="/icons/arrow-down.svg"
                width={16}
                height={16}
                alt="arrow"
                className="data-[open=true]:rotate-180"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="z-[110] flex w-[143px] flex-col items-stretch border-0 bg-white p-1"
            style={{
              boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
            }}
          >
            {SettleModes.map((t) => (
              <div
                key={t}
                data-checked={value === t}
                className="flex cursor-pointer items-center rounded-xl px-3 py-2 data-[checked=true]:bg-[#FAFAFA]"
                onClick={() => handleClickOpt(t)}
              >
                <div
                  data-checked={value === t}
                  className="ml-[5px] text-xs leading-[18px] data-[checked=true]:text-black data-[checked=false]:text-gray"
                >
                  {capitalize(t)}
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
