"use client";
// import { GlobalMessageAtom } from "@/lib/states/global-message";
// import { useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function MenuCol() {
  const locale = useLocale();
  const pathname = usePathname();

  // const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  // function handleComingSoon() {
  //   setGlobalMessage({
  //     type: "success",
  //     message: "Coming soon",
  //   });
  // }

  return (
    <div className="mt-[70px] flex flex-col  space-y-5">
      <MenuIcon
        href={`${locale}/dashboard/orders`}
        isActive={pathname === `${locale}/dashboard/orders`}
      >
        <Image src="/icons/menus.svg" width={24} height={24} alt="orders" />
      </MenuIcon>
      <MenuIcon
        href={`${locale}/dashboard/stocks`}
        isActive={pathname === `${locale}/dashboard/stocks`}
      >
        <Image src="/icons/stocks.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon
        href={`${locale}/dashboard/balances`}
        isActive={pathname === `${locale}/dashboard/balances`}
      >
        <Image src="/icons/wallet.svg" width={24} height={24} alt="balances" />
      </MenuIcon>
      {/* <div
        onClick={handleComingSoon}
        data-active={false}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-yellow data-[active=true]:bg-yellow"
      >
        <Image src="/icons/compass.svg" width={24} height={24} alt="stocks" />
      </div>
      <div
        onClick={handleComingSoon}
        data-active={false}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-yellow data-[active=true]:bg-yellow"
      >
        <Image src="/icons/stats.svg" width={24} height={24} alt="stocks" />
      </div>
      <div
        onClick={handleComingSoon}
        data-active={false}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-yellow data-[active=true]:bg-yellow"
      >
        <Image src="/icons/referral.svg" width={24} height={24} alt="stocks" />
      </div> */}
      {/* <MenuIcon
        href="/dashboard/balances"
        isActive={pathname === "/dashboard/balances"}
      >
        <Image src="/icons/wallet.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon href="#" isActive={pathname === "/dashboard/stats"}>
        <Image src="/icons/stats.svg" width={24} height={24} alt="stocks" />
      </MenuIcon>
      <MenuIcon href="#" isActive={pathname === "/dashboard/referral"}>
        <Image src="/icons/referral.svg" width={24} height={24} alt="stocks" />
      </MenuIcon> */}
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
