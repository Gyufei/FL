import { useEffect, useState } from "react";
import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";
import ArrowBetween from "./arrow-between";
import { WithTip } from "@/components/share/with-tip";
import CollateralRateInput from "./collateral-rate-input";
import TaxForSubTrades from "./tax-for-sub-trades";
import OrderNoteAndFee from "./order-note-and-fee";
import { IMarketplace } from "@/lib/types/marketplace";
import { SettleModeSelect } from "./settle-mode-select";
import { useTranslations } from "next-intl";
import { formatNum } from "@/lib/utils/number";
import { useCreateAction } from "./use-create-action";
import { useOptionOfCreate } from "./use-option-of-create";
import { usePairApprove } from "./use-pair-approve";
import { PointTokenDisplay } from "./point-token-display";
import { reportEvent } from "@/lib/utils/analytics";
import { useCheckBalance } from "@/lib/hooks/api/use-check-balance";
import { cn } from "@/lib/utils/common";
import NP from "number-precision";
import { useCreateOfferMinPrice } from "@/lib/hooks/offer/use-create-offer-min-price";

export function BuyContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const cot = useTranslations("drawer-CreateOffer");
  const { checkMinPrice } = useCreateOfferMinPrice();

  const isOffChainFungiblePoint =
    marketplace?.market_catagory === "offchain_fungible_point";
  const isPointToken = marketplace?.market_catagory === "point_token";

  const {
    token: payToken,
    setToken: setPayToken,
    point: receivePoint,
    tokenAmount: payTokenAmount,
    setTokenAmount: setPayTokenAmount,
    pointAmount: receivePointAmount,
    setPointAmount: setReceivePointAmount,
    tokenAmountValue: payTokenAmountValue,
    currentMarket,
    pointPrice,

    isCreating,
    handleCreate,
    isCreateSuccess,
    pointDecimalNum,
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
    usePairApprove(
      currentMarket.chain,
      payToken,
      receivePoint || undefined,
      "buy",
      payTokenAmount,
    );

  const { checkBalanceInsufficient } = useCheckBalance(
    currentMarket.chain,
    payToken,
  );

  const [errorText, setErrorText] = useState("");

  async function handleConfirmBtnClick() {
    if (isShouldApprove) {
      reportEvent("click", { value: "approve" });
      await approveAction();
      return;
    }

    handleCreate({
      collateralRate: String(Number(collateralRate || 100) * 100),
      settleMode,
      taxForSub: String(Number(taxForSub || 0) * 100),
    });
    reportEvent("click", { value: "confirmOffer-buy" });
  }

  useEffect(() => {
    setPayTokenAmount("");
  }, [payToken]);

  useEffect(() => {
    let curErrorText = "";
    if (!isShouldApprove) {
      curErrorText = checkBalanceInsufficient(payTokenAmount);
    }
    if (
      +pointPrice &&
      checkMinPrice(
        pointPrice,
        NP.times(currentMarket.last_price, pointDecimalNum),
        false,
      )
    ) {
      curErrorText = "Too big price shift";
    }

    setErrorText(curErrorText);
  }, [payTokenAmount, payToken, isShouldApprove, pointPrice]);

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
          hasError={!!errorText}
          topText={<>{cot("txt-YouPay")}</>}
          bottomText={<>${payTokenAmountValue}</>}
          tokenSelect={
            <StableTokenSelectDisplay
              chain={currentMarket.chain}
              token={payToken}
              setToken={setPayToken}
              showBalance
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
              1 {currentMarket.item_name} = ${formatNum(pointPrice)}
            </>
          }
          tokenSelect={<PointTokenDisplay point={receivePoint} />}
        />

        <div className="mt-4 flex flex-wrap items-start justify-between space-y-4 sm:space-y-0">
          {!(isOffChainFungiblePoint || isPointToken) && (
            <>
              <SettleModeSelect
                value={settleMode}
                onValueChange={setSettleMode}
              />
              <CollateralRateInput
                value={collateralRate}
                onValueChange={setCollateralRate}
              />
            </>
          )}
          <TaxForSubTrades value={taxForSub} onValueChange={setTaxForSub} />
        </div>

        <OrderNoteAndFee value={note} onValueChange={setNote} type={"buy"} />
      </div>
      <div className=" sm:mt-[140px]">
        <div className="mt-3 text-center text-[12px] text-[#FF6262]">
          {errorText}
        </div>
        <button
          onClick={handleConfirmBtnClick}
          disabled={
            isCreating ||
            isApproving ||
            !!errorText ||
            (!pointPrice && !isShouldApprove)
          }
          className={cn(
            "mt-2 flex h-12 w-full items-center justify-center rounded-2xl bg-green font-medium leading-6 text-white disabled:cursor-not-allowed disabled:bg-gray",
            isCreating || isApproving ? "dot-loading" : "",
          )}
        >
          {!isShouldApprove ? cot("btn-ConfirmMakerOrder") : approveBtnText}
        </button>
      </div>
    </div>
  );
}
