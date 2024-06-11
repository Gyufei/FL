"use client";

import { useState } from "react";
import Image from "next/image";

export default function BigPicture() {
  const videoSrc =
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

  const [videoIsPlay, setVideoIsPlay] = useState(false);

  return (
    <div className="mx-[259px] flex flex-col items-center py-20">
      <div className="text-[40px] leading-[60px] text-black">
        See the big picture
      </div>
      <div
        data-play={videoIsPlay}
        className="relative mt-10 overflow-hidden rounded-3xl"
      >
        <video
          id="video"
          className="h-[562px] w-[1000px]"
          preload="none"
          controls
          width="640"
          height="268"
          onPlay={() => setVideoIsPlay(true)}
          onPause={() => setVideoIsPlay(false)}
          onEnded={() => setVideoIsPlay(false)}
        >
          <source src={videoSrc} type="application/x-mpegURL"></source>
        </video>
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-[rgba(45,46,51,0.3)]">
          <Image src="/icons/play.svg" width={120} height={120} alt="play" />
        </div>
      </div>
    </div>
  );
}
