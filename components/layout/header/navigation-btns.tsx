"use client";
import Image from "next/image";
import { useState } from "react";

export default function NavigationBtns() {
  const [activePath, setActivePath] = useState("");

  const isDashboard = activePath === "dashboard";
  const isMarketPlace = activePath === "marketplace";

  const handleClick = (path: string) => {
    setActivePath(path);
  };

  return (
    <div className="flex items-center space-x-5">
      <NavigationBtn
        active={isDashboard}
        icon="/icons/dashboard.svg"
        text="Dashboard"
        onClick={() => handleClick("dashboard")}
      />
      <NavigationBtn
        active={isMarketPlace}
        icon="/icons/Marketplace.svg"
        text="Marketplace"
        onClick={() => handleClick("marketplace")}
      />
    </div>
  );
}

function NavigationBtn({
  active,
  icon,
  text,
  onClick,
}: {
  active: boolean;
  icon: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <div
      data-active={active}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] data-[active=true]:w-fit data-[active=false]:cursor-pointer data-[active=true]:border-none data-[active=true]:bg-yellow data-[active=true]:px-6 data-[active=false]:hover:brightness-75"
      onClick={onClick}
    >
      <Image src={icon} width={24} height={24} alt={text} />
      {active && <div>{text}</div>}
    </div>
  );
}
