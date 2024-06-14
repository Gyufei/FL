import Image from "next/image";
import NewestItemCard from "./newest-item-card";

export default function HomeBanner() {
  return (
    <div
      className="flex h-[680px] flex-col items-center pt-[156px]"
      style={{
        backgroundImage: "url(/img/home/home-bg-1.png)",
      }}
    >
      <div className="relative hidden text-[50px] leading-[72px] text-black sm:flex sm:flex-col">
        Decentralized Pre-market Infrastructure
        <Image
          src="/img/home/home-title-path.png"
          width={220}
          height={160}
          alt="home title path"
          className="absolute left-[90px] top-[66px]"
        />
      </div>
      <div className="flex justify-center text-center text-[40px] leading-[60px] text-black sm:hidden">
        The First Pre SuperMarket
      </div>

      <div className="mt-10 hidden text-xl leading-[30px] text-lightgray sm:flex">
        Bridging liquidity between primary and secondary markets
      </div>
      <div className="mt-[10px] block text-sm leading-[20px] text-lightgray sm:hidden">
        FASTEST DATA · DEEPEST LIQUIDITY · FUN REWARDS
      </div>

      <div className="mt-10 flex w-full flex-col items-center space-x-5 px-4 sm:w-fit sm:flex-row sm:px-0">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-yellow text-lg leading-6 sm:w-[160px]">
          Getting started
        </div>
        <div className="mt-[22px] flex cursor-pointer items-center space-x-1 sm:mt-0">
          <div className="text-lg leading-6 text-black">Read the docs</div>
          <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
        </div>
      </div>

      <NewestItemCard />
    </div>
  );
}
