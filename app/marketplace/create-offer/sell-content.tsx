import NP from "number-precision";
import Image from "next/image";
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
import { useCreateAskMaker } from "@/lib/hooks/contract/use-create-ask-maker";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketPoints } from "@/lib/hooks/api/use-market-points";
import { SettleModeSelect, SettleModes } from "./settle-mode-select";

export function SellContent({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const { data: points } = useMarketPoints();

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
    symbol: "USDC",
    logoURI: "/icons/usdc.svg",
    decimals: 6,
  } as IToken);

  const [breachFee, setBreachFee] = useState("");
  const [taxForSub, setTaxForSub] = useState("");
  const [settleMode, setSettleMode] = useState(SettleModes[0]);

  const [note, setNote] = useState("");

  const sellPrice = useMemo(() => {
    if (!receiveTokenAmount) {
      return 0;
    }
    return NP.times(receiveTokenAmount, 1);
  }, [receiveTokenAmount]);

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
  } = useCreateAskMaker({
    marketplaceStr: marketplace.market_place_id,
  });

  async function handleCreate() {
    if (!sellPointAmount || !receiveTokenAmount) {
      return;
    }

    writeAction({
      sellPointAmount: Number(sellPointAmount),
      receiveTokenAmount: Number(receiveTokenAmount),
      breachFee: Number(breachFee || 50) * 100,
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
          value={sellPointAmount}
          onValueChange={handleSellPayChange}
          topText={<>You will sell</>}
          bottomText={
            <>
              1 {marketplace.point_name} = ${pointPrice}
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
              You&apos;d like to receive
              <WithTip>
                <div className="relative">
                  When buying {marketplace.point_name}s, you need to wait until
                  the {marketplace.point_name}s convert into the protocol&apos;s
                  tokens before you can receive tokens.
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
          bottomText={<>Required collateral ${sellPrice}</>}
          tokenSelect={
            <StableTokenSelectDisplay
              token={receiveToken}
              setToken={setReceiveToken}
            />
          }
        />

        <div className="mt-4 flex items-center justify-between space-x-3">
          <SettleModeSelect value={settleMode} onValueChange={setSettleMode} />
          <SettleBreachFee value={breachFee} onValueChange={setBreachFee} />
          <TaxForSubTrades value={taxForSub} onValueChange={setTaxForSub} />
        </div>

        <OrderNoteAndFee value={note} onValueChange={setNote} />
      </div>

      <button
        disabled={isCreateLoading}
        onClick={handleCreate}
        className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
      >
        Confirm Maker Order
      </button>
    </div>
  );
}
