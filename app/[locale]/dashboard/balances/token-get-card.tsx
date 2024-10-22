import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";

import Image from "next/image";

import { formatNum } from "@/lib/utils/number";
import { useTranslations } from "next-intl";
import { useWithdrawToken } from "@/lib/hooks/contract/use-with-draw-token";
import { useWithdrawItem } from "@/lib/hooks/contract/use-with-draw-item";
import { IToken } from "@/lib/types/token";
import { useEffect } from "react";

export function TokenGetCard({
  tokenInfo,
  amount,
  withdrawerName,
  onSuccess,
}: {
  tokenInfo: IToken | null;
  amount: number;
  withdrawerName: string | null;
  onSuccess: () => void;
}) {
  const mbt = useTranslations("page-MyBalance");

  const {
    isLoading: isWdTokenLoading,
    write: wdTokenAction,
    isSuccess: isWdTokenSuccess,
  } = useWithdrawToken();

  const {
    isLoading: isWdItemLoading,
    write: wdItemAction,
    isSuccess: isWdItemSuccess,
  } = useWithdrawItem();

  function handleWithdrawToken() {
    if (isWdTokenLoading) return;
    wdTokenAction();
    //   {
    //   tokenAddress: tokenInfo?.address,
    //   withdrawerName,
    // }
  }

  function handleWithdrawItem() {
    if (isWdItemLoading) return;
    wdItemAction();
    //   {
    //   marketplaceStr: (tokenInfo as any).marketplaceId,
    //   tokenAddress: tokenInfo?.address,
    // }
  }

  useEffect(() => {
    if (isWdTokenSuccess || isWdItemSuccess) {
      onSuccess();
    }
  }, [isWdTokenSuccess, isWdItemSuccess, onSuccess]);

  return (
    <div className="flex w-[220px] flex-col items-stretch justify-between rounded-xl bg-white px-4 py-3">
      <div className="flex flex-col">
        <div className="text-sm leading-5 text-lightgray">
          {mbt("lb-Token")}
        </div>
        <div className="flex items-center gap-x-1">
          <Image
            src={tokenInfo?.logoURI || ""}
            width={16}
            height={16}
            className="rounded-full"
            alt="token logo"
          />
          <div className="text-base leading-6 text-black">
            {tokenInfo?.symbol}
          </div>
        </div>
      </div>

      <div className="mt-[10px] flex items-end justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-5 text-lightgray">
            {mbt("lb-Amount")}
          </div>
          <div className="text-base leading-6 text-black">
            {formatNum(amount)}
          </div>
        </div>
        <WithWalletConnectBtn
          onClick={withdrawerName ? handleWithdrawToken : handleWithdrawItem}
        >
          <div
            data-active={amount > 0}
            className="flex h-7 w-14 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d6] hover:border-0 hover:bg-yellow data-[active=false]:pointer-events-none data-[active=false]:opacity-70"
          >
            {mbt("btn-Get")}
          </div>
        </WithWalletConnectBtn>
      </div>
    </div>
  );
}
