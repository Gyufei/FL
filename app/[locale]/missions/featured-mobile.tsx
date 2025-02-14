"use client";

import { useRouter } from "@/app/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { TaskItem } from "@/lib/types/missions";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function FeaturedMobile({ data }: { data: TaskItem[] }) {
  const router = useRouter();

  function handleGo(task: TaskItem) {
    const path = `/missions/${task.projectId}/${task.id}`;
    router.push(path);
  }

  return (
    <div className="w-full">
      <div className="-mb-4 flex items-center justify-between font-[500]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-yellow" />
          <span className="text-[16px]">Featured</span>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="relative rounded-xl !pt-8 [&_.swiper-pagination]:!absolute [&_.swiper-pagination]:!-top-2 [&_.swiper-pagination]:!left-[86%] [&_.swiper-pagination]:!z-10 [&_.swiper-pagination]:!size-fit"
        style={
          {
            "--swiper-pagination-color": "#2D2E33",
            "--swiper-pagination-bullet-inactive-color": "#D8D8D8",
          } as React.CSSProperties
        }
      >
        {(data || []).map((item: any, index) => (
          <SwiperSlide key={index} onClick={() => handleGo(item)}>
            <div className="relative overflow-hidden rounded-xl bg-[#FAFAFA]">
              <div className="relative">
                <div className="relative h-[180px] w-full">
                  <Image
                    src={item.projectImage}
                    fill
                    alt="Featured image"
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="space-y-2">
                      <div className="item-center flex justify-center space-x-3">
                        <div className="flex w-fit items-center gap-2 rounded-3xl bg-[#F0F1F5] p-2">
                          <Image
                            src={item.projectLogo}
                            alt="icon"
                            className="rounded-lg"
                            width={18}
                            height={18}
                          />
                          <span className="text-[12px] text-[#2D2E33]">
                            {item.projectName}
                          </span>
                        </div>
                        <div className="flex w-fit items-center gap-2 rounded-3xl bg-[#F0F1F5] p-2">
                          <Image
                            src="/icons/ava.svg"
                            alt="icon"
                            className="rounded-lg"
                            width={18}
                            height={18}
                          />
                          <span className="text-[12px] text-[#2D2E33]">
                            5,757
                          </span>
                        </div>
                      </div>

                      <h2 className="text-[20px]">{item.name}</h2>
                      <p className="text-center text-[12px] text-[#99A0AF]">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex w-[320px] items-center justify-between rounded-lg bg-white p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-[#fafafa]"></div>
                        <div>
                          <div className="text-[14px]">{item.start}</div>
                          <div className="text-[12px] text-[#99A0AF]">
                            {item.end}
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
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
