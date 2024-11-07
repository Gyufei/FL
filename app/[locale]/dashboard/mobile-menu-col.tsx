"use client";
import Image from "next/image";
import { usePathname, Link } from "@/app/navigation";
import { useTranslations } from "next-intl";
export default function MobileMenuCol() {
  const pathname = usePathname();
  const dm = useTranslations("dashboard-module");

  return (
    <div
      className="fixed bottom-0 left-0 z-[999] flex h-14 w-full items-center justify-around bg-white sm:hidden"
      style={{
        boxShadow: "0px -10px 20px 0px rgba(14, 4, 62, 0.02)",
      }}
    >
      <MenuIcon
        href={`/dashboard/orders`}
        isActive={pathname === `/dashboard/orders`}
      >
        <Image src="/icons/menus.svg" width={24} height={24} alt="orders" />
        <span className="ml-2">{dm("menu-Orders")}</span>
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/holdings`}
        isActive={pathname === `/dashboard/holdings`}
      >
        <Image
          src="/icons/holdings.svg"
          width={24}
          height={24}
          alt="holdings"
        />
        <span className="ml-2">{dm("menu-Holdings")}</span>
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/balances`}
        isActive={pathname === `/dashboard/balances`}
      >
        <Image src="/icons/wallet.svg" width={24} height={24} alt="balances" />
        <span className="ml-2">{dm("menu-Balances")}</span>
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/referral`}
        isActive={pathname === `/dashboard/referral`}
      >
        <Image
          src="/icons/referral-system.svg"
          width={24}
          height={24}
          alt="referral"
        />
        <span className="ml-2">{dm("menu-Referral")}</span>
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
        className="flex flex-1 flex-col items-center justify-center gap-y-[2px] opacity-[0.4] data-[active=true]:opacity-[1]"
      >
        {children}
      </div>
    </Link>
  );
}
