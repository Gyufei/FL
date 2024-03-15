import { Input } from "@/components/ui/input";

export default function OrderNote({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (_v: string) => void;
}) {
  function handleInputNote(v: string) {
    if (v.length > 50) {
      return;
    }

    onValueChange(v);
  }

  return (
    <div className="mt-4 flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="text-sm  leading-6 text-black">Order Note</div>
          <div className="text-xs leading-[18px] text-gray">(Optional)</div>
        </div>
        <div className="text-xs leading-[18px] text-gray">
          {value.length} / 50
        </div>
      </div>
      <div>
        <Input
          value={value}
          onChange={(e) => handleInputNote(e.target.value)}
          placeholder="Anything you want to inform the sellers..."
          className="rounded-xl border border-[#d8d8d8] focus:border-black"
        />
      </div>
    </div>
  );
}
