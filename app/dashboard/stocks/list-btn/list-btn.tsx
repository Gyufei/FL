import Image from "next/image";

export default function ListBtn() {
  return (
    <div className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black">
      <Image src="/icons/upload.svg" width={16} height={16} alt="list" />
      <span>list</span>
    </div>
  );
}
