import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useAbortOrderAsTaker } from "@/lib/hooks/contract/use-abort-order-as-taker";
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

  const {
    isLoading,
    write: abortOrderAsTakerAction,
    isSuccess,
  } = useAbortOrderAsTaker(holding.offer.marketplace.chain);

  function handleConfirm() {
    abortOrderAsTakerAction({
      offerId: holding.offer.offer_id,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WithWalletConnectBtn onClick={() => handleConfirm()}>
      <button
        disabled={isLoading}
        className="data-[disabled=true]:bg-gra flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black"
      >
        <span>{mst("btn-Abort")}</span>
      </button>
    </WithWalletConnectBtn>
  );
}
