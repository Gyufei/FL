import Image from "next/image";

export default function DrawerTitle({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-[10px]">
        <div className="h-6 w-6 rounded-lg bg-yellow"></div>
        <div className="text-xl leading-[30px] text-black">{title}</div>
      </div>
      <Image
        src="/icons/close.svg"
        width={24}
        height={24}
        alt="close"
        className="cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}
