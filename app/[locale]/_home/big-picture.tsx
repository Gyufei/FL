"use client";

import { useState } from "react";
import Image from "next/image";

export default function BigPicture() {
  const videoSrc =
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

  const [videoIsPlay, setVideoIsPlay] = useState(false);

  return (
    <div className="mx-4 flex flex-col items-center py-20 sm:mx-[259px]">
      <div className="text-[24px] leading-9 text-black sm:text-[40px] sm:leading-[60px]">
        See the big picture
      </div>
      <div
        data-play={videoIsPlay}
        className="relative mt-10 overflow-hidden rounded-3xl"
      >
        <video
          id="video"
          className="h-[192px] w-full sm:h-[562px] sm:w-[1000px]"
          preload="none"
          controls
          onPlay={() => setVideoIsPlay(true)}
          onPause={() => setVideoIsPlay(false)}
          onEnded={() => setVideoIsPlay(false)}
        >
          <source src={videoSrc} type="application/x-mpegURL"></source>
        </video>
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-[rgba(45,46,51,0.3)]">
          <Image src="/icons/play.svg" width={120} height={120} alt="play" />
        </div>
      </div>
    </div>
  );
}
