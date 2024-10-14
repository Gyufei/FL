import { useEffect, useState } from "react";
import NP from "number-precision";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";

import { InputPanel } from "../../../marketplace/[...name]/create-offer/input-panel";
import { IToken } from "@/lib/types/token";
import { WithTip } from "../../../marketplace/[...name]/create-offer/with-tip";
import ArrowBetween from "../../../marketplace/[...name]/create-offer/arrow-between";
import { StableTokenSelectDisplay } from "../../../marketplace/[...name]/create-offer/stable-token-display";
import { PointTokenSelectDisplay } from "../../../marketplace/[...name]/create-offer/point-token-display";
import CollateralRateInput from "../../../marketplace/[...name]/create-offer/collateral-rate-input";
import TaxForSubTrades from "../../../marketplace/[...name]/create-offer/tax-for-sub-trades";
import OrderNoteAndFee from "../../../marketplace/[...name]/create-offer/order-note-and-fee";
import ListBtn from "./list-btn";
import ListInfo from "./list-info";
import { formatNum } from "@/lib/utils/number";
import { SettleModeSelect } from "@/app/[locale]/marketplace/[...name]/create-offer/settle-mode-select";
import { IHolding } from "@/lib/types/holding";
import { useHoldingFormat } from "@/lib/hooks/holding/use-holding-format";
import { useList } from "@/lib/hooks/contract/use-list";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";

export default function ListAskHoldingBtn({
  holding,
  onSuccess,
}: {
  holding: IHolding;
  onSuccess: () => void;
}) {
  const cot = useTranslations("drawer-CreateOffer");
  const T = useTranslations("page-MyStocks");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    orderPointInfo,
    orderTokenInfo,
    tokenPrice,
    makerDetail,
    isNativeToken,
  } = useHoldingFormat({
    holding: holding,
  });

  const [sellPointAmount] = useState(holding.points);
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("");

  const [collateralRate, setCollateralRate] = useState(
    String(Number(holding?.pre_offer_detail?.collateral_ratio) / 100),
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
  } = useList({
    marketplaceStr: holding.marketplace.market_place_id,
    makerStr: holding.offer_maker,
    holdingStr: holding.stock_account,
    preOfferStr: holding.pre_offer_account,
    originOfferStr: makerDetail?.origin_offer || "",
    isNativeToken,
  });

  function handleDeposit() {
    if (!sellPointAmount || !receiveTokenAmount || !makerDetail) {
      return;
    }

    writeAction({
      receiveTokenAmount: NP.times(
        Number(receiveTokenAmount),
        10 ** (orderTokenInfo?.decimals || 0),
      ).toFixed(),
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
          title={T("cap-ListStockAsAskOffer")}
          onClose={() => setDrawerOpen(false)}
        />
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
            <ListInfo
              id={holding.stock_id}
              inherit={
                holding?.pre_offer_detail?.offer_maker ||
                holding?.offer_detail?.offer_maker ||
                ""
              }
              origin={
                holding?.pre_offer_detail?.offer_id ||
                holding?.offer_detail?.offer_id ||
                ""
              }
            />

            <InputPanel
              value={sellPointAmount}
              onValueChange={() => {}}
              topText={<>{cot("txt-YouWillSell")}</>}
              bottomText={
                <>
                  1 {holding.marketplace.item_name} = ${formatNum(pointPrice)}
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
                  {cot("txt-YouDLikeToReceive")}
                  <WithTip align="start">
                    {cot("tip-YouDLikeToReceive", {
                      pointName: holding.marketplace.item_name,
                    })}
                  </WithTip>
                </div>
              }
              bottomText={
                <>
                  {cot("txt-RequiredCollateral")} ${formatNum(sellPrice)}
                </>
              }
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

          <WithWalletConnectBtn onClick={handleDeposit} >
            <button
              disabled={isDepositLoading}
              className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
            >
              {cot("btn-ConfirmMakerOrder")}
            </button>
          </WithWalletConnectBtn>
        </div>
      </Drawer>
    </div>
  );
}