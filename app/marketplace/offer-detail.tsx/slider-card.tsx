import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { Slider } from "@/components/ui/slider";
import { ReactElement } from "react";

export default function SliderCard({
  topText,
  value,
  sliderValue,
  sliderMax,
  tokenLogo,
  bottomText,
  setSliderValue,
}: {
  topText: ReactElement;
  value: number;
  sliderValue: number;
  sliderMax: number;
  tokenLogo: string;
  bottomText: ReactElement;
  setSliderValue: (_v: number) => void;
}) {
  return (
    <div className="mt-5 rounded-2xl bg-white p-4">
      <div className="text-xs leading-[18px] text-gray">{topText}</div>
      <div className="mt-2 flex justify-between">
        <div className="text-2xl leading-[36px]">{formatNum(value)}</div>
        <Image src={tokenLogo} width={28} height={28} alt="stable token" />
      </div>
      <div className="mt-3 flex">
        <Slider
          value={[sliderValue]}
          onValueChange={(val) => setSliderValue(val[0])}
          max={sliderMax}
          step={1}
        />
        <div className="ml-4 mr-3 flex h-5 items-center rounded-full border border-[#eee] px-[10px] text-[10px] leading-4 text-black">
          {sliderValue}%
        </div>
        <div
          onClick={() => setSliderValue(sliderMax)}
          className="flex h-5 cursor-pointer items-center rounded-full bg-yellow px-[10px] text-[10px] leading-4 text-black"
        >
          Max
        </div>
      </div>
      <div className="text-xs leading-[18px] text-gray">
        {bottomText}
        {/* ~${formatNum(offerDetail.offerValue)} */}
      </div>
    </div>
  );
}
