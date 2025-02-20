"use client";
import Image from "next/image";
import { usePathname, Link } from "@/app/navigation";

export default function MenuCol() {
  const pathname = usePathname();

  return (
    <div className="mt-[70px] hidden flex-col space-y-5 sm:flex">
      <MenuIcon
        href={`/dashboard/orders`}
        isActive={pathname === `/dashboard/orders`}
      >
        <Image src={pathname === `/dashboard/orders` ? "/icons/menus-white.svg" : "/icons/menus.svg"} width={24} height={24} alt="orders" />
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/holdings`}
        isActive={pathname === `/dashboard/holdings`}
      >
        <Image
          src={pathname === `/dashboard/holdings` ? "/icons/holdings-white.svg" : "/icons/holdings.svg"}
          width={24}
          height={24}
          alt="holdings"
        />
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/balances`}
        isActive={pathname === `/dashboard/balances`}
      >
        <Image src={pathname === `/dashboard/balances` ? "/icons/wallet-white.svg" : "/icons/wallet.svg"} width={24} height={24} alt="balances" />
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/referral`}
        isActive={pathname === `/dashboard/referral`}
      >
        <Image
          src={pathname === `/dashboard/referral` ? "/icons/referral-system-white.svg" : "/icons/referral-system.svg"}
          width={24}
          height={24}
          alt="referral"
        />
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
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-theme data-[active=true]:bg-theme"
      >
        {children}
      </div>
    </Link>
  );
}
