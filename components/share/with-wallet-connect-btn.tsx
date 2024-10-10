import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useSwitchInEvm } from "@/lib/hooks/web3/evm/use-switch-in-evm";
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
  const { checkAndSwitchInEvm } = useSwitchInEvm();

  const { toConnectWallet } = usePrivyWallet();

  function handleClick() {
    if (!connected) {
      toConnectWallet();
    } else {
      checkAndSwitchInEvm();
      onClick();
    }
  }

  return (
    <div className={cn("", className)} onClick={handleClick}>
      {children}
    </div>
  );
}
