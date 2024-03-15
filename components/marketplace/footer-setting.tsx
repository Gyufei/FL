import { useState } from "react";
import HoverIcon from "../share/hover-icon";

export default function FooterSetting() {
  const [open] = useState(false);

  return (
    <HoverIcon
      src="/icons/setting-gray.svg"
      hoverSrc="/icons/setting.svg"
      width={24}
      height={24}
      active={open}
      alt="setting"
    />
  );
}
