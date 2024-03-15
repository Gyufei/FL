"use client";
import { useState } from "react";
import MenuCol from "./menu-col";
import MyStocks from "./my-stocks";
import MyOrders from "./my-orders";

export default function MainContent() {
  const [activeMenu, setActiveMenu] = useState("orders");

  return (
    <div className="ml-4 flex flex-1 rounded-3xl bg-[#fafafa] p-5">
      <MenuCol activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {
        {
          stocks: <MyStocks />,
          orders: <MyOrders />,
          wallet: <div>Wallet</div>,
          stats: <div>Stats</div>,
        }[activeMenu]
      }
    </div>
  );
}
