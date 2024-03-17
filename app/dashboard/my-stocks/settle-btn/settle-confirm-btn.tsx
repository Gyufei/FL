export default function SettleConfirmBtn({
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
      className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-yellow text-black"
    >
      Settle
    </button>
  );
}
