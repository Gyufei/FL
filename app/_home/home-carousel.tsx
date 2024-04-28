"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { forwardRef } from "react";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useRouter } from "next/navigation";

export default function HomeCarousel() {
  const { data: marketplaceData } = useMarketplaces();

  return (
    <Carousel className="w-full px-6">
      <CarouselContent>
        {marketplaceData &&
          marketplaceData.map((marketplace) => (
            <CarouselItem key={marketplace.market_id}>
              <CarouselItem1 marketplace={marketplace} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function CarouselItem1({ marketplace }: { marketplace: IMarketplace }) {
  const buyAmount = 80.99;
  const sellAmount = 77.63;
  const sevenChange = 77;

  const router = useRouter();

  function handleGo() {
    router.push(`/marketplace/${marketplace.market_id}`);
  }

  return (
    <div className="relative flex h-[400px] w-full flex-col justify-end overflow-hidden rounded-3xl">
      <div
        className="absolute -top-[280px] z-0 h-[752px] w-full bg-no-repeat"
        style={{
          backgroundImage: "url('/img/carousel-bg-1.png')",
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div
        className="z-10 flex h-[200px] w-full items-stretch justify-between rounded-3xl px-12 py-[18px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, #FFFFFF 100%)",
        }}
      >
        <div className="flex flex-col items-start">
          <div className="text-2xl leading-9 text-black sm:text-4xl sm:leading-[54px]">
            {marketplace.market_name}
          </div>
          <div className="text-xs leading-[18px] text-gray sm:text-sm sm:leading-5">
            CARV IS BUILDING THE LARGEST GAMING CREDENTIAL INFRASTRUCTURE
          </div>
          <button
            onClick={handleGo}
            className="mt-5 rounded-2xl bg-yellow px-[29px] pt-[13px] pb-[11px] text-base text-black"
          >
            Trade {marketplace.market_name} Points
          </button>
        </div>

        <div className="mt-3 flex flex-col">
          <div className="flex items-center space-x-20">
            <div className="flex flex-col items-center">
              <div className="text-xl leading-[30px] text-green">
                {buyAmount}
              </div>
              <div className="text-xs leading-[18px] text-gray">Buy now</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xl leading-[30px] text-red">
                {sellAmount}
              </div>
              <div className="text-xs leading-[18px] text-gray">Sell now</div>
            </div>
          </div>

          <div className="mt-12 flex justify-between">
            <div className="flex items-center text-xs">
              <div className="mr-2 text-gray">24H VOL</div>
              <div className="text-black">{marketplace.vol_24h}</div>
            </div>
            <div className="flex items-center text-xs">
              <div className="mr-2 text-gray">7D Change</div>
              <div className="text-black">{sevenChange}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CarouselPrevious = forwardRef<HTMLButtonElement>(() => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      className="absolute top-[40%] left-10 h-12 w-12 cursor-pointer rounded-full border border-[#2D2E33]"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <Image src="/icons/arrow-left.svg" width={48} height={48} alt="next" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<HTMLButtonElement>(() => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      className="absolute top-[40%] right-10 h-12 w-12 cursor-pointer rounded-full"
      disabled={!canScrollNext}
      onClick={scrollNext}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Image
        src="/icons/arrow-left.svg"
        width={48}
        height={48}
        alt="next"
        className="rotate-180"
      />
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";
