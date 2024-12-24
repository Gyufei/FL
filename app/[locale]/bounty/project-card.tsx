"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/common";
import { useRouter } from "@/app/navigation";

export default function BackpackHeader({ bgColor, logo }: any) {
  const router = useRouter();
  function handleGo(projectId: string) {
    const path = `/bounty/${projectId}`;

    router.push(path);
  }
  return (
    <div className="bg-gray-100 cursor-pointer">
      <div
        className={cn(
          "rounded-lg bg-white p-4 transition-shadow hover:shadow-lg",
          bgColor,
        )}
        onClick={() => handleGo("1")}
      >
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={logo}
              alt="Backpack icon"
              className="rounded-lg object-cover"
              fill
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[18px]">Winter Wonderland: Backpack</h2>
            <div className="text-muted-foreground flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src="/img/mock/矩形 1321@1x (1).png"
                    alt="Participant 1"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src="/img/mock/矩形 1321@1x.png"
                    alt="Participant 2"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm text-[#99A0AF]">10K Participants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
