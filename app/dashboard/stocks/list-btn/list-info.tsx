export default function ListInfo({
  id,
  inherit,
  origin,
}: {
  id: string;
  inherit: string;
  origin: string;
}) {
  return (
    <div className="mb-4 flex justify-between space-x-3">
      <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
        <div className="text-xs leading-[18px] text-gray">Stock Id</div>
        <div className="leading-6 text-black">#{id}</div>
      </div>
      <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
        <div className="text-xs leading-[18px] text-gray">Prev Maker/Taker</div>
        <div className="max-w-[120px] truncate leading-6 text-black">#{inherit}</div>
      </div>
      <div className="flex-1 rounded-2xl bg-[#fafafa] p-4">
        <div className="text-xs leading-[18px] text-gray">Originated from</div>
        <div className="max-w-[120px] truncate leading-6 text-black">
          #{origin}
        </div>
      </div>
    </div>
  );
}
