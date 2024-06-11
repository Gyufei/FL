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
import CollateralRateInput from "../../../marketplace/create-offer/collateral-rate-input";
import TaxForSubTrades from "../../../marketplace/create-offer/tax-for-sub-trades";
import OrderNoteAndFee from "../../../marketplace/create-offer/order-note-and-fee";
import ListBtn from "./list-btn";
import ListInfo from "./list-info";
import { formatNum } from "@/lib/utils/number";
import { SettleModeSelect } from "@/app/marketplace/create-offer/settle-mode-select";
import { IStock } from "@/lib/types/stock";
import { useStockFormat } from "@/lib/hooks/stock/use-stock-format";
import { useListStock } from "@/lib/hooks/contract/use-list-maker";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";

export default function ListAskStockBtn({
  order: order,
  onSuccess,
}: {
  order: IStock;
  onSuccess: () => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { orderPointInfo, orderTokenInfo, tokenPrice, makerDetail } =
    useStockFormat({
      stock: order,
    });

  const [sellPointAmount] = useState(order.points);
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("");

  const [collateralRate, setCollateralRate] = useState(
    String(Number(order.pre_offer_detail.collateral_rate) / 100),
  );
  const taxForSub = String(Number(makerDetail?.each_trade_tax) / 100);
  const settleMode = makerDetail?.offer_settle_type || "protected";

  const [note, setNote] = useState("");

  const sellPrice = NP.times(receiveTokenAmount, tokenPrice);
  const pointPrice = NP.divide(sellPrice, sellPointAmount);

  const {
    isLoading: isDepositLoading,
    write: writeAction,
    isSuccess,
  } = useListStock({
    marketplaceStr: order.marketplace.market_place_id,
    makerStr: order.maker_account,
    stockStr: order.stock_account,
    originOfferStr: makerDetail?.origin_offer || "",
  });

  function handleDeposit() {
    if (!sellPointAmount || !receiveTokenAmount || !makerDetail) {
      return;
    }

    writeAction({
      receiveTokenAmount:
        Number(receiveTokenAmount) * 10 ** orderTokenInfo.decimals,
      collateralRate: Number(collateralRate || 100) * 100,
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
      <WithWalletConnectBtn
        onClick={() => setDrawerOpen(true)}
        shouldSignIn={true}
      >
        <ListBtn />
      </WithWalletConnectBtn>
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
              id={order.stock_id}
              inherit={
                order?.pre_offer_detail?.maker_account ||
                order?.offer_detail?.maker_account ||
                ""
              }
              origin={
                order?.pre_offer_detail?.offer_id ||
                order?.offer_detail?.offer_id ||
                ""
              }
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
              <CollateralRateInput
                disabled={settleMode === "turbo"}
                value={collateralRate}
                onValueChange={setCollateralRate}
              />
              <TaxForSubTrades
                disabled
                value={taxForSub}
                onValueChange={() => {}}
              />
            </div>

            <OrderNoteAndFee value={note} onValueChange={setNote} type="sell" />
          </div>

          <WithWalletConnectBtn onClick={handleDeposit} shouldSignIn={true}>
            <button
              disabled={isDepositLoading}
              className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
            >
              Confirm Maker Order
            </button>
          </WithWalletConnectBtn>
        </div>
      </Drawer>
    </div>
  );
}
