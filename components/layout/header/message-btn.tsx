"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MessageBtn() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#D3D4D6]">
      <Image src="/icons/bell.svg" width={24} height={24} alt="bell" />
      <Badge variant="destructive" className="absolute -right-3 -top-2 px-1">
        99+
      </Badge>
    </div>
  );
}
