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
import { useCreateAskMaker } from "@/lib/hooks/contract/use-create-ask-maker";
import { IMarketplace } from "@/lib/types/marketplace";

export function SellContent({
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

  const [sellPointAmount, setSellPointAmount] = useState("");
  const [sellPoint, setSellPoint] = useState<IToken>({
    symbol: "POINTS",
    logoURI: "/icons/point.svg",
  } as IToken);
  const [receiveTokenAmount, setReceiveAmount] = useState("");
  const [receiveToken, setReceiveToken] = useState<IToken>({
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 6,
  } as IToken);

  const [breachFee, setBreachFee] = useState("");
  const [taxForSub, setTaxForSub] = useState("");

  const [note, setNote] = useState("");

  const sellPrice = useMemo(() => {
    if (!receiveTokenAmount) {
      return 0;
    }
    return NP.times(receiveTokenAmount, 1);
  }, [receiveTokenAmount]);

  const pointPrice = useMemo(() => {
    if (!sellPointAmount) {
      return 0;
    }
    return NP.divide(sellPrice, sellPointAmount);
  }, [sellPrice, sellPointAmount]);

  function handleSellPayChange(v: string) {
    setSellPointAmount(v);
  }

  function handleNext() {
    if (!sellPointAmount || !receiveTokenAmount) {
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
  } = useCreateAskMaker({
    marketplaceStr: marketplace.market_place_id,
  });

  async function handleDeposit() {
    writeAction({
      sellPointAmount: Number(sellPointAmount),
      receiveTokenAmount: Number(receiveTokenAmount),
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
              value={sellPointAmount}
              onValueChange={handleSellPayChange}
              topText={<>You will sell</>}
              bottomText={
                <>
                  1 {marketplace.point_name} = ${pointPrice}
                </>
              }
              tokenSelect={
                <PointTokenSelectDisplay
                  token={sellPoint}
                  setToken={setSellPoint}
                />
              }
            />

            <ArrowBetween className="-my-4 self-center" />

            <InputPanel
              value={receiveTokenAmount}
              onValueChange={setReceiveAmount}
              topText={
                <div className="flex items-center">
                  You&apos;d like to receive
                  <WithTip>
                    <div className="relative">
                      When buying {marketplace.point_name}s, you need to wait
                      until the {marketplace.point_name}s convert into the
                      protocol&apos;s tokens before you can receive tokens.
                      <Image
                        src="/icons/info-tip.svg"
                        height={30}
                        width={30}
                        alt="info"
                        className="absolute -right-[18px] -bottom-[14px] !text-[#E0FF62]"
                      />
                    </div>
                  </WithTip>
                </div>
              }
              bottomText={<>Required collateral ${sellPrice}</>}
              tokenSelect={
                <StableTokenSelectDisplay
                  token={receiveToken}
                  setToken={setReceiveToken}
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
            disabled={isCreateLoading}
            onClick={handleNext}
            className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
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
              When buying {marketplace.point_name}s, you need to wait until the{" "}
              {marketplace.point_name}s convert into the protocol`&apos;`s
              tokens before you can receive tokens.
            </div>

            <div className="mt-4 mb-3 text-sm leading-5 text-gray">
              You are selling{" "}
              <span className="text-black">
                {sellPointAmount} {sellPoint.symbol}
              </span>{" "}
              {marketplace.point_name} for{" "}
              <span className="text-black">
                {receiveTokenAmount} {receiveToken.symbol}
              </span>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="text-sm leading-5 text-gray">Offer Type</div>
              <div className="flex h-5 items-center rounded bg-[#FFEFEF] px-[10px] text-[10px] leading-[16px] text-red">
                Selling
              </div>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                Selling Amount
                <WithTip></WithTip>
              </div>
              <div className="flex items-center text-xs leading-[18px] text-black">
                {sellPointAmount}
              </div>
            </div>

            <div className="flex h-12 items-center justify-between border-b border-[#eee]">
              <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                For
                <WithTip></WithTip>
              </div>
              <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
                <span>{receiveTokenAmount}</span>
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
                Collateral
                <WithTip></WithTip>
              </div>
              <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
                <span>{receiveTokenAmount}</span>
                <Image
                  src="/icons/usdc.svg"
                  width={16}
                  height={16}
                  alt="token"
                />
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
              onClick={handleDeposit}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-yellow text-black"
            >
              Deposit {receiveTokenAmount} {receiveToken.symbol}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
