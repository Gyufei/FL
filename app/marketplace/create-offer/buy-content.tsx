import NP from "number-precision";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IToken } from "@/lib/types/token";

import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";
import { PointTokenSelectDisplay } from "./point-token-display";

import ArrowBetween from "./arrow-between";
import { WithTip } from "./with-tip";
import SettleBreachFee from "./settle-breach-fee";
import TaxForSubTrades from "./tax-for-sub-trades";
import OrderNoteAndFee from "./order-note-and-fee";
import { useCreateBidMaker } from "@/lib/hooks/contract/use-create-bid-maker";
import { IMarketplace } from "@/lib/types/marketplace";

export function BuyContent({
  step,
  setStep,
  marketplace,
  onSuccess,
}: {
  step: number;
  setStep: (_step: number) => void;
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const img1 = "/icons/point.svg";
  const img2 = "/icons/solana.svg";
  const name = "Magic Eden";

  const [payTokenAmount, setPayTokenAmount] = useState("");
  const [payToken, setPayToken] = useState<IToken>({
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 6,
  } as IToken);
  const [receivePoint, setReceivePoint] = useState<IToken>({
    symbol: "POINTS",
    logoURI: "/icons/point.svg",
  } as IToken);
  const [receivePointAmount, setReceivePointAmount] = useState("");

  const [breachFee, setBreachFee] = useState("");
  const [taxForSub, setTaxForSub] = useState("");

  const [note, setNote] = useState("");

  const payAmountValue = useMemo(() => {
    if (!payTokenAmount) return 0;

    return NP.times(payTokenAmount, 1);
  }, [payTokenAmount]);

  const pointPrice = useMemo(() => {
    if (!receivePointAmount) {
      return 0;
    }

    return NP.divide(payAmountValue, receivePointAmount);
  }, [payAmountValue, receivePointAmount]);

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

  const {
    isLoading: isCreateLoading,
    write: writeAction,
    isSuccess,
  } = useCreateBidMaker({
    marketplaceStr: marketplace.market_place_id,
  });

  function handleDeposit() {
    writeAction({
      payTokenAmount: Number(payTokenAmount),
      receivePointAmount: Number(receivePointAmount),
      breachFee: Number(breachFee || 50) * 100,
      taxForSub: Number(taxForSub || 3) * 100,
      note: note,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return (
    <>
      {step === 0 && (
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
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
                    When buying {marketplace.point_name}s, you need to wait until the {marketplace.point_name}s
                    convert into the protocol&apos;s tokens before you can
                    receive tokens.
                  </WithTip>
                </div>
              }
              bottomText={<>1 {marketplace.point_name} = ${pointPrice}</>}
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

            <OrderNoteAndFee value={note} onValueChange={setNote} />
          </div>

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
              When buying {marketplace.point_name}s, you need to wait until the {marketplace.point_name}s convert
              into the protocol&apos;s tokens before you can receive tokens.
            </div>

            <div className="mt-4 mb-3 text-sm leading-5 text-gray">
              You are buying{" "}
              <span className="text-black">
                {receivePointAmount} {receivePoint.symbol}
              </span>{" "}
              {marketplace.point_name} for{" "}
              <span className="text-black">
                {payTokenAmount} {payToken.symbol}
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
                Price / {marketplace.point_name}
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
              Deposit {payTokenAmount} {payToken.symbol}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
