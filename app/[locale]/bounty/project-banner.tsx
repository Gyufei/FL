"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/img/mock/image@2x (2).png",
    title: "Winter Wonderland - Solana",
    subtitle: "A winter wonderland in Solana Awaits",
    participants: 10000,
  },
  {
    id: 2,
    image: "/img/mock/image@2x (2).png",
    title: "Snow Quest",
    subtitle: "Explore the frozen peaks",
    participants: 8500,
  },
  {
    id: 3,
    image: "/img/mock/image@2x (2).png",
    title: "Winter Challenge",
    subtitle: "Race through the ice valleys",
    participants: 12000,
  },
];

export default function FeaturedCard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="mx-auto w-full p-4">
      <div className="relative flex overflow-hidden rounded-xl bg-[#FAFAFA]">
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-yellow" />
          <span className="text-[16px]">Featured</span>
        </div>
        <div className="flex flex-col justify-center gap-2 px-7">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-[#2D2E33]" : "bg-[#D8D8D8]"
              }`}
            />
          ))}
        </div>

        <div className="grid flex-1 gap-6 p-6 md:grid-cols-2">
          <div className="flex max-w-xl flex-col justify-center space-y-6">
            {/* Title Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/img/mock/矩形 1321@1x (2).png"
                  alt=" icon"
                  className="rounded-lg object-cover"
                  width={18}
                  height={18}
                />
                <span className="text-[12px] text-[#2D2E33]">Solana</span>
              </div>
              <h2 className="text-[36px]">{slides[currentSlide].title}</h2>
              <p className="text-[#99A0AF]">{slides[currentSlide].subtitle}</p>
            </div>

            {/* Participants */}
            {/* <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src=""
                    alt="Participant 1"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src=""
                    alt="Participant 2"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm font-medium">
                {(slides[currentSlide].participants / 1000).toFixed(1)}K
                Participants
              </span>
            </div> */}
            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-[#fafafa]"></div>
                <div>
                  <div className="text-[16px] ">Dec 5, 6:30 AM</div>
                  <div className="text-[12px] text-[#99A0AF]">
                    to Jan 15, 6:30 AM
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#fafafa] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#4CBF87]"></span>
                <span className="rounded bg-[#fafafa] text-[12px]">LIVE</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={slides[currentSlide].image}
                width={800}
                height={600}
                alt="Featured image"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
