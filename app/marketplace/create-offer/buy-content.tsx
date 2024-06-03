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

export function BuyContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const { data: points } = useMarketPoints();

  const [payTokenAmount, setPayTokenAmount] = useState("0");
  const [payToken, setPayToken] = useState<IToken>({
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 6,
  } as IToken);

  useEffect(() => {
    if (points) {
      setReceivePoint(
        points.find(
          (point) => point.marketplaceId === marketplace.market_place_id,
        ) || null,
      );
    }
  }, [points, marketplace]);

  const [receivePoint, setReceivePoint] = useState<IPoint | null>(null);
  const [receivePointAmount, setReceivePointAmount] = useState("");

  const [collateralRate, setCollateralRate] = useState("");
  const [taxForSub, setTaxForSub] = useState("");
  const [settleMode, setSettleMode] = useState(SettleModes[0]);

  const [note, setNote] = useState("");

  const payAmountValue = useMemo(() => {
    if (!payTokenAmount) return 0;

    return NP.times(payTokenAmount, 1);
  }, [payTokenAmount]);

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
    if (!receivePoint || !payToken || !payTokenAmount || !receivePointAmount) {
      return;
    }

    writeAction({
      tokenAmount: Number(payTokenAmount),
      pointAmount: Number(receivePointAmount),
      collateralRate: Number(collateralRate || 100) * 100,
      taxForSub: Number(taxForSub || 3) * 100,
      settleMode: settleMode,
      note: note,
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
          topText={<>You pay</>}
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
              You&apos;d like to receive
              <WithTip>
                When buying {marketplace.point_name}s, you need to wait until
                the {marketplace.point_name}s convert into the protocol&apos;s
                tokens before you can receive tokens.
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

        <OrderNoteAndFee value={note} onValueChange={setNote} />
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
          Confirm Maker Order
        </button>
      </WithWalletConnectBtn>
    </div>
  );
}
