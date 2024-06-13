import Image from "next/image";
import { useState } from "react";
import ConfirmAskTakerSettleDialog from "./confirm-ask-taker-settle-dialog";
import { IStock } from "@/lib/types/stock";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";

export default function SettleDrawerBtn({
  order,
  onSuccess,
}: {
  order: IStock;
  onSuccess: () => void;
}) {
  const [settleConfirmShow, setSettleConfirmShow] = useState(false);

  function handleDrawerOpen(open: boolean) {
    setSettleConfirmShow(open);
  }

  return (
    <div>
      <WithWalletConnectBtn
        onClick={() => handleDrawerOpen(true)}
        shouldSignIn={true}
      >
        <div className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black data-[disabled=true]:bg-gray">
          <Image src="/icons/settle.svg" width={16} height={16} alt="list" />
          <span>Settle</span>
        </div>
      </WithWalletConnectBtn>

      <ConfirmAskTakerSettleDialog
        stock={order}
        open={settleConfirmShow}
        onOpenChange={setSettleConfirmShow}
        onSuccess={onSuccess}
      />
    </div>
  );
}
