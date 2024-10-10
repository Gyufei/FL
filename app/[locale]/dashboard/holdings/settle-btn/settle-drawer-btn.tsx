import Image from "next/image";
import { useState } from "react";
import ConfirmAskTakerSettleDialog from "./confirm-ask-taker-settle-dialog";
import { IHolding } from "@/lib/types/holding";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";

export default function SettleDrawerBtn({
  holding,
  onSuccess,
}: {
  holding: IHolding;
  onSuccess: () => void;
}) {
  const mst = useTranslations("page-MyStocks");
  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

  function handleDrawerOpen(open: boolean) {
    setSettleConfirmShow(open);
  }

  return (
    <div>
      <WithWalletConnectBtn
        onClick={() => handleDrawerOpen(true)}
        
      >
        <div className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black data-[disabled=true]:bg-gray">
          <Image src="/icons/settle.svg" width={16} height={16} alt="list" />
          <span>{mst("btn-Settle")}</span>
        </div>
      </WithWalletConnectBtn>

      <ConfirmAskTakerSettleDialog
        holding={holding}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
        onSuccess={onSuccess}
      />
    </div>
  );
}
