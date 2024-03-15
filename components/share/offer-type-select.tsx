import { useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type IOfferType = "buy" | "sell";

export const OfferTypes: { label: string; value: IOfferType }[] = [
  {
    label: "Buys / Bids",
    value: "buy",
  },
  {
    label: "Sells / Asks",
    value: "sell",
  },
];

export function OfferTypeSelect({
  type,
  handleTypeChange,
}: {
  type: IOfferType;
  handleTypeChange: (_t: IOfferType) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  const currentTypeObj = OfferTypes.find((t) => t.value === type);

  function handleClickOpt(t: IOfferType) {
    handleTypeChange(t);
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div
          data-open={popOpen}
          className="flex cursor-pointer items-center space-x-1 rounded-full border border-[#D3D4D6] px-[16px] py-[5px] outline-none data-[open=true]:border-none data-[open=true]:bg-yellow"
        >
          <Image
            src={type === "buy" ? "/icons/buys.svg" : "/icons/sells.svg"}
            width={20}
            height={20}
            alt="type icon"
          />
          <div className="text-sm leading-5 text-black">
            {currentTypeObj?.label}
          </div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-left.svg"
            width={16}
            height={16}
            alt="arrow"
            className="data-[open=true]:rotate-90 data-[open=false]:-rotate-90"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-[154px] flex-col items-stretch border-0 bg-white p-1 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
      >
        {OfferTypes.map((t) => (
          <div
            key={t.value}
            data-checked={type === t.value}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 data-[checked=true]:bg-[#FAFAFA]"
            onClick={() => handleClickOpt(t.value)}
          >
            {t.value === "buy" ? (
              <Image
                src={
                  type === "buy" ? "/icons/buys.svg" : "/icons/buys-gray.svg"
                }
                width={20}
                height={20}
                alt="type icon"
              />
            ) : (
              <Image
                src={
                  t.value === "sell"
                    ? "/icons/sells.svg"
                    : "/icons/sells-gray.svg"
                }
                width={20}
                height={20}
                alt="type icon"
              />
            )}
            <div
              data-checked={type === t.value}
              className="ml-[5px] text-xs leading-[18px] data-[checked=true]:text-black data-[checked=false]:text-gray"
            >
              {t.label}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
