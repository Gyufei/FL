import { useEffect } from "react";

import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";
import { PointTokenSelectDisplay } from "./point-token-display";

import ArrowBetween from "./arrow-between";
import { WithTip } from "../../../../../components/share/with-tip";
import CollateralRateInput from "./collateral-rate-input";
import TaxForSubTrades from "./tax-for-sub-trades";
import OrderNoteAndFee from "./order-note-and-fee";
import { IMarketplace } from "@/lib/types/marketplace";
import { SettleModeSelect } from "./settle-mode-select";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { formatNum } from "@/lib/utils/number";
import { useApprove } from "@/lib/hooks/web3/evm/use-approve";
import { useCreateAction } from "./use-create-action";
import { useOptionOfCreate } from "./use-option-of-create";

export function BuyContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const cot = useTranslations("drawer-CreateOffer");

  const {
    token: payToken,
    setToken: setPayToken,
    point: receivePoint,
    setPoint: setReceivePoint,
    tokenAmount: payTokenAmount,
    setTokenAmount: setPayTokenAmount,
    pointAmount: receivePointAmount,
    setPointAmount: setReceivePointAmount,
    tokenAmountValue: payTokenAmountValue,
    currentMarket,
    points,
    pointPrice,

    isCreating,
    handleCreate,
    isCreateSuccess,
  } = useCreateAction(marketplace, "buy");

  const {
    collateralRate,
    setCollateralRate,
    taxForSub,
    setTaxForSub,
    settleMode,
    setSettleMode,
    note,
    setNote,
  } = useOptionOfCreate();

  const { isShouldApprove, approveAction, isApproving, approveBtnText } =
    useApprove(currentMarket.chain, payToken?.address);

  async function handleConfirmBtnClick() {
    if (isShouldApprove) {
      await approveAction();
    } else {
      handleCreate({
        collateralRate: String(Number(collateralRate || 100) * 100),
        settleMode,
        taxForSub: String(Number(taxForSub || 3) * 100),
      });
    }
  }

  useEffect(() => {
    if (isCreateSuccess) {
      onSuccess();
    }
  }, [isCreateSuccess, onSuccess]);

  return (
    <div className="mt-6 flex flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col">
        <InputPanel
          value={payTokenAmount}
          onValueChange={setPayTokenAmount}
          topText={<>{cot("txt-YouPay")}</>}
          bottomText={<>${payTokenAmountValue}</>}
          tokenSelect={
            <StableTokenSelectDisplay
              chain={currentMarket.chain}
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
              {cot("txt-YouDLikeToReceive")}
              <WithTip align="start">
                {cot("tip-YouDLikeToReceive", {
                  pointName: marketplace.item_name,
                })}
              </WithTip>
            </div>
          }
          bottomText={
            <>
              1 {marketplace.item_name} = ${formatNum(pointPrice)}
            </>
          }
          tokenSelect={
            <PointTokenSelectDisplay
              points={points || []}
              point={receivePoint}
              setPoint={setReceivePoint}
            />
          }
        />

        <div className="mt-4 flex items-center justify-between space-x-3">
          <SettleModeSelect value={settleMode} onValueChange={setSettleMode} />
          <CollateralRateInput
            value={collateralRate}
            onValueChange={setCollateralRate}
          />
          <TaxForSubTrades value={taxForSub} onValueChange={setTaxForSub} />
        </div>

        <OrderNoteAndFee value={note} onValueChange={setNote} type={"buy"} />
      </div>

      <WithWalletConnectBtn className="w-full" onClick={handleConfirmBtnClick}>
        <button
          disabled={isCreating || isApproving}
          className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white"
        >
          {!isShouldApprove ? cot("btn-ConfirmMakerOrder") : approveBtnText}
        </button>
      </WithWalletConnectBtn>
    </div>
  );
}
