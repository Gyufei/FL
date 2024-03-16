"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuCol() {
  const pathname = usePathname();

  return (
    <div className="mt-[70px] flex flex-col  space-y-5">
      <MenuIcon
        href="/dashboard/my-stocks"
        isActive={pathname === "/dashboard/my-stocks"}
      >
        <Image src="/icons/stocks.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon
        href="/dashboard/my-orders"
        isActive={pathname === "/dashboard/my-orders"}
      >
        <Image src="/icons/menus.svg" width={24} height={24} alt="orders" />
      </MenuIcon>
      <MenuIcon href="#" isActive={pathname === "/dashboard/wallet"}>
        <Image src="/icons/wallet.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon href="#" isActive={pathname === "/dashboard/stats"}>
        <Image src="/icons/stats.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon href="#" isActive={pathname === "/dashboard/referral"}>
        <Image src="/icons/referral.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
    </div>
  );
}

function MenuIcon({
  isActive,
  href,
  children,
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div
        data-active={isActive}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-yellow data-[active=true]:bg-yellow"
      >
        {children}
      </div>
    </Link>
  );
}
