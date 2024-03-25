"use client";

import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { IMarketplace } from "@/lib/types/marketplace";
import TokenImg from "@/components/share/token-img";
import MarketplaceOverview from "@/components/share/market-place-overview";
import { useRouter } from "next/navigation";

export default function MarketplaceList() {
  const { data: marketplaceData } = useMarketplaces();

  return (
    <div className="mt-6 grid grid-cols-4 gap-x-5 gap-y-9 px-[120px]">
      {(marketplaceData || []).map((marketplace) => (
        <ItemCard key={marketplace.market_place_id} marketplace={marketplace} />
      ))}
    </div>
  );
}

function ItemCard({ marketplace }: { marketplace: IMarketplace }) {
  const router = useRouter();

  function handleGo() {
    router.push(`/marketplace?marketplaceId=${marketplace.market_place_id}`);
  }

  return (
    <div
      className="relative cursor-pointer rounded-3xl p-5 pt-3"
      onClick={handleGo}
      style={{
        background:
          "linear-gradient(180deg, #F0F1F5 0%, rgba(240, 241, 245, 0.5) 100%)",
      }}
    >
      <TokenImg
        tokenAddr={marketplace.token_mint}
        width={72}
        height={72}
        className="absolute -top-4 left-4 rounded-3xl"
      />

      <div className="flex items-start justify-between pl-20">
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <div className="text-lg leading-[26px] text-black">
              {marketplace.market_place_name}
            </div>
            <div className="text-xs leading-[18px] text-gray">
              <span>Spread:</span>
              <span>{marketplace.trade_spread}%</span>
            </div>
          </div>
        </div>

        <Image
          src="/icons/star.svg"
          width={20}
          height={20}
          alt="star"
          className="mt-[3px]"
        />
      </div>

      <MarketplaceOverview marketplace={marketplace} />
    </div>
  );
}
