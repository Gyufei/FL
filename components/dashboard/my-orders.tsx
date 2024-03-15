import Image from "next/image";
import { useState } from "react";
import { IOfferType, OfferTypeSelect } from "../share/offer-type-select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrderTable } from "./order-table";

type IOrderType = "Maker" | "Taker";
const Types: Array<IOrderType> = ["Maker", "Taker"];
type IStatus = "Virgin" | "Ongoing" | "Canceled" | "Finished";
const Status: Array<IStatus> = ["Virgin", "Ongoing", "Canceled", "Finished"];

export default function MyOrders() {
  const [offerType, setOfferType] = useState<IOfferType>("buy");

  function handleTypeChange(t: IOfferType) {
    setOfferType(t);
  }

  const [orderType, setOrderType] = useState<IOrderType>(Types[0]);
  const [status, setStatus] = useState<IStatus>(Status[0]);

  function handleOrderTypeChange(t: IOrderType) {
    setOrderType(t);
  }

  function handleStatusChange(s: IStatus) {
    setStatus(s);
  }

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="text-xl leading-[30px] text-black">My Orders</div>
          <OfferTypeSelect
            type={offerType}
            handleTypeChange={handleTypeChange}
          />
        </div>
        <div className="flex items-center space-x-6">
          <TypeSelect type={orderType} setType={handleOrderTypeChange} />
          <StatusSelect status={status} setStatus={handleStatusChange} />
        </div>
      </div>
      <div className="mt-5 flex-1 border-t border-[#eee]">
        <OrderTable />
      </div>
    </div>
  );
}

function TypeSelect({
  type,
  setType,
}: {
  type: IOrderType;
  setType: (t: IOrderType) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleTypeChange(t: IOrderType) {
    setType(t);
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <div className="flex items-center">
          <div className="text-xs leading-[18px] text-gray">Type</div>
          <div className="ml-1 mr-2 pr-[4px] text-sm leading-5 text-black">
            {type}
          </div>
          <Image src="/icons/down.svg" width={16} height={16} alt="arrow" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[100px] flex-col items-stretch border-0 bg-white p-2 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
      >
        {Types.map((t) => (
          <div
            data-active={type === t}
            key={t}
            onClick={() => handleTypeChange(t)}
            className="flex h-8 cursor-pointer items-center rounded-xl px-3 text-sm text-gray data-[active=true]:bg-[#f5f6f7] data-[active=true]:text-black"
          >
            {t}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function StatusSelect({
  status,
  setStatus,
}: {
  status: IStatus;
  setStatus: (t: IStatus) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleStatusChange(s: IStatus) {
    setStatus(s);
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <div className="flex items-center">
          <div className="text-xs leading-[18px] text-gray">Status</div>
          <div className="ml-1 mr-2 pr-[4px] text-sm leading-5 text-black">
            {status}
          </div>
          <Image src="/icons/down.svg" width={16} height={16} alt="arrow" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[100px] flex-col items-stretch border-0 bg-white p-2 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
      >
        {Status.map((s) => (
          <div
            data-active={status === s}
            key={s}
            onClick={() => handleStatusChange(s)}
            className="flex h-8 cursor-pointer items-center rounded-xl px-3 text-sm text-gray data-[active=true]:bg-[#f5f6f7] data-[active=true]:text-black"
          >
            {s}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
