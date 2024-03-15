import { useState } from "react";
import { IToken } from "@/lib/types/token";

import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";
import { PointTokenSelectDisplay } from "./point-token-display";

import ArrowBetween from "./arrow-between";
import { WithTip } from "./with-tip";
import SettleBreachFee from "./settle-breach-fee";
import TaxForSubTrades from "./tax-for-sub-trades";
import OrderNote from "./order-note";
import FeeDisplay from "./fee-display";

export function BuyContent() {
  const [buyPay, setBuyPay] = useState("");
  const [payToken, setPayToken] = useState<IToken>("USDC");
  const [receiveToken, setReceiveToken] = useState<IToken>("Magic Eden");
  const [receiveAmount, setReceiveAmount] = useState("");

  const [breachFee, setBreachFee] = useState("");
  const [taxForSub, setTaxForSub] = useState("");

  const [note, setNote] = useState("");

  const [payAmountValue] = useState(18.4);
  const [pointPrice] = useState(221);

  function handleBuyPayChange(v: string) {
    setBuyPay(v);
  }

  return (
    <div className="mt-6 flex h-[96%] flex-col justify-between">
      <div className="flex flex-1 flex-col">
        <InputPanel
          value={buyPay}
          onValueChange={handleBuyPayChange}
          topText={<>You pay</>}
          bottomText={<>${payAmountValue}</>}
          tokenSelect={
            <StableTokenSelectDisplay token={payToken} setToken={setPayToken} />
          }
        />

        <ArrowBetween className="-my-4 self-center" />

        <InputPanel
          value={receiveAmount}
          onValueChange={setReceiveAmount}
          topText={
            <div className="flex items-center">
              You&apos;d like to receive
              <WithTip>
                When buying Diamonds, you need to wait until the diamonds
                convert into the protocol&apos;s tokens before you can receive
                tokens.
              </WithTip>
            </div>
          }
          isCanInput={false}
          bottomText={<>1 Diamond = ${pointPrice}</>}
          tokenSelect={
            <PointTokenSelectDisplay
              token={receiveToken}
              setToken={setReceiveToken}
            />
          }
        />

        <div className="mt-4 flex items-center justify-between space-x-3">
          <SettleBreachFee value={breachFee} onValueChange={setBreachFee} />
          <TaxForSubTrades value={taxForSub} onValueChange={setTaxForSub} />
        </div>

        <OrderNote value={note} onValueChange={setNote} />

        <FeeDisplay />
      </div>

      <button className="flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white">
        Confirm Maker Order
      </button>
    </div>
  );
}
