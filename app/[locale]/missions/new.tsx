"use client";

import TaskCard from "./item-card";
import { TaskItem } from "@/lib/types/missions";
import { useRouter } from "@/app/navigation";
export default function New({ data }: { data: TaskItem[] }) {
  const router = useRouter();
  function handleGo(task: TaskItem) {
    const path = `/missions/${task.projectId}/${task.id}`;
    router.push(path);
  }
  return (
    <div className="overflow-hidden rounded-xl bg-[#FAFAFA] p-5 font-[500]">
      <h2 className="mb-4 flex items-center gap-2">
        <span className="h-6 w-6 rounded-lg bg-yellow"></span>
        <span className="">New</span>
      </h2>
      <div className="space-y-4">
        {(data || []).map((item, index) => (
          <TaskCard
            key={index}
            name={item.name}
            participants={item.participants}
            logo={item.projectLogo}
            click={() => handleGo(item)}
            showParticipants
          />
        ))}
      </div>
    </div>
  );
}
