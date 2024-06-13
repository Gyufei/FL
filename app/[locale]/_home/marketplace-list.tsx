"use client";

import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { IMarketplace } from "@/lib/types/marketplace";
import MarketplaceOverview from "@/components/share/market-place-overview";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function MarketplaceList() {
  const { data: marketplaceData } = useMarketplaces();

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="text-[40px] leading-10 text-black">Trending Projects</div>
      <div className="mt-6 flex w-full flex-col items-start gap-x-5 gap-y-9 px-4 py-5 sm:grid sm:grid-cols-4 sm:flex-row sm:items-stretch sm:overflow-x-hidden">
        {(marketplaceData || []).map((marketplace) => (
          <ItemCard key={marketplace.market_id} marketplace={marketplace} />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ marketplace }: { marketplace: IMarketplace }) {
  const locale = useLocale();
  const router = useRouter();

  function handleGo() {
    router.push(`${locale}/marketplace/${marketplace.market_id}`);
  }

  return (
    <div
      className="relative min-w-[calc(95vw)] cursor-pointer rounded-3xl p-5 pt-3 sm:w-auto sm:min-w-fit"
      onClick={handleGo}
      style={{
        background:
          "linear-gradient(180deg, #F0F1F5 0%, rgba(240, 241, 245, 0.5) 100%)",
      }}
    >
      <Image
        src={marketplace.projectLogo}
        width={72}
        height={72}
        className="absolute -top-4 left-4 rounded-3xl"
        alt="marketplace"
      />

      <div className="flex items-start justify-between pl-20">
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <div className="w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[20px] text-black">
              {marketplace.market_name}
            </div>
            {/* <div className="text-xs leading-[18px] text-gray">
              <span>Spread:</span>
              <span>{marketplace.trade_spread}%</span>
            </div> */}
          </div>
        </div>

        {/* <Image
          src="/icons/star.svg"
          width={20}
          height={20}
          alt="star"
          className="mt-[3px]"
        /> */}
      </div>

      <MarketplaceOverview marketplace={marketplace} />
    </div>
  );
}
