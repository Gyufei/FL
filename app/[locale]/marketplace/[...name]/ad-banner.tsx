import Image from "next/image";
import { cn } from "@/lib/utils/common";
import { useState } from "react";

export default function AdBanner({ className }: { className?: string }) {
  const images = [
    "/img/ad-placeholder-1.png",
    "/img/ad-placeholder-3.png",
    "/img/ad-placeholder-3.png",
  ];

  const [mainSrc, setMainSrc] = useState(images[0]);

  function handleClick(src: string) {
    setMainSrc(src);
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={mainSrc}
        width={280}
        height={160}
        alt="ad1"
        className="rounded-2xl"
      />
      <div className="absolute top-0 bottom-0 right-3 my-3 flex flex-col items-center justify-between gap-2">
        {images.map((src, index) => (
          <Image
            onClick={() => handleClick(src)}
            key={index}
            src={src}
            width={64}
            height={40}
            alt="ad1"
            className="cursor-pointer rounded-lg border border-white"
          />
        ))}
      </div>
    </div>
  );
}
