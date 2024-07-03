import NP from "number-precision";
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

export function BuyContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const cot = useTranslations("drawer-CreateOffer");
  const { data: points } = useMarketPoints();
  const { data: stableToken } = useStableToken();

  const [payTokenAmount, setPayTokenAmount] = useState("0");
  const [payToken, setPayToken] = useState<IToken>(
    stableToken[0] ||
      ({
        symbol: "",
        logoURI: "/icons/empty.svg",
        decimals: isProduction ? 6 : 9,
      } as IToken),
  );

  useEffect(() => {
    if (points) {
      setReceivePoint(
        points.find(
          (point) => point.marketplaceId === marketplace.market_place_id,
        ) || null,
      );
    }
  }, [points, marketplace]);

  const { data: tokenPrice } = useTokenPrice(payToken?.address || "");
  const { checkMinPrice } = useCreateOfferMinPrice();

  const [receivePoint, setReceivePoint] = useState<IPoint | null>(null);
  const [receivePointAmount, setReceivePointAmount] = useState("");

  const [collateralRate, setCollateralRate] = useState("");
  const [taxForSub, setTaxForSub] = useState("");
  const [settleMode, setSettleMode] = useState(SettleModes[0]);

  const [note, setNote] = useState("");

  const payAmountValue = useMemo(() => {
    if (!payTokenAmount) return 0;

    return NP.times(payTokenAmount, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  const pointPrice = useMemo(() => {
    if (!receivePointAmount) {
      return 0;
    }

    return NP.divide(payAmountValue, receivePointAmount);
  }, [payAmountValue, receivePointAmount]);

  function handleBuyPayChange(v: string) {
    setPayTokenAmount(v);
  }

  const {
    isLoading: isCreateLoading,
    write: writeAction,
    isSuccess,
  } = useCreateOffer({
    marketplaceStr: receivePoint?.marketplaceId || "",
    offerType: "bid",
  });

  function handleDeposit() {
    const isPriceValid = checkMinPrice(
      pointPrice,
      Number(marketplace.minimum_price),
    );

    if (
      !receivePoint ||
      !payToken ||
      !payTokenAmount ||
      !receivePointAmount ||
      !isPriceValid
    ) {
      return;
    }

    writeAction({
      tokenAmount: Number(payTokenAmount) * 10 ** payToken.decimals,
      pointAmount: Number(receivePointAmount),
      collateralRate: Number(collateralRate || 100) * 100,
      taxForSub: Number(taxForSub || 3) * 100,
      settleMode: settleMode,
      note: note,
      isSol: payToken?.symbol === "SOL",
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
          value={payTokenAmount}
          onValueChange={handleBuyPayChange}
          topText={<>{cot("txt-YouPay")}</>}
          bottomText={<>${payAmountValue}</>}
          tokenSelect={
            <StableTokenSelectDisplay token={payToken} setToken={setPayToken} />
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
                  pointName: marketplace.point_name,
                })}
              </WithTip>
            </div>
          }
          bottomText={
            <>
              1 {marketplace.point_name} = ${pointPrice}
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

      <WithWalletConnectBtn
        className="w-full"
        onClick={handleDeposit}
        shouldSignIn={true}
      >
        <button
          disabled={isCreateLoading}
          className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white"
        >
          {cot("btn-ConfirmMakerOrder")}
        </button>
      </WithWalletConnectBtn>
    </div>
  );
}
