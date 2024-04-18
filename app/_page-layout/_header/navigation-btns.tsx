"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBtns() {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isMarketPlace = pathname.startsWith("/marketplace");

  return (
    <div className="hidden flex-1 items-center space-x-5 sm:flex">
      <NavigationBtn
        active={isDashboard}
        icon="/icons/dashboard.svg"
        text="Dashboard"
        href="/dashboard"
      />
      <NavigationBtn
        active={isMarketPlace}
        icon="/icons/Marketplace.svg"
        text="Marketplace"
        href="/marketplace"
      />
    </div>
  );
}

function NavigationBtn({
  active,
  icon,
  text,
  href,
}: {
  active: boolean;
  icon: string;
  text: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div
        data-active={active}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] data-[active=true]:w-fit data-[active=false]:cursor-pointer data-[active=true]:border-none data-[active=true]:bg-yellow data-[active=true]:px-6 data-[active=false]:hover:brightness-75"
      >
        <Image src={icon} width={24} height={24} alt={text} />
        {active && <div>{text}</div>}
      </div>
    </Link>
  );
}
