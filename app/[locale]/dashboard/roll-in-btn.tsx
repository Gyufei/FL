import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useRollin } from "@/lib/hooks/contract/use-rollin";
import { useWalletConnect } from "@/lib/hooks/web3/use-wallet-connect";
import { isSameDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function RollInBtn() {
  const T = useTranslations("cd-AccountOverview");
  const { connected } = useWalletConnect();

  const {
    isLoading,
    isSuccess,
    write: rollinAction,
    getRollingData,
  } = useRollin();

  const [isSign, setIsSign] = useState(false);

  function handleSign() {
    if (isLoading || isSign) return;

    rollinAction(undefined);
  }

  async function getRollinState() {
    const res = await getRollingData();
    const rollinAt = res.rollinAt * 1000;

    const hasSign = isSameDay(new Date(), new Date(rollinAt));
    setIsSign(hasSign);
  }

  useEffect(() => {
    if (!connected) return;

    getRollinState();
  }, [connected]);

  useEffect(() => {
    if (isSuccess) {
      setIsSign(true);
    }
  }, [isSuccess]);

  return (
    <WithWalletConnectBtn shouldSignIn={true} onClick={handleSign}>
      <div
        data-sign={isSign}
        className="flex h-7 w-[74px] cursor-pointer items-center justify-center rounded-[52px] border border-[#FFA95B] text-sm leading-5 text-[#FFA95B] data-[sign=true]:cursor-default data-[sign=true]:border-[#d3d4d6] data-[sign=true]:text-[#d3d4d6]"
      >
        {T("btn-Rollin")}
      </div>
    </WithWalletConnectBtn>
  );
}
