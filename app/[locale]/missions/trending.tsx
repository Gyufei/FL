"use client";

import ProjectCard from "./item-card";
import { Project } from "@/lib/types/missions";
import { useRouter } from "@/app/navigation";

export default function Trending({ data }: { data: Project[] }) {
  const router = useRouter();
  function handleGo(project: Project) {
    const path = `/missions/${project.projectId}/`;
    router.push(path);
  }
  return (
    <div className="overflow-hidden rounded-xl bg-[#FAFAFA] p-5 font-medium">
      <h2 className="mb-4 flex items-center gap-2">
        <span className="h-6 w-6 rounded-lg bg-yellow"></span>
        <span className="">Trending Projects</span>
      </h2>
      <div className="space-y-4">
        {(data || []).map((item, index) => (
          <ProjectCard
            key={index}
            name={item.projectName}
            taskNum={item.taskNum}
            logo={item.projectLogo}
            click={() => handleGo(item)}
          />
        ))}
      </div>
    </div>
  );
}
