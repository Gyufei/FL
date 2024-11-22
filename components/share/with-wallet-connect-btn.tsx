import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useWeb3Wallet } from "@/lib/hooks/web3/use-web3-wallet";
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
  const { connected } = useChainWallet(chain);

  const { toConnectWallet } = useWeb3Wallet();

  function handleClick() {
    if (!connected) {
      toConnectWallet(chain);
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
