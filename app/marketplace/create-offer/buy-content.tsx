import NP from "number-precision";
import { useEffect, useMemo, useState } from "react";
import { IPoint, IToken } from "@/lib/types/token";

import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";
import { PointTokenSelectDisplay } from "./point-token-display";

import ArrowBetween from "./arrow-between";
import { WithTip } from "./with-tip";
import SettleBreachFee from "./settle-breach-fee";
import TaxForSubTrades from "./tax-for-sub-trades";
import OrderNoteAndFee from "./order-note-and-fee";
import { useCreateBidMaker } from "@/lib/hooks/contract/use-create-bid-maker";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketPoints } from "@/lib/hooks/api/use-market-points";

export function BuyContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const { data: points } = useMarketPoints();

  const [payTokenAmount, setPayTokenAmount] = useState("");
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

  const [breachFee, setBreachFee] = useState("");
  const [taxForSub, setTaxForSub] = useState("");

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
  } = useCreateBidMaker({
    marketplaceStr: receivePoint?.marketplaceId || "",
  });

  function handleDeposit() {
    if (!receivePoint || !payToken || !payTokenAmount || !receivePointAmount) {
      return;
    }

    writeAction({
      payTokenAmount: Number(payTokenAmount),
      receivePointAmount: Number(receivePointAmount),
      breachFee: Number(breachFee || 50) * 100,
      taxForSub: Number(taxForSub || 3) * 100,
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
          <SettleBreachFee value={breachFee} onValueChange={setBreachFee} />
          <TaxForSubTrades value={taxForSub} onValueChange={setTaxForSub} />
        </div>

        <OrderNoteAndFee value={note} onValueChange={setNote} />
      </div>

      <button
        disabled={isCreateLoading}
        onClick={handleDeposit}
        className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white"
      >
        Confirm Maker Order
      </button>
    </div>
  );
}
