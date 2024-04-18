import Image from "next/image";
import ConnectBtn from "./connect-btn";
import { MbNetworkSelect, NetworkSelect } from "./network-select";
import NavigationBtns from "./navigation-btns";
import MessageBtn from "./message-btn";
import MobileRouterMenu from "./mobile-router-menu";

export default function Header() {
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
          <MbNetworkSelect />
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
    <div className="flex h-11 items-center justify-center sm:hidden">
      <div className="flex h-6 w-[70px] items-center justify-center rounded-full bg-yellow">
        <Image src="/icons/logo.svg" alt="logo" width={37.5} height={10} />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="hidden flex-1 items-center justify-center justify-self-center sm:flex">
      <Image src="/icons/logo.svg" alt="logo" width={75} height={20} />
    </div>
  );
}
