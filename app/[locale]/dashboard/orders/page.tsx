"use client";
import { useState } from "react";
import {
  IOfferType,
  OfferTypeSelect,
} from "@/components/share/offer-type-select";
import { OrderTable } from "./order-table";
import { FilterSelect, IRole, IStatus, Roles, Status } from "./filter-select";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { NetworkSelect } from "@/components/share/network-select";

export default function MyOrders() {
  const T = useTranslations("page-MyOrders");
  const [orderTypes, setOrderTypes] = useState<Array<IOfferType>>(["sell"]);
  const [status, setStatus] = useState<IStatus>(Status[0]);
  const [role, setRole] = useState<IRole>(Roles[0]);
  const [selectedChain, setSelectedChain] = useState<ChainType>(ChainType.ETH);

  function handleTypeChange(t: Array<IOfferType>) {
    setOrderTypes(t);
  }

  function handleRoleChange(r: IRole) {
    setRole(r);
  }

  function handleStatusChange(s: IStatus) {
    setStatus(s);
  }

  function handleChainChange(chain: ChainType) {
    setSelectedChain(chain);
  }

  return (
    <div className="ml-5 flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="text-xl leading-[30px] text-black">
            {T("cap-MyOrders")}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <NetworkSelect
            selectedChain={selectedChain}
            handleChainChange={handleChainChange}
          />
          <OfferTypeSelect
            types={orderTypes}
            handleTypeChange={handleTypeChange}
          />
          <FilterSelect
            role={role}
            status={status}
            setRole={handleRoleChange}
            setStatus={handleStatusChange}
          />
        </div>
      </div>
      <div className="relative mt-5 flex flex-1 flex-col justify-end border-t border-[#eee]">
        <OrderTable
          chain={selectedChain}
          types={orderTypes}
          status={status}
          role={role}
        />
      </div>
    </div>
  );
}
