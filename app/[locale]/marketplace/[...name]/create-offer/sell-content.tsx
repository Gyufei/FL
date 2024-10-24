import Image from "next/image";
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

export function SellContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("drawer-CreateOffer");

  const {
    token: receiveToken,
    setToken: setReceiveToken,
    point: sellPoint,
    setPoint: setSellPoint,
    tokenAmount: receiveTokenAmount,
    setTokenAmount: setReceiveAmount,
    pointAmount: sellPointAmount,
    setPointAmount: setSellPointAmount,
    tokenAmountValue: sellPrice,
    currentMarket,
    points,
    pointPrice,

    isCreating,
    handleCreate,
    isCreateSuccess,
  } = useCreateAction(marketplace, "sell");

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
    useApprove(currentMarket?.chain || "", receiveToken?.address);

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
          value={sellPointAmount}
          onValueChange={setSellPointAmount}
          topText={<>{T("txt-YouWillSell")}</>}
          bottomText={
            <>
              1 {currentMarket.item_name} = ${formatNum(pointPrice)}
            </>
          }
          tokenSelect={
            <PointTokenSelectDisplay
              points={points || []}
              point={sellPoint}
              setPoint={setSellPoint}
            />
          }
        />

        <ArrowBetween className="-my-4 self-center" />

        <InputPanel
          value={receiveTokenAmount}
          onValueChange={setReceiveAmount}
          topText={
            <div className="flex items-center">
              {T("txt-YouDLikeToReceive")}
              <WithTip align="start">
                <div className="relative">
                  {T("tip-YouDLikeToReceive", {
                    pointName: currentMarket.item_name,
                  })}
                  <Image
                    src="/icons/info-tip.svg"
                    height={30}
                    width={30}
                    alt="info"
                    className="absolute -bottom-[14px] -right-[18px] !text-[#E0FF62]"
                  />
                </div>
              </WithTip>
            </div>
          }
          bottomText={
            <>
              {T("txt-RequiredCollateral")} ${sellPrice}
            </>
          }
          tokenSelect={
            <StableTokenSelectDisplay
              chain={currentMarket.chain}
              token={receiveToken}
              setToken={setReceiveToken}
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

        <OrderNoteAndFee value={note} onValueChange={setNote} type={"sell"} />
      </div>

      <WithWalletConnectBtn className="w-full" onClick={handleConfirmBtnClick}>
        <button
          disabled={isCreating || isApproving}
          className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
        >
          {!isShouldApprove ? T("btn-ConfirmMakerOrder") : approveBtnText}
        </button>
      </WithWalletConnectBtn>
    </div>
  );
}
