"use client";
import Image from "next/image";
import ConnectBtn from "./connect-btn";
import { NetworkSelect } from "./network-select";
import NavigationBtns from "./navigation-btns";
import MessageBtn from "./message-btn";
import MobileRouterMenu from "./mobile-router-menu";
import Link from "next/link";
import { usePathname } from "@/app/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <>
        <MobileLogo />
        <div className="flex h-14 items-center justify-between px-4 py-2 sm:absolute sm:top-0 sm:h-24 sm:w-full sm:px-6 sm:py-6">
          {/* pc */}
          <NavigationBtns />
          <Logo />
          <div className="hidden flex-1 items-center justify-end space-x-4 sm:flex md:space-x-6"></div>

          {/* Mobile */}
          <div className="flex flex-1 items-center justify-between sm:hidden">
            <div></div>
            <Link href="/">
              <div className="flex h-11 cursor-pointer items-center justify-center sm:hidden">
                <div className="flex h-6 items-center justify-center rounded-full bg-yellow">
                  <Image
                    src="/icons/logo.svg"
                    alt="logo"
                    width={75}
                    height={20}
                  />
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <MobileRouterMenu />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileLogo />
      <div className="flex h-14 items-center justify-between  px-4 py-2 sm:h-24 sm:px-6 sm:py-6">
        {/* pc */}
        <NavigationBtns />
        <Logo />
        <div className="hidden flex-1 items-center justify-end space-x-4 sm:flex md:space-x-6">
          <NetworkSelect />
          <ConnectBtn />
          <MessageBtn />
        </div>

        {/* Mobile */}
        <div className="flex flex-1 items-center justify-between sm:hidden">
          <div className="flex items-center space-x-4">
            <ConnectBtn />
            <MobileRouterMenu />
          </div>
        </div>
      </div>
    </>
  );
}

function MobileLogo() {
  return (
    <Link href="/">
      <div className="flex h-11 cursor-pointer items-center justify-center sm:hidden">
        <div className="flex h-6 w-[70px] items-center justify-center rounded-full bg-yellow">
          <Image src="/icons/logo.svg" alt="logo" width={37.5} height={10} />
        </div>
      </div>
    </Link>
  );
}

function Logo() {
  return (
    <Link href="/">
      <div className="mx-4 hidden flex-1 cursor-pointer items-center justify-center justify-self-center sm:flex">
        <Image src="/icons/logo.svg" alt="logo" width={75} height={20} />
      </div>
    </Link>
  );
}
