"use client";

import ProjectCard from "./item-card";
export default function Trending() {
  return (
    <div className="overflow-hidden rounded-xl bg-[#FAFAFA] p-5">
      <h2 className="mb-4 flex items-center gap-2">
        <span className="h-6 w-6 rounded-lg bg-yellow"></span>
        <span className="">New</span>
      </h2>
      <div className="space-y-4">
        <ProjectCard
          name="Winter Wonderland: Backpack"
          participants={156}
          logo="/img/mock/矩形 1321@1x (1).png"
          showParticipants
        />
        <ProjectCard
          name="Layer3"
          participants={89}
          logo="/img/mock/矩形 1321@1x (1).png"
          showParticipants
        />
        <ProjectCard
          name="Metacora"
          participants={234}
          logo="/img/mock/矩形 1321@1x (1).png"
          showParticipants
        />
      </div>
    </div>
  );
}
