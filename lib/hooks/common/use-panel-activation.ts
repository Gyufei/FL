import { useState } from "react";
import { useDeviceSize } from "./use-device-size";

interface UsePanelActivationProps {
  defaultPanel: string;
}

export function usePanelActivation({ defaultPanel }: UsePanelActivationProps) {
  const { isMobileSize } = useDeviceSize();
  const [activePanel, setActivePanel] = useState(defaultPanel);

  const checkIsActive = (name: string) => {
    if (!isMobileSize) return true;
    return activePanel === name;
  };

  return { 
    activePanel, 
    setActivePanel, 
    checkIsActive 
  };
}