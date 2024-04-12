import { useEffect, useState } from "react";
import NP from "number-precision";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";

import { InputPanel } from "../../../marketplace/create-offer/input-panel";
import { IToken } from "@/lib/types/token";
import { WithTip } from "../../../marketplace/create-offer/with-tip";
import ArrowBetween from "../../../marketplace/create-offer/arrow-between";
import { StableTokenSelectDisplay } from "../../../marketplace/create-offer/stable-token-display";
import { PointTokenSelectDisplay } from "../../../marketplace/create-offer/point-token-display";
import SettleBreachFee from "../../../marketplace/create-offer/settle-breach-fee";
import TaxForSubTrades from "../../../marketplace/create-offer/tax-for-sub-trades";
import OrderNoteAndFee from "../../../marketplace/create-offer/order-note-and-fee";
import ListBtn from "./list-btn";
import ListInfo from "./list-info";
import { useRelistMaker } from "@/lib/hooks/contract/use-relist-maker";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { IOrder } from "@/lib/types/order";
import { useOrderFormat } from "@/lib/hooks/order/use-order-format";
import { formatNum } from "@/lib/utils/number";
import { useOrderMakerDetail } from "@/lib/hooks/order/use-order-maker-detail";
import { useOrderTree } from "@/lib/hooks/order/use-order-tree";

export default function ListAskStockBtn({ order: order }: { order: IOrder }) {
  const { platformFee } = useGlobalConfig();

  const [step, setStep] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { orderPointInfo, orderTokenInfo, tokenPrice } = useOrderFormat({
    order,
  });

  const { getOrigin } = useOrderTree();

  const { makerDetail } = useOrderMakerDetail({
    order,
  });

  const [sellPointAmount] = useState(order.points);
  const [receiveToken] = useState<IToken>(orderTokenInfo);
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("");

  const [breachFee, setBreachFee] = useState("");
  const taxForSub = String(Number(makerDetail?.each_trade_tax) / 100);

  const [note, setNote] = useState("");

  const sellPrice = NP.times(receiveTokenAmount, tokenPrice);
  const pointPrice = NP.divide(sellPrice, sellPointAmount);

  const {
    isLoading: isDepositLoading,
    write: writeAction,
    isSuccess,
  } = useRelistMaker({
    marketplaceStr: order.marketplace.market_place_id,
    makerStr: order.maker_id,
    orderStr: order.order,
  });

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
      breachFee: Number(breachFee || 50) * 100,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setDrawerOpen(false);
    }
  }, [isSuccess]);

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
                id={order.order_id}
                inherit={order.preOrderDetail?.order_id || ""}
                origin={getOrigin(order, "")}
              />

              <InputPanel
                value={sellPointAmount}
                onValueChange={() => {}}
                topText={<>You will sell</>}
                bottomText={<>1 Diamond = ${formatNum(pointPrice)}</>}
                isCanInput={false}
                tokenSelect={
                  <PointTokenSelectDisplay
                    token={orderPointInfo as IToken}
                    setToken={() => {}}
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
                bottomText={<>Required collateral ${formatNum(sellPrice)}</>}
                tokenSelect={
                  <StableTokenSelectDisplay
                    token={orderTokenInfo as IToken}
                    setToken={() => {}}
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

              <OrderNoteAndFee value={note} onValueChange={setNote} />
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
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col">
              <DrawerTitle
                title="Confirm transaction"
                onClose={() => setDrawerOpen(false)}
              />
              <div className="text-sm leading-5 text-gray">
                You are selling{" "}
                <span className="text-black">
                  {formatNum(sellPointAmount)} {orderPointInfo.symbol} pts
                </span>{" "}
                for{" "}
                <span className="text-black">
                  {receiveTokenAmount} {orderTokenInfo.symbol}
                </span>
                . Are you sure?
              </div>

              <div className="flex h-12 items-center justify-between border-b border-[#eee]">
                <div className="flex items-center space-x-1 text-sm leading-5 text-red">
                  Selling
                </div>
                <div className="flex items-center space-x-1 text-xs leading-[18px] text-black">
                  <span>{formatNum(sellPointAmount)}</span>
                  <Image
                    src={orderPointInfo.logoURI}
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
                  <span>{receiveTokenAmount}</span>
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
                  {platformFee * 100}%
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
                Deposit {receiveTokenAmount} {receiveToken.symbol}
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
