import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function WithTip({ children }: { children?: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            src="/icons/help.svg"
            width={16}
            height={16}
            alt="msg"
            className="ml-1"
          />
        </TooltipTrigger>
        <TooltipContent className="z-[103] w-[300px]">
          <p className="text-xs leading-[18px]">{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
