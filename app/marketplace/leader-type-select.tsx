import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export type ILeaderType = "Tax Income" | "Maker Orders" | "Trading Vol";
const TradeTypes: ILeaderType[] = ["Tax Income", "Maker Orders", "Trading Vol"];

export function LeaderTypeSelect({
  type,
  handleTypeChange,
}: {
  type: ILeaderType;
  handleTypeChange: (_t: ILeaderType) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleClickOpt(t: ILeaderType) {
    handleTypeChange(t);
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center justify-end space-x-1 rounded-full py-[5px] outline-none">
          <div className="text-xs leading-5 text-gray">{type}</div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-down-gray.svg"
            width={16}
            height={16}
            alt="arrow"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[110px] flex-col items-stretch border-0 bg-white p-1 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
      >
        {TradeTypes.map((t) => (
          <div
            key={t}
            data-checked={type === t}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 data-[checked=true]:bg-[#FAFAFA]"
            onClick={() => handleClickOpt(t)}
          >
            <div
              data-checked={type === t}
              className="ml-[5px] text-xs leading-[18px] data-[checked=true]:text-black data-[checked=false]:text-gray"
            >
              {t}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
