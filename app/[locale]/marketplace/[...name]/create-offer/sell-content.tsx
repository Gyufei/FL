import NP from "number-precision";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IPoint, IToken } from "@/lib/types/token";

import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";
import { PointTokenSelectDisplay } from "./point-token-display";

import ArrowBetween from "./arrow-between";
import { WithTip } from "./with-tip";
import CollateralRateInput from "./collateral-rate-input";
import TaxForSubTrades from "./tax-for-sub-trades";
import OrderNoteAndFee from "./order-note-and-fee";
import { useCreateOffer } from "@/lib/hooks/contract/use-create-offer";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketPoints } from "@/lib/hooks/api/use-market-points";
import { SettleModeSelect, SettleModes } from "./settle-mode-select";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { isProduction } from "@/lib/PathMap";
import { useTranslations } from "next-intl";
import { useStableToken } from "@/lib/hooks/api/token/use-stable-token";
import { useTokenPrice } from "@/lib/hooks/api/token/use-token-price";
import { useCreateOfferMinPrice } from "@/lib/hooks/offer/use-create-offer-min-price";
import { formatNum } from "@/lib/utils/number";
import { useApprove } from "@/lib/hooks/web3/evm/use-approve";
import { useIsNativeToken } from "@/lib/hooks/api/token/use-is-native-token";

export function SellContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("drawer-CreateOffer");
  const { data: points } = useMarketPoints();
  const { data: stableTokens } = useStableToken();

  const [sellPointAmount, setSellPointAmount] = useState("");
  const [sellPoint, setSellPoint] = useState<IPoint | null>(null);

  useEffect(() => {
    if (points) {
      setSellPoint(
        points.find(
          (point) => point.marketplaceId === marketplace.market_place_id,
        ) || null,
      );
    }
  }, [points, marketplace]);

  const [receiveTokenAmount, setReceiveAmount] = useState("");
  const [receiveToken, setReceiveToken] = useState<IToken>({
    symbol: "",
    logoURI: "/icons/empty.svg",
    decimals: isProduction ? 6 : 9,
  } as IToken);

  const { isNativeToken } = useIsNativeToken(receiveToken);
  const { data: tokenPrice } = useTokenPrice(receiveToken?.address || "");
  const { checkMinPrice } = useCreateOfferMinPrice();

  useEffect(() => {
    if (stableTokens) {
      setReceiveToken(stableTokens[0]);
    }
  }, [stableTokens]);

  const { isShouldApprove, approveAction, isApproving, approveBtnText } =
    useApprove(receiveToken?.address);

  async function handleConfirmBtnClick() {
    if (isShouldApprove) {
      await approveAction();
    } else {
      handleCreate();
    }
  }

  const [collateralRate, setCollateralRate] = useState("");
  const [taxForSub, setTaxForSub] = useState("");
  const [settleMode, setSettleMode] = useState(SettleModes[0]);

  const [note, setNote] = useState("");

  const sellPrice = useMemo(() => {
    if (!receiveTokenAmount) {
      return 0;
    }
    return NP.times(receiveTokenAmount, tokenPrice);
  }, [receiveTokenAmount, tokenPrice]);

  const pointPrice = useMemo(() => {
    if (!sellPointAmount) {
      return 0;
    }

    return NP.divide(sellPrice, sellPointAmount);
  }, [sellPrice, sellPointAmount]);

  function handleSellPayChange(v: string) {
    setSellPointAmount(v);
  }

  const {
    isLoading: isCreateLoading,
    write: writeAction,
    isSuccess,
  } = useCreateOffer({
    offerType: "ask",
    marketplaceStr: marketplace.market_place_id,
  });

  async function handleCreate() {
    const isPriceValid = checkMinPrice(
      pointPrice,
      Number(marketplace.minimum_price),
    );

    if (!sellPointAmount || !receiveTokenAmount || !isPriceValid) {
      return;
    }

    writeAction({
      pointAmount: Number(sellPointAmount),
      tokenAmount: NP.times(
        receiveTokenAmount,
        10 ** receiveToken.decimals,
      ).toFixed(),
      collateralTokenAddr: receiveToken.address,
      collateralRate: Number(collateralRate || 100) * 100,
      taxForSub: Number(taxForSub || 3) * 100,
      settleMode: settleMode,
      note: note,
      isNativeToken,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return (
    <div className="mt-6 flex flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col">
        <InputPanel
          value={sellPointAmount}
          onValueChange={handleSellPayChange}
          topText={<>{T("txt-YouWillSell")}</>}
          bottomText={
            <>
              1 {marketplace.point_name} = ${formatNum(pointPrice)}
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
                    pointName: marketplace.point_name,
                  })}
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
          bottomText={
            <>
              {T("txt-RequiredCollateral")} ${sellPrice}
            </>
          }
          tokenSelect={
            <StableTokenSelectDisplay
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

      <WithWalletConnectBtn
        className="w-full"
        onClick={handleConfirmBtnClick}
        shouldSignIn={true}
      >
        <button
          disabled={isCreateLoading || isApproving}
          className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
        >
          {!isShouldApprove ? T("btn-ConfirmMakerOrder") : approveBtnText}
        </button>
      </WithWalletConnectBtn>
    </div>
  );
}
