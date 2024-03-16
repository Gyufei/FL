import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerTitle from "@/components/share/drawer-title";
import { useState } from "react";
import { InputPanel } from "../marketplace/create-offer/input-panel";
import { IToken } from "@/lib/types/token";
import { WithTip } from "../marketplace/create-offer/with-tip";
import ArrowBetween from "../marketplace/create-offer/arrow-between";
import { StableTokenSelectDisplay } from "../marketplace/create-offer/stable-token-display";
import SettleBreachFee from "../marketplace/create-offer/settle-breach-fee";
import TaxForSubTrades from "../marketplace/create-offer/tax-for-sub-trades";
import OrderNote from "../marketplace/create-offer/order-note";
import FeeDisplay from "../marketplace/create-offer/fee-display";
import { PointTokenSelectDisplay } from "../marketplace/create-offer/point-token-display";

export default function ListStockBtn({
  stockDetail,
}: {
  stockDetail: Record<string, any>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [sellPay, setSellPay] = useState("");
  const [sellToken, setSellToken] = useState<IToken>("Points");
  const [receiveToken, setReceiveToken] = useState<IToken>("USDC");
  const [receiveAmount, setReceiveAmount] = useState("");

  const [breachFee, setBreachFee] = useState("");
  const [taxForSub, setTaxForSub] = useState("");

  const [note, setNote] = useState("");

  const [sellPrice] = useState(18.4);
  const [pointPrice] = useState(221);

  function handleSellPayChange(v: string) {
    setSellPay(v);
  }

  return (
    <div>
      <div
        onClick={() => setDrawerOpen(true)}
        className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black"
      >
        <Image src="/icons/upload.svg" width={16} height={16} alt="list" />
        <span>list</span>
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={500}
        className="overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title="List Stock As Ask Offer"
          onClose={() => setDrawerOpen(false)}
        />
        <div className="flex flex-1 flex-col">
          <div className="mb-4 flex justify-between space-x-3">
            <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
              <div className="text-xs leading-[18px] text-gray">Stock Id</div>
              <div className="leading-6 text-black">#{stockDetail.id}</div>
            </div>
            <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
              <div className="text-xs leading-[18px] text-gray">
                Inherit from
              </div>
              <div className="leading-6 text-black">#{stockDetail.id}</div>
            </div>
            <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
              <div className="text-xs leading-[18px] text-gray">
                Originated from
              </div>
              <div className="leading-6 text-black">#{stockDetail.id}</div>
            </div>
          </div>

          <InputPanel
            value={sellPay}
            onValueChange={handleSellPayChange}
            topText={<>You will sell</>}
            bottomText={<>1 Diamond = ${pointPrice}</>}
            tokenSelect={
              <PointTokenSelectDisplay
                token={sellToken}
                setToken={setSellToken}
              />
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

          <OrderNote value={note} onValueChange={setNote} />

          <FeeDisplay />
        </div>

        <button className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white">
          Confirm Maker Order
        </button>
      </Drawer>
    </div>
  );
}
