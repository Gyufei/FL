import { useWalletConnect } from "@/lib/hooks/web3/use-wallet-connect";
import { useSetAtom } from "jotai";
import { WalletSelectDialogVisibleAtom } from "./wallet-select-dialog";

export default function WithWalletConnectBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
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

  return <div onClick={handleClick}>{children}</div>;
}
