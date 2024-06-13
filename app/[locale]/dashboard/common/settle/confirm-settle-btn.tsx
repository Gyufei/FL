import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";

export default function ConfirmSettleBtn({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <WithWalletConnectBtn className="w-full" onClick={onClick} shouldSignIn={true}>
      <button
        disabled={disabled}
        className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        Confirm this settlement
      </button>
    </WithWalletConnectBtn>
  );
}
