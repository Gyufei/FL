import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useRollin } from "@/lib/hooks/contract/use-rollin";
// import { differenceInMinutes } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ChainType } from "@/lib/types/chain";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";

export default function RollInBtn() {
  const T = useTranslations("cd-AccountOverview");
  const { connected } = useChainWallet(ChainType.ETH);

  const {
    isLoading,
    isSuccess,
    write: rollinAction,
    // getRollingData,
  } = useRollin(ChainType.SOLANA);

  const [isSign, setIsSign] = useState(false);

  function handleSign() {
    if (isSign) {
      toast("Already rollin", {
        icon: (
          <AlertCircle
            style={{
              color: "#B38828",
            }}
            className="h-6 w-6"
          />
        ),
      });
    }
    if (isLoading || isSign) return;

    rollinAction(undefined);
  }

  async function getRollinState() {
    // const res = await getRollingData();
    // const rollinAt = res.rollinAt * 1000;

    // const pastTime = differenceInMinutes(new Date(), new Date(rollinAt));
    // const hasSign = pastTime < 60;
    // setIsSign(hasSign);
    setIsSign(false);
  }

  useEffect(() => {
    if (!connected) return;

    getRollinState();
  }, [connected]);

  useEffect(() => {
    if (isSuccess) {
      setIsSign(true);
      getRollinState();
    }
  }, [isSuccess]);

  return (
    <WithWalletConnectBtn
      onClick={handleSign}
      className="pointer-events-none cursor-not-allowed"
    >
      <div className="flex h-7 w-[74px] cursor-pointer items-center justify-center rounded-[52px] border border-[#d3d4d6] text-sm leading-5 text-[#d3d4d6] hover:border-[#FFA95B] hover:text-[#FFA95B]">
        {T("btn-Rollin")}
      </div>
    </WithWalletConnectBtn>
  );
}
