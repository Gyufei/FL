import Image from "next/image";
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
import { useCreateBidMaker } from "@/lib/hooks/contract/use-create-bid-maker";

export function BuyContent({
  step,
  setStep,
}: {
  step: number;
  setStep: (_step: number) => void;
}) {
  const img1 = "/icons/magic-eden.svg";
  const img2 = "/icons/solana.svg";
  const name = "Magic Eden";

  const [payTokenAmount, setPayTokenAmount] = useState("");
  const [payToken, setPayToken] = useState<IToken>("USDC");
  const [receivePoint, setReceivePoint] = useState<IToken>("Points");
  const [receivePointAmount, setReceivePointAmount] = useState("");

  const [breachFee, setBreachFee] = useState("");
  const [taxForSub, setTaxForSub] = useState("");

  const [note, setNote] = useState("");

  const [payAmountValue] = useState(18.4);
  const [pointPrice] = useState(221);

  const fee = 0.005;

  function handleBuyPayChange(v: string) {
    setPayTokenAmount(v);
  }

  function handleNext() {
    if (!payTokenAmount || !receivePointAmount) {
      return;
    }
    setStep(1);
  }

  function handleBack() {
    setStep(0);
  }

  const { isLoading: isCreateLoading, write: createAction } =
    useCreateBidMaker();

  function handleDeposit() {
    createAction({
      payTokenAmount: Number(payTokenAmount),
      receivePointAmount: Number(receivePointAmount),
      breachFee: Number(breachFee || 50) * 100,
      taxForSub: Number(taxForSub || 3) * 100,
    });
  }

  return (
    <>
      {step === 0 && (
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <InputPanel
            value={payTokenAmount}
            onValueChange={handleBuyPayChange}
            topText={<>You pay</>}
            bottomText={<>${payAmountValue}</>}
            tokenSelect={
              <StableTokenSelectDisplay
                token={payToken}
                setToken={setPayToken}
              />
            }
          />

          <ArrowBetween className="-my-4 self-center" />

          <InputPanel
            value={receivePointAmount}
            onValueChange={setReceivePointAmount}
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
            bottomText={<>1 Diamond = ${pointPrice}</>}
            tokenSelect={
              <PointTokenSelectDisplay
                token={receivePoint}
                setToken={setReceivePoint}
              />
            }
          />

          <div className="mt-4 flex items-center justify-between space-x-3">
            <SettleBreachFee value={breachFee} onValueChange={setBreachFee} />
            <TaxForSubTrades value={taxForSub} onValueChange={setTaxForSub} />
          </div>

          <OrderNote value={note} onValueChange={setNote} />

          <FeeDisplay />

          <button
            onClick={handleNext}
            className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white"
          >
            Confirm Maker Order
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="flex h-full flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
            <div className="flex items-center">
              <div className="relative h-fit">
                <Image
                  src={img1}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full"
                />
                <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-white">
                  <Image
                    src={img2}
                    width={8.8}
                    height={7.2}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="ml-3 text-xl leading-[30px] text-black">
                {name}
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[#FFF6EE] p-3 text-sm leading-5 text-[#FFA95B]">
              When buying Diamonds, you need to wait until the diamonds convert
              into the protocol&apos;s tokens before you can receive tokens.
            </div>

            <div className="mt-4 mb-3 text-sm leading-5 text-gray">
              You are buying{" "}
              <span className="text-black">
                {receivePointAmount} {receivePoint}
              </span>{" "}
              diamonds for{" "}
              <span className="text-black">
                {payTokenAmount} {payToken}
              </span>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="text-sm leading-5 text-gray">Offer Type</div>
              <div className="flex h-5 items-center rounded bg-[#EDF8F4] px-[10px] text-[10px] leading-[16px] text-green">
                Buying
              </div>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                Buy Amount
                <WithTip></WithTip>
              </div>
              <div className="flex items-center text-xs leading-[18px] text-black">
                {receivePointAmount}
              </div>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                For
                <WithTip></WithTip>
              </div>
              <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
                <span>{payTokenAmount}</span>
                <Image
                  src="/icons/usdc.svg"
                  width={16}
                  height={16}
                  alt="token"
                />
              </div>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                Price / Diamond
                <WithTip></WithTip>
              </div>
              <div className="flex items-center text-xs leading-[18px]">
                ${pointPrice}
              </div>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="text-sm leading-5 text-gray">Fill Type</div>
              <div className="flex h-5 items-center rounded bg-[#F0F1F5] px-[10px] text-[10px] leading-[16px] text-gray">
                Partial Fill
              </div>
            </div>

            <div className="flex h-12 items-center justify-between">
              <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                Platform Fee
                <WithTip></WithTip>
              </div>
              <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
                <span>{fee * 100}%</span>
              </div>
            </div>
          </div>
          <div className="mt-[140px] flex items-center justify-between space-x-[6px]">
            <button
              onClick={handleBack}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#F0F1F5] text-black"
            >
              Back
            </button>
            <button
              disabled={isCreateLoading}
              onClick={handleDeposit}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-yellow text-black"
            >
              Deposit {payTokenAmount} {payToken}
            </button>
          </div>
        </div>
      )}
    </>
  );
}