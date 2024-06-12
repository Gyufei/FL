"use client";
import Image from "next/image";

export default function OutPerforms() {
  return (
    <div className="flex flex-col items-center bg-[rgba(224,255,98,0.1)] px-4 pt-[80px] sm:px-[120px]">
      <div className="text-[24px] leading-9 text-black sm:text-[40px] sm:leading-10">
        Why Tadle outperforms others?
      </div>
      <div className="mt-[60px] flex flex-col items-stretch">
        <div className="flex flex-1 flex-col items-center justify-between sm:flex-row">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/rocket.png"
              width={382}
              height={374}
              alt="rocket"
            />
          </div>
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start">
            <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
              Optimal Capital Efficiency
            </div>
            <div className="mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px] ">
              No collateral is required for subsequent traders, and revenue can
              be earned upon the completion of the trade.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col-reverse items-center justify-between sm:mt-0 sm:flex-row">
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start">
            <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
              Superior Liquidity
            </div>
            <div className="mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px] ">
              Points can be quickly bought or sold in the market without causing
              significant price changes, providing traders with the flexibility
              to enter and exit positions with ease.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/liquidity.png"
              width={530}
              height={317}
              alt="rocket"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col items-center justify-between sm:mt-0 sm:flex-row">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/fee.png"
              width={444}
              height={374}
              alt="rocket"
            />
          </div>
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start">
            <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
              Low Trading Fee
            </div>
            <div className="mt-6 text-center text-xl leading-[30px] text-gray sm:text-left ">
              A fee of just 0.5%, which is substantially lower than fees in
              other markets.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col-reverse items-center justify-between sm:mt-[87px] sm:flex-row">
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start">
            <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
              Advanced Trading System
            </div>
            <div className="mt-6 text-center text-xl leading-[30px] text-gray sm:text-left ">
              Tadle offers tools and metrics to help traders better understand
              the market and make more informed trading decisions.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/system.png"
              width={530}
              height={317}
              alt="rocket"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-1 flex-col items-center justify-between sm:mt-[87px] sm:flex-row">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/security.png"
              width={444}
              height={374}
              alt="rocket"
            />
          </div>
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start">
            <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
              Robust Security
            </div>
            <div className="mt-6 text-center text-xl leading-[30px] text-gray sm:text-left ">
              Tadle implements advanced security measures to safeguard user
              assets.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col-reverse items-center justify-between sm:mt-[87px] sm:flex-row">
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start">
            <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
              Decentralized Arbitration for Settlements
            </div>
            <div className="mt-6 text-center text-xl leading-[30px] text-gray sm:text-left ">
              Tadle employs decentralized arbitration to ensure fair and
              transparent resolution for every case.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/settlements.png"
              width={530}
              height={317}
              alt="rocket"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadMore({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="mt-6 flex h-12 w-[200px] cursor-pointer items-center justify-center space-x-1 rounded-xl bg-yellow text-lg leading-6 hover:w-[200px] hover:bg-yellow sm:mt-[88px] sm:w-fit sm:bg-transparent"
    >
      <div className="flex justify-between space-x-1">
        <div className="text-lg leading-6 text-black">Read More</div>
        <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
      </div>
    </div>
  );
}
