import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { ReactElement } from "react";

export default function ReceiveCard({
  topText,
  bottomText,
  value,
  tokenLogo,
}: {
  topText: ReactElement;
  bottomText: ReactElement;
  value: string;
  tokenLogo: string;
}) {
  return (
    <div className="mt-3  rounded-2xl bg-white p-4">
      <div className="text-xs leading-[18px] text-gray">{topText}</div>
      <div className="mt-2 flex justify-between">
        <div className="h-[36px] text-2xl leading-[36px]">
          {formatNum(value)}
        </div>
        <Image
          src={tokenLogo}
          width={28}
          height={28}
          alt="stable token"
          className="h-7 w-7 rounded-full"
        />
      </div>
      <div className="mt-[2px] text-xs leading-[18px] text-gray">
        {bottomText}
      </div>
    </div>
  );
}
