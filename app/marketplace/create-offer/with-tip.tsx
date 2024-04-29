import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/common";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CTooltipArrow } from "@/components/share/c-tooltip-arrow";

export function WithTip({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
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
        <TooltipContent className={cn(className, "z-[103] w-[300px]")}>
          <p className="text-xs leading-[18px]">{children}</p>
          <TooltipArrow asChild>
            <CTooltipArrow />
          </TooltipArrow>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
