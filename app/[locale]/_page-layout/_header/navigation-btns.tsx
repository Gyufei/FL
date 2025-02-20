"use client";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import Image from "next/image";
import { usePathname, useRouter } from "@/app/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getGoMissionsAppUrl } from "@/lib/utils/jump-url";
import { Link } from "@/app/navigation";
import HoverIcon from "@/components/share/hover-icon";

export default function NavigationBtns() {
  const t = useTranslations("Header");
  const pathname = usePathname();

  const isDashboard = pathname.startsWith(`/dashboard`);
  const isMarketPlace = pathname.startsWith(`/market/gems`);

  const router = useRouter();
  const locale = useLocale();

  function handleClick(href: string) {
    router.push(href);
  }

  return (
    <div className="hidden flex-1 items-center space-x-5 sm:flex">
      <WithWalletConnectBtn onClick={() => handleClick(`/dashboard`)}>
        <div>
          <div
            data-active={isDashboard}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] data-[active=true]:w-fit data-[active=false]:cursor-pointer data-[active=true]:border-none data-[active=true]:bg-theme data-[active=true]:px-6 data-[active=false]:hover:border-transparent data-[active=false]:hover:bg-theme"
          >
            <HoverIcon
              src={isDashboard ? "/icons/dashboard-white.svg" : "/icons/dashboard.svg"}
              hoverSrc="/icons/dashboard-white.svg"
              width={24}
              height={24}
              alt="dashboard"
              data-active={isDashboard}
              className="data-[active=true]:mr-1"
            />
            {isDashboard && <div className="text-white">{t("btn-Dashboard")}</div>}
          </div>
        </div>
      </WithWalletConnectBtn>
      <div className="relative flex items-center">
        <div
          onClick={() => handleClick(`/market/gems`)}
          data-active={isMarketPlace}
          className="z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] data-[active=true]:w-fit data-[active=false]:cursor-pointer data-[active=true]:border-theme data-[active=true]:bg-theme data-[active=true]:px-6 data-[active=false]:hover:border-transparent data-[active=false]:hover:bg-theme"
        >
          <HoverIcon
            src={isMarketPlace ? "/icons/Marketplace-white.svg" : "/icons/Marketplace.svg"}
            hoverSrc="/icons/Marketplace-white.svg"
            width={24}
            height={24}
            alt="marketplace"
            data-active={isMarketPlace}
            className="cursor-pointer data-[active=true]:mr-1"
          />
          {isMarketPlace && <div className="text-white">{t("btn-Marketplace")}</div>}
        </div>
      </div>

      <div className="relative flex items-center">
        <Link
          href={getGoMissionsAppUrl("/missions", locale)}
          className="z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] cursor-pointer hover:border-transparent hover:bg-theme"
        >
          <HoverIcon
            src="/icons/task.svg"
            hoverSrc="/icons/task-white.svg"
            width={24}
            height={24}
            alt="missions"
            className="cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
