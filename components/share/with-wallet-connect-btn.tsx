import { useAtomValue, useSetAtom } from "jotai";
import { WalletSelectDialogVisibleAtom } from "./wallet-select-dialog";
import { cn } from "@/lib/utils/common";
import { AccessTokenAtom, ShowSignDialogAtom } from "@/lib/states/user";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useSwitchInEvm } from "@/lib/hooks/web3/evm/use-switch-in-evm";

export default function WithWalletConnectBtn({
  onClick,
  children,
  shouldSignIn = false,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  shouldSignIn?: boolean;
  className?: string;
}) {
  const { connected } = useChainWallet();
  const { checkAndSwitchInEvm } = useSwitchInEvm();

  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  const token = useAtomValue(AccessTokenAtom);
  const setShowSignInDialog = useSetAtom(ShowSignDialogAtom);

  function handleClick() {
    if (!connected) {
      setWalletSelectDialogVisible(true);
    } else if (connected && shouldSignIn && !token) {
      setShowSignInDialog(true);
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
