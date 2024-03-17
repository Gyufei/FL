import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { useState } from "react";
import { InputPanel } from "../../../marketplace/create-offer/input-panel";
import { IToken } from "@/lib/types/token";
import { WithTip } from "../../../marketplace/create-offer/with-tip";
import ArrowBetween from "../../../marketplace/create-offer/arrow-between";
import { StableTokenSelectDisplay } from "../../../marketplace/create-offer/stable-token-display";
import SettleBreachFee from "../../../marketplace/create-offer/settle-breach-fee";
import TaxForSubTrades from "../../../marketplace/create-offer/tax-for-sub-trades";
import OrderNote from "../../../marketplace/create-offer/order-note";
import FeeDisplay from "../../../marketplace/create-offer/fee-display";
import { PointTokenSelectDisplay } from "../../../marketplace/create-offer/point-token-display";
import ListBtn from "./list-btn";
import ListInfo from "./list-info";
import { useAskRelist } from "@/lib/hooks/contract/use-ask-relist";

export default function ListAskStockBtn({
  stockDetail,
}: {
  stockDetail: Record<string, any>;
}) {
  const platFormFee = 0.025;

  const [step, setStep] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [sellPointAmount, setSellPointAmount] = useState("");
  const [sellPoint, setSellPoint] = useState<IToken>("Points");
  const [receiveToken, setReceiveToken] = useState<IToken>("USDC");
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("");

  const [breachFee, setBreachFee] = useState("");
  const taxForSub = "";

  const [note, setNote] = useState("");

  const [sellPrice] = useState(18.4);
  const [pointPrice] = useState(221);

  const { isLoading: isDepositLoading, write: writeAction } = useAskRelist({
    makerStr: stockDetail.maker,
    orderStr: stockDetail.order,
  });

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

  function handleDeposit() {
    writeAction({
      receiveTokenAmount: Number(receiveTokenAmount),
      breachFee: Number(breachFee) * 100,
    });
  }

  return (
    <div>
      <ListBtn onClick={() => setDrawerOpen(true)} />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={500}
        className="overflow-y-auto rounded-l-2xl p-6"
      >
        {step === 0 && (
          <>
            <DrawerTitle
              title="List Stock As Ask Offer"
              onClose={() => setDrawerOpen(false)}
            />
            <div className="flex flex-1 flex-col">
              <ListInfo
                id={stockDetail.id}
                inherit={stockDetail.id}
                origin={stockDetail.id}
              />

              <InputPanel
                value={sellPointAmount}
                onValueChange={handleSellPayChange}
                topText={<>You will sell</>}
                bottomText={<>1 Diamond = ${pointPrice}</>}
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
                onValueChange={setReceiveTokenAmount}
                topText={
                  <div className="flex items-center">
                    You&apos;d like to receive
                    <WithTip>
                      When buying Diamonds, you need to wait until the diamonds
                      convert into the protocol&apos;s tokens before you can
                      receive tokens.
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
                <SettleBreachFee
                  value={breachFee}
                  onValueChange={setBreachFee}
                />
                <TaxForSubTrades
                  disabled
                  value={taxForSub}
                  onValueChange={() => {}}
                />
              </div>

              <OrderNote value={note} onValueChange={setNote} />

              <FeeDisplay />
            </div>

            <button
              onClick={handleNext}
              className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
            >
              Confirm Maker Order
            </button>
          </>
        )}
        {step === 1 && (
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <DrawerTitle
                title="Confirm transaction"
                onClose={() => setDrawerOpen(false)}
              />
              <div className="text-sm leading-5 text-gray">
                You are selling{" "}
                <span className="text-black">
                  {sellPointAmount} {sellPoint} pts
                </span>{" "}
                for{" "}
                <span className="text-black">
                  {receiveTokenAmount} {receiveToken}
                </span>
                . Are you sure?
              </div>

              <div className="flex h-12 items-center justify-between border-b border-[#eee]">
                <div className="flex items-center space-x-1 text-sm leading-5 text-red">
                  Selling
                </div>
                <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
                  <span>{sellPointAmount}</span>
                  <Image
                    src="/icons/magic-eden.svg"
                    width={16}
                    height={16}
                    alt="token"
                  />
                </div>
              </div>

              <div className="flex h-12 items-center justify-between border-b border-[#eee]">
                <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                  For
                </div>
                <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
                  <span>{receiveToken}</span>
                  <Image
                    src="/icons/USDC.svg"
                    width={16}
                    height={16}
                    alt="token"
                  />
                </div>
              </div>

              <div className="flex h-12 items-center justify-between border-b border-[#eee]">
                <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
                  Platform fee
                  <WithTip></WithTip>
                </div>
                <div className="flex items-center text-xs leading-[18px]">
                  {platFormFee * 100}%
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
                disabled={isDepositLoading}
                onClick={handleDeposit}
                className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-yellow text-black"
              >
                Deposit {receiveTokenAmount} {receiveToken}
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
