import { useConnectModal } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { ChainType } from "@/lib/types/chain";

export default function WithWalletConnectBtn({
  chain,
  onClick,
  children,
  className = "",
}: {
  chain?: ChainType;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const { openConnectModal } = useConnectModal();
  const { connected } = useChainWallet(chain);

  function handleClick() {
    if (!connected) {
      openConnectModal && openConnectModal();
    } else {
      onClick();
    }
  }

  return (
    <div className={cn("", className)} onClick={handleClick}>
      {children}
    </div>
  );
}
