import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { usePrivyWallet } from "@/lib/hooks/web3/use-privy-wallet";

export default function WithWalletConnectBtn({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const { connected } = useChainWallet();

  const { toConnectWallet } = usePrivyWallet();

  function handleClick() {
    if (!connected) {
      toConnectWallet();
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
