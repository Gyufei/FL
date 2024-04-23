import { useWalletConnect } from "@/lib/hooks/web3/use-wallet-connect";
import { useSetAtom } from "jotai";
import { WalletSelectDialogVisibleAtom } from "./wallet-select-dialog";
import { cn } from "@/lib/utils/common";

export default function WithWalletConnectBtn({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const { connected } = useWalletConnect();

  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  function handleClick() {
    if (!connected) {
      setWalletSelectDialogVisible(true);
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
