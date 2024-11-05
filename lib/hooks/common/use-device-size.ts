import { useMediaQuery } from "./use-media-query";

export function useDeviceSize() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const isMobile = !isDesktop;

  return {
    isDesktop,
    isMobile,
  };
}
