"use client";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import Image from "next/image";
import { usePathname, useRouter } from "@/app/navigation";
import { useTranslations } from "next-intl";

export default function NavigationBtns() {
  const t = useTranslations("Header");
  const pathname = usePathname();

  const isDashboard = pathname.startsWith(`/dashboard`);
  const isMarketPlace = pathname.startsWith(`/marketplace`);
  const pointPattern = /\/marketplace\/[a-zA-Z]+/;
  const isPoint = pointPattern.test(pathname);

  const router = useRouter();

  function handleClick(href: string) {
    router.push(href);
  }

  return (
    <div className="hidden flex-1 items-center space-x-5 sm:flex">
      <WithWalletConnectBtn
        shouldSignIn={true}
        onClick={() => handleClick(`/dashboard`)}
      >
        <div>
          <div
            data-active={isDashboard}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] data-[active=true]:w-fit data-[active=false]:cursor-pointer data-[active=true]:border-none data-[active=true]:bg-yellow data-[active=true]:px-6 data-[active=false]:hover:border-transparent data-[active=false]:hover:bg-yellow"
          >
            <Image
              src="/icons/dashboard.svg"
              width={24}
              height={24}
              alt="dashboard"
              data-active={isDashboard}
              className="data-[active=true]:mr-1"
            />
            {isDashboard && <div>{t("btn-Dashboard")}</div>}
          </div>
        </div>
      </WithWalletConnectBtn>

      <div className="relative flex items-center">
        <div
          onClick={() => handleClick(`/marketplace`)}
          data-active={isMarketPlace}
          className="z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#D3D4D6] data-[active=true]:w-fit data-[active=false]:cursor-pointer data-[active=true]:border-none data-[active=true]:bg-yellow data-[active=true]:px-6 data-[active=false]:hover:border-transparent data-[active=false]:hover:bg-yellow"
          style={{
            borderRight: isPoint ? "2px solid #fff" : "1px solid #e0ff62",
          }}
        >
          <Image
            src="/icons/Marketplace.svg"
            width={24}
            height={24}
            alt="marketplace"
            data-active={isMarketPlace}
            className="data-[active=true]:mr-1"
          />
          {isMarketPlace && <div>{t("btn-Marketplace")}</div>}
        </div>
        {isPoint && (
          <div className="z-1 absolute -right-[100px] flex h-12 cursor-pointer items-center justify-center rounded-full border border-yellow bg-yellow pl-[64px] pr-6">
            <div className="flex items-center space-x-1 text-gray">
              <div>Point</div>
              <Image
                src="/icons/arrow-down-gray.svg"
                width={16}
                height={16}
                alt="arrow"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
