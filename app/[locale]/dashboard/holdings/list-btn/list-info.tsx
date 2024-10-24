import { useTranslations } from "next-intl";

export default function ListInfo({
  id,
  inherit,
  origin,
}: {
  id: string;
  inherit: string;
  origin: string;
}) {
  const T = useTranslations("drawer-ListOrder");
  return (
    <div className="mb-4 flex justify-between space-x-3">
      <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
        <div className="text-xs leading-[18px] text-gray">
          {T("cap-StockId")}
        </div>
        <div className="leading-6 text-black">#{id}</div>
      </div>
      <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
        <div className="text-xs leading-[18px] text-gray">
          {T("cap-Prev")} Maker/Taker
        </div>
        <div className="max-w-[120px] truncate leading-6 text-black">
          #{inherit}
        </div>
      </div>
      <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
        <div className="text-xs leading-[18px] text-gray">
          {T("cap-OriginatedFrom")}
        </div>
        <div className="max-w-[120px] truncate leading-6 text-black">
          #{origin}
        </div>
      </div>
    </div>
  );
}
