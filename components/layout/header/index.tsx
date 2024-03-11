import Image from "next/image";
import ConnectBtn from "./connect-btn";
import NetworkSelect from "./network-select";
import NavigationBtns from "./navigation-btns";

export default function Header() {
  return (
    <>
      <div className="flex h-24 items-center justify-between p-6">
        <NavigationBtns />
        <Logo />
        <div className="flex items-center justify-end space-x-4 md:space-x-6">
          <NetworkSelect />
          <ConnectBtn />
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <div className="flex items-center justify-center justify-self-center">
      <Image src="/icons/logo.svg" alt="logo" width={75} height={20} />
    </div>
  );
}
