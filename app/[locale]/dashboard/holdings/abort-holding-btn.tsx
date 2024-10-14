import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useAbortBidHolding } from "@/lib/hooks/contract/use-abort-bid-holding";
import { useHoldingFormat } from "@/lib/hooks/holding/use-holding-format";
import { IHolding } from "@/lib/types/holding";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function AbortHoldingBtn({
  holding,
  onSuccess,
}: {
  holding: IHolding;
  onSuccess: () => void;
}) {
  const mst = useTranslations("page-MyStocks");

  const { isNativeToken } = useHoldingFormat({ holding });

  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useAbortBidHolding({
    marketplaceStr: holding.marketplace.market_place_id,
    makerStr: holding.offer_maker,
    offerStr: holding.offer_id,
    holdingStr: holding.stock_account,
    isNativeToken: isNativeToken,
  });

  function handleConfirm() {
    writeAction(undefined);
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WithWalletConnectBtn onClick={() => handleConfirm()} >
      <button
        disabled={isLoading}
        className="data-[disabled=true]:bg-gra flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black"
      >
        <span>{mst("btn-Abort")}</span>
      </button>
    </WithWalletConnectBtn>
  );
}
