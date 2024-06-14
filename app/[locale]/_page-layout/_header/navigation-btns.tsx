"use client";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import Image from "next/image";
import { usePathname, useRouter } from "@/app/navigation";

export default function NavigationBtns() {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith(`/dashboard`);
  const isMarketPlace = pathname.startsWith(`/marketplace`);

  return (
    <div className="hidden flex-1 items-center space-x-5 sm:flex">
      <NavigationBtn
        active={isDashboard}
        icon="/icons/dashboard.svg"
        text="Dashboard"
        href={`/dashboard`}
        withWallet={true}
      />
      <NavigationBtn
        active={isMarketPlace}
        icon="/icons/Marketplace.svg"
        text="Marketplace"
        href={`/marketplace`}
        withWallet={false}
      />
    </div>
  );
}

function NavigationBtn({
  active,
  icon,
  text,
  href,
  withWallet = false,
}: {
  active: boolean;
  icon: string;
  text: string;
  href: string;
  withWallet?: boolean;
}) {
  const router = useRouter();

  function handleClick() {
    router.push(href);
  }

  const BtnContent = (
    <div
      data-active={active}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] data-[active=true]:w-fit data-[active=false]:cursor-pointer data-[active=true]:border-none data-[active=true]:bg-yellow data-[active=true]:px-6 data-[active=false]:hover:border-transparent data-[active=false]:hover:bg-yellow"
    >
      <Image
        src={icon}
        width={24}
        height={24}
        alt={text}
        data-active={active}
        className="data-[active=true]:mr-1"
      />
      {active && <div>{text}</div>}
    </div>
  );

  return withWallet ? (
    <WithWalletConnectBtn onClick={handleClick}>
      {BtnContent}
    </WithWalletConnectBtn>
  ) : (
    <div onClick={handleClick}>{BtnContent}</div>
  );
}
