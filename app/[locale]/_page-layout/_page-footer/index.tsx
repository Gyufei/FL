"use client";

import { TwitterLink } from "@/lib/const/social";
import HoverIcon from "@/components/share/hover-icon";
import FooterSetting from "./footer-setting";
import LanguageSetting from "./language-setting";
import { LiveMs } from "./live-ms";
import { cn } from "@/lib/utils/common";
import { Link } from "@/app/navigation";

export default function PageFooter({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 pb-4 pt-5",
        className,
      )}
    >
      <LiveMs />
      <div className="flex items-center space-x-5">
        <Link href={TwitterLink} target="_blank">
          <HoverIcon
            src="/icons/twitter-gray.svg"
            hoverSrc="/icons/twitter.svg"
            width={24}
            height={24}
            alt="x"
          />
        </Link>
        <FooterSetting />
        <LanguageSetting />
      </div>
    </div>
  );
}
