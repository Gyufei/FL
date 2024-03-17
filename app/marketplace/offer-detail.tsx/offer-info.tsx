import Image from "next/image";
import { CircleProgress } from "@/components/share/circle-progress";

export default function OfferInfo({
  img1,
  img2,
  name,
  no,
  progress,
}: {
  img1: string;
  img2: string;
  name: string;
  no: number;
  progress: number;
}) {
  return (
    <div className="flex items-center justify-between">
      {/* avatar and name number */}
      <div className="flex items-center">
        <div className="flex items-center space-x-4">
          <div className="relative h-fit">
            <Image
              src={img1}
              width={60}
              height={60}
              alt="avatar"
              className="rounded-full"
            />
            <div className="absolute right-0 bottom-0 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-white">
              <Image
                src={img2}
                width={11}
                height={9}
                alt="avatar"
                className="rounded-full"
              />
            </div>
          </div>

          <div>
            <div className="mb-[2px] text-2xl leading-9 text-black">{name}</div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{no}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <CircleProgress
          className="scale-[1.1385]"
          percentage={progress * 100}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm leading-[20px] text-black">
          {progress * 100}%
        </div>
      </div>
    </div>
  );
}
