"use client";

import Image from "next/image";
import { useRouter } from "@/app/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  const router = useRouter();

  function handleGo(projectId: string) {
    router.push(`/bounty/${projectId}`);
  }

  return (
    <div className="w-full p-4">
      <div className="relative rounded-xl bg-[#FAFAFA]">
        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-yellow" />
          <span className="text-[16px]">Featured</span>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          direction="vertical"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            type: "bullets",
            verticalClass: "swiper-pagination-vertical",
          }}
          className="featured-swiper h-[360px] w-full  [&_.swiper-pagination-bullet-active]:!size-[10px] [&_.swiper-pagination-bullet-active]:!bg-[#121214] [&_.swiper-pagination-bullet]:!size-[6px] [&_.swiper-pagination-bullet]:!bg-[#828181] [&_.swiper-pagination-vertical]:!w-fit  [&_.swiper-pagination]:!left-6"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div
                className="grid h-[360px] cursor-pointer gap-6 px-6 md:grid-cols-2"
                onClick={() => handleGo(slide.id.toString())}
              >
                <div className="ml-5 flex h-[360px] w-full max-w-xl flex-col items-center justify-center space-y-8">
                  {/* Title Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/img/mock/矩形 1321@1x (2).png"
                        alt="icon"
                        className="rounded-lg object-cover"
                        width={18}
                        height={18}
                      />
                      <span className="text-[12px] text-[#2D2E33]">Solana</span>
                    </div>
                    <h2 className="text-[36px]">{slide.title}</h2>
                    <p className="text-[#99A0AF]">{slide.subtitle}</p>
                  </div>

                  {/* Time and Status Section */}
                  <div className="flex w-[496px] items-center justify-between rounded-lg bg-white p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-[#fafafa]"></div>
                      <div>
                        <div className="text-[16px]">Dec 5, 6:30 AM</div>
                        <div className="text-[12px] text-[#99A0AF]">
                          to Jan 15, 6:30 AM
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-[#fafafa] px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-[#4CBF87]"></span>
                      <span className="rounded bg-[#fafafa] text-[12px]">
                        LIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative flex items-center justify-center">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={slide.image}
                      width={600}
                      height={300}
                      alt="Featured image"
                      className="h-[316px] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
