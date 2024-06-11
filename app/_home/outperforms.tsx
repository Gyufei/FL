"use client";
import Image from "next/image";

export default function OutPerforms() {
  return (
    <div className="px-[120px] pt-[80px] flex flex-col items-center bg-[rgba(224,255,98,0.1)]">
      <div className="text-[40px] leading-10 text-black">
        Why Tadle outperforms others?
      </div>
      <div className="mt-[60px] flex flex-col items-stretch">
        <div className="flex flex-1 justify-between">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/rocket.png"
              width={382}
              height={374}
              alt="rocket"
            />
          </div>
          <div className="flex-1 pt-10">
            <div className="text-[30px] leading-[42px] text-black">
              Optimal Capital Efficiency
            </div>
            <div className="mt-6 text-xl leading-[30px] text-gray">
              No collateral is required for subsequent traders, and revenue can
              be earned upon the completion of the trade.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>
        <div className="mt-[87px] flex flex-1 justify-between">
          <div className="flex-1 pt-10">
            <div className="text-[30px] leading-[42px] text-black">
              Superior Liquidity
            </div>
            <div className="mt-6 text-xl leading-[30px] text-gray">
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
        <div className="mt-[87px] flex flex-1 justify-between">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/fee.png"
              width={444}
              height={374}
              alt="rocket"
            />
          </div>
          <div className="flex-1 pt-10">
            <div className="text-[30px] leading-[42px] text-black">
              Low Trading Fee
            </div>
            <div className="mt-6 text-xl leading-[30px] text-gray">
              A fee of just 0.5%, which is substantially lower than fees in
              other markets.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>
        <div className="mt-[87px] flex flex-1 justify-between">
          <div className="flex-1 pt-10">
            <div className="text-[30px] leading-[42px] text-black">
              Advanced Trading System
            </div>
            <div className="mt-6 text-xl leading-[30px] text-gray">
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
        <div className="mt-[87px] flex flex-1 justify-between">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/security.png"
              width={444}
              height={374}
              alt="rocket"
            />
          </div>
          <div className="flex-1 pt-10">
            <div className="text-[30px] leading-[42px] text-black">
              Robust Security
            </div>
            <div className="mt-6 text-xl leading-[30px] text-gray">
              Tadle implements advanced security measures to safeguard user
              assets.
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>
        <div className="mt-[87px] flex flex-1 justify-between">
          <div className="flex-1 pt-10">
            <div className="text-[30px] leading-[42px] text-black">
              Decentralized Arbitration for Settlements
            </div>
            <div className="mt-6 text-xl leading-[30px] text-gray">
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
      className="mt-[88px] flex h-12 w-fit cursor-pointer items-center justify-center space-x-1 rounded-xl text-lg leading-6 hover:w-[200px] hover:bg-yellow"
    >
      <div className="flex justify-between space-x-1">
        <div className="text-lg leading-6 text-black">Read More</div>
        <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
      </div>
    </div>
  );
}
