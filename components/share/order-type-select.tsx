import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export type IOrderType = "ask" | "bid";

export const OfferTypes: { label: string; value: IOrderType }[] = [
  {
    label: "Sells / Asks",
    value: "ask",
  },
  {
    label: "Buys / Bids",
    value: "bid",
  },
];

export function OrderTypeSelect({
  types,
  handleTypeChange,
}: {
  types: Array<IOrderType>;
  handleTypeChange: (_ts: Array<IOrderType>) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  const currentTypeObj = useMemo(() => {
    if (types.length === 1) {
      return OfferTypes.find((t) => t.value === types[0]);
    } else {
      return {
        label: "Sells / Buys",
      };
    }
  }, [types]);

  function handleClickOpt(t: IOrderType) {
    if (types.includes(t)) {
      if (types.includes(t) && types.length === 2) {
        handleTypeChange(types.filter((_t) => _t !== t));
        setPopOpen(false);
      }
    } else {
      handleTypeChange([...types, t]);
      setPopOpen(false);
    }
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div
          data-open={popOpen}
          className="flex cursor-pointer items-center space-x-1 rounded-full border border-[#D3D4D6] px-[16px] py-[5px] outline-none data-[open=true]:border-none data-[open=true]:bg-yellow"
        >
          <Image
            src={types[0] === "ask" ? "/icons/buys.svg" : "/icons/sells.svg"}
            width={20}
            height={20}
            alt="type icon"
          />
          <div className="overflow-hidden text-clip whitespace-nowrap text-sm leading-5 text-black">
            {currentTypeObj?.label}
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
        className="flex w-[154px] flex-col items-stretch border-0 bg-white p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {OfferTypes.map((t) => (
          <div
            key={t.value}
            data-checked={types.includes(t.value)}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 data-[checked=true]:bg-[#FAFAFA]"
            onClick={() => handleClickOpt(t.value)}
          >
            {t.value === "ask" ? (
              <Image
                src={
                  types[0] === "ask"
                    ? "/icons/buys.svg"
                    : "/icons/buys-gray.svg"
                }
                width={20}
                height={20}
                alt="type icon"
              />
            ) : (
              <Image
                src={
                  t.value === "bid"
                    ? "/icons/sells.svg"
                    : "/icons/sells-gray.svg"
                }
                width={20}
                height={20}
                alt="type icon"
              />
            )}
            <div className="flex flex-1 items-center justify-between">
              <div
                data-checked={types.includes(t.value)}
                className="ml-[5px] text-xs leading-[18px] data-[checked=true]:text-black data-[checked=false]:text-gray"
              >
                {t.label}
              </div>
              <Checkbox
                checked={types.includes(t.value)}
                onCheckedChange={() => handleClickOpt(t.value)}
                className="rounded-full"
              />
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
