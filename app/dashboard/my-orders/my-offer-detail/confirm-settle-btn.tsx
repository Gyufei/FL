export default function ConfirmSettleBtn({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black disabled:opacity-70 disabled:cursor-not-allowed"
    >
      Confirm this settlement
    </button>
  );
}
