import { useMemo } from "react";
import { EndPointPathMap } from "@/lib/PathMap";

export function useEndPoint() {
  const apiEndPoint = useMemo(() => {
    return EndPointPathMap.api
  }, []);

  return {
    apiEndPoint
  };
}
