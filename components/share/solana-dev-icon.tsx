import { cn } from "@/lib/utils/common";
import Image from "next/image";

export default function SolanaDevIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative rounded-full", className)}>
      <Image
        width={24}
        height={24}
        src="/icons/solana.svg"
        alt="chain logo"
        className="z-10 bg-black sm:bg-white rounded-full"
      />
      <Image
        width={12}
        height={12}
        src="/icons/tool.svg"
        alt="chain logo"
        className="absolute bottom-0 -right-[2px]"
      />
    </div>
  );
}
