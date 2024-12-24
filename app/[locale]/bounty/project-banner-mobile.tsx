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

export default function ProjectBannerMobile() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full">
      <div className=" mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-yellow" />
          <span className="text-[16px]">Featured</span>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2">
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
      </div>
      <div className="relative overflow-hidden rounded-xl bg-[#FAFAFA]">
        {/* Featured Badge */}

        {/* Main Content */}
        <div className="relative">
          {/* Background Image */}
          <div className="relative h-[180px] w-full">
            <Image
              src={slides[currentSlide].image}
              fill
              alt="Featured image"
              className="object-cover"
            />
          </div>

          {/* Content Overlay */}
          <div className="p-4">
            <div className="flex flex-col items-center space-y-4">
              {/* Project Info */}
              <div className="space-y-2">
                <div className="item-center flex justify-center space-x-3">
                  <div className="flex w-fit items-center gap-2 rounded-3xl bg-[#F0F1F5] p-2">
                    <Image
                      src="/img/mock/矩形 1321@1x (2).png"
                      alt="icon"
                      className="rounded-lg"
                      width={18}
                      height={18}
                    />
                    <span className="text-[12px] text-[#2D2E33]">Layer3</span>
                  </div>
                  <div className="flex w-fit items-center gap-2 rounded-3xl bg-[#F0F1F5] p-2">
                    <Image
                      src="/icons/ava.svg"
                      alt="icon"
                      className="rounded-lg"
                      width={18}
                      height={18}
                    />
                    <span className="text-[12px] text-[#2D2E33]">5,757</span>
                  </div>
                </div>

                <h2 className="text-[20px]">{slides[currentSlide].title}</h2>
                <p className="text-center text-[12px] text-[#99A0AF]">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              {/* Date and Status */}
              <div className="flex w-[320px] items-center justify-between rounded-lg bg-white p-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-[#fafafa]"></div>
                  <div>
                    <div className="text-[14px]">Dec 5, 6:30 AM</div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
