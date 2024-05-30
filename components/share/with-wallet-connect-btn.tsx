import { useWalletConnect } from "@/lib/hooks/web3/use-wallet-connect";
import { useAtomValue, useSetAtom } from "jotai";
import { WalletSelectDialogVisibleAtom } from "./wallet-select-dialog";
import { cn } from "@/lib/utils/common";
import { AccessTokenAtom, ShowSignDialogAtom } from "@/lib/states/user";

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
  const { connected } = useWalletConnect();

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
      onClick();
    }
  }

  return (
    <div className={cn("", className)} onClick={handleClick}>
      {children}
    </div>
  );
}
