import { useEffect, useState } from "react";
import NP from "number-precision";
import Drawer from "react-modern-drawer";
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
import { IOffer } from "@/lib/types/order";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { formatNum } from "@/lib/utils/number";
import { useOfferMakerDetail } from "@/lib/hooks/offer/use-offer-maker-detail";
import { useOfferTree } from "@/lib/hooks/offer/use-offer-tree";
import { SettleModeSelect } from "@/app/marketplace/create-offer/settle-mode-select";

export default function ListAskStockBtn({
  order: order,
  onSuccess,
}: {
  order: IOffer;
  onSuccess: () => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { orderPointInfo, orderTokenInfo, tokenPrice } = useOfferFormat({
    offer: order,
  });

  const { getOriginOrderAccount } = useOfferTree();

  const { makerDetail } = useOfferMakerDetail({
    offer: order,
  });

  const [sellPointAmount] = useState(order.points);
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("");

  const [breachFee, setBreachFee] = useState("");
  const taxForSub = String(Number(makerDetail?.each_trade_tax) / 100);
  const settleMode = "progressive";

  const [note, setNote] = useState("");

  const sellPrice = NP.times(receiveTokenAmount, tokenPrice);
  const pointPrice = NP.divide(sellPrice, sellPointAmount);

  const {
    isLoading: isDepositLoading,
    write: writeAction,
    isSuccess,
  } = useRelistMaker({
    marketplaceStr: order.marketplace.market_place_id,
    makerStr: order.maker_account,
    orderStr: order.offer_account,
  });

  function handleDeposit() {
    if (!sellPointAmount || !receiveTokenAmount) {
      return;
    }

    writeAction({
      receiveTokenAmount: Number(receiveTokenAmount),
      breachFee: Number(breachFee || 50) * 100,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setDrawerOpen(false);
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return (
    <div>
      <ListBtn onClick={() => setDrawerOpen(true)} />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction="right"
        size={500}
        className="flex flex-col overflow-y-auto rounded-l-2xl p-6"
      >
        <DrawerTitle
          title="List Stock As Ask Offer"
          onClose={() => setDrawerOpen(false)}
        />
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
            <ListInfo
              id={order.offer_id}
              inherit={order.pre_offer_detail?.offer_id || ""}
              origin={getOriginOrderAccount(order, "")}
            />

            <InputPanel
              value={sellPointAmount}
              onValueChange={() => {}}
              topText={<>You will sell</>}
              bottomText={
                <>
                  1 {order.marketplace.point_name} = ${formatNum(pointPrice)}
                </>
              }
              isCanInput={false}
              tokenSelect={
                <PointTokenSelectDisplay
                  points={[orderPointInfo]}
                  point={orderPointInfo}
                  setPoint={() => {}}
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
                    When buying {order.marketplace.point_name}s, you need to
                    wait until the {order.marketplace.point_name}s convert into
                    the protocol&apos;s tokens before you can receive tokens.
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
              <SettleModeSelect
                disabled
                value={settleMode}
                onValueChange={() => {}}
              />
              <SettleBreachFee value={breachFee} onValueChange={setBreachFee} />
              <TaxForSubTrades
                disabled
                value={taxForSub}
                onValueChange={() => {}}
              />
            </div>

            <OrderNoteAndFee value={note} onValueChange={setNote} />
          </div>

          <button
            disabled={isDepositLoading}
            onClick={handleDeposit}
            className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
          >
            Confirm Maker Order
          </button>
        </div>
      </Drawer>
    </div>
  );
}
