import Image from "next/image";

export default function MenuCol({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (m: string) => void;
}) {
  return (
    <div className="mt-[70px] flex flex-col  space-y-5">
      <MenuIcon
        onClick={() => setActiveMenu("stocks")}
        isActive={activeMenu === "stocks"}
      >
        <Image src="/icons/stocks.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon
        onClick={() => setActiveMenu("orders")}
        isActive={activeMenu === "orders"}
      >
        <Image src="/icons/menus.svg" width={24} height={24} alt="orders" />
      </MenuIcon>
      <MenuIcon
        onClick={() => setActiveMenu("wallet")}
        isActive={activeMenu === "wallet"}
      >
        <Image src="/icons/wallet.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon
        onClick={() => setActiveMenu("stats")}
        isActive={activeMenu === "stats"}
      >
        <Image src="/icons/stats.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon
        onClick={() => setActiveMenu("referral")}
        isActive={activeMenu === "referral"}
      >
        <Image src="/icons/referral.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
    </div>
  );
}

function MenuIcon({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      data-active={isActive}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-yellow data-[active=true]:bg-yellow"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
