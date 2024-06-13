"use client";
import Image from "next/image";
// import { useState } from "react";

export default function GetStart() {
  // const [activeTab, setActiveTab] = useState("individuals");

  return (
    <div className="flex flex-col items-center bg-[rgba(224,255,98,0.1)] px-4 py-20 sm:px-[120px]">
      <div className="hidden text-[40px] leading-10 text-black sm:flex">
        How to get started with Tadle
      </div>
      <div className="flex text-[24px] leading-9 text-black sm:hidden">
        Product advantages
      </div>
      {/* <div className="mt-5 mb-[60px] flex items-center justify-between space-x-12">
        <div
          onClick={() => setActiveTab("individuals")}
          data-active={activeTab === "individuals"}
          className="border-0 border-b border-transparent pb-1 text-gray data-[active=true]:border-black data-[active=true]:text-black"
        >
          For Individuals
        </div>
        <div
          onClick={() => setActiveTab("developers")}
          data-active={activeTab === "developers"}
          className="border-0 border-b border-transparent pb-1 text-gray data-[active=true]:border-black data-[active=true]:text-black"
        >
          For Developers
        </div>
      </div>
      </div> */}
      <div className="flex flex-col items-center justify-between space-x-0 space-y-6 sm:flex-row sm:space-y-0 sm:space-x-10">
        <div className="flex flex-col">
          <div className="relative h-[280px] w-[374px] overflow-hidden rounded-[20px] bg-yellow px-[30px] pt-[40px] pb-6 pl-6">
            <div className="flex h-full flex-col justify-between">
              <div className="text-[40px] leading-9 text-black">01</div>
              <div>
                <div className="text-[22px] leading-6 text-[rgba(45,46,51,0.4)]">
                  Step 1
                </div>
                <div className="text-[24px] leading-9 text-black">
                  Connect to your wallet
                </div>
              </div>
            </div>

            <div className="absolute -right-[115px] -top-[115px] h-[230px] w-[230px] rounded-full bg-white"></div>
            <Image
              className="absolute right-6 top-6"
              src="/icons/home-wallet.svg"
              width={100}
              height={100}
              alt="wallet"
            />
            <div className="absolute -right-[3px] bottom-10 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Image
                src="/icons/right-arrow.svg"
                width={36}
                height={36}
                alt="go"
              />
            </div>
          </div>

          <div
            className="relative mt-10 h-[280px] w-[374px] overflow-hidden rounded-[20px] bg-white px-[30px] pt-[40px] pb-6 pl-6"
            style={{
              backgroundImage: "url(/img/home/home-search-project.png)",
              backgroundSize: "cover",
            }}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="text-[40px] leading-9 text-black">02</div>
                <Image
                  className="absolute right-6 top-6"
                  src="/icons/search-project.svg"
                  width={100}
                  height={100}
                  alt="wallet"
                />
              </div>
              <div>
                <div className="text-[22px] leading-6 text-[rgba(45,46,51,0.4)]">
                  Step 2
                </div>
                <div className="text-[24px] leading-9 text-black">
                  Search for the projects
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative h-[280px] w-[374px] overflow-hidden rounded-[20px] bg-white px-[30px] pt-[40px] pb-6 pl-6 sm:h-[400px]"
          style={{
            backgroundImage: "url(/img/home/home-buy-sell-order.png)",
            backgroundSize: "cover",
          }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-[40px] leading-9 text-black">03</div>
              <Image
                className="absolute right-6 top-6"
                src="/icons/buy-sell-order.svg"
                width={100}
                height={100}
                alt="wallet"
              />
            </div>
            <div>
              <div className="text-[22px] leading-6 text-[rgba(45,46,51,0.4)]">
                Step 3
              </div>
              <div className="text-[24px] leading-9 text-black">
                Place a buy or sell order
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative mt-10 h-[280px] w-[374px] overflow-hidden rounded-[20px] bg-white px-[30px] pt-[40px] pb-6 pl-6"
          style={{
            backgroundImage: "url(/img/home/home-search-project.png)",
            backgroundSize: "cover",
          }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-[40px] leading-9 text-black">04</div>
              <Image
                className="absolute right-6 top-6"
                src="/icons/search-project.svg"
                width={100}
                height={100}
                alt="wallet"
              />
            </div>
            <div>
              <div className="text-[22px] leading-6 text-[rgba(45,46,51,0.4)]">
                Step 4
              </div>
              <div className="text-[24px] leading-9 text-black">
                Check metrics in dashboard
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
