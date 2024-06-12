"use client";

import Image from "next/image";
import { useState } from "react";

export default function ModeDesc() {
  const [mode, setMode] = useState("turbo");

  return (
    <div
      className="flex flex-1 flex-col pt-[60px]"
      style={{
        backgroundImage: "url(/img/home/make-money.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
      }}
    >
      <div className="mb-7 flex items-center justify-start space-x-10 text-lg leading-6">
        <div
          data-active={mode === "turbo"}
          onClick={() => setMode("turbo")}
          className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-xl data-[active=true]:bg-yellow"
        >
          Turbo Mode
        </div>
        <div
          data-active={mode === "protected"}
          onClick={() => setMode("protected")}
          className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-xl data-[active=true]:bg-yellow"
        >
          Protected Mode
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        {mode === "turbo" && (
          <div className="flex flex-col space-y-4 text-base leading-[30px] text-gray">
            <div>
              The unique feature of Turbo Mode is that only the original trader
              is required to deposit crypto as collateral, while subsequent
              traders can buy and sell points without needing collateral. Upon
              settlement, the original seller will directly transfer the token
              to the final point holder.
            </div>
            <div>
              This mechanism unlocks the dynamics of points, making trading less
              capital-intensive and increasing market liquidity for traders.
            </div>
          </div>
        )}
        {mode === "protected" && (
          <div className="flex flex-col space-y-4 text-base leading-[30px] text-gray">
            <div>
              For Protected Mode, all sellers, whether they are the original or
              subsequent sellers, are required to deposit crypto as collateral.
              Upon settlement, each seller is obligated to transfer the token to
              the buyer according to the trading sequence.
            </div>
            <div>
              This mechanism provides additional assurance to point buyers and
              potentially reduces the default rate.
            </div>
          </div>
        )}

        <div className="flex cursor-pointer items-center space-x-1">
          <div className="text-lg leading-6 text-black">Start Trading</div>
          <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
        </div>
      </div>
    </div>
  );
}
