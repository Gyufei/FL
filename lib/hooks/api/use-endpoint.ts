import { useMemo } from "react";
import { WithCDN, WithHost } from "@/lib/PathMap";

export function useEndPoint() {
  const apiEndPoint = useMemo(() => {
    return WithHost("");
  }, []);

  const projectInfoEndPoint = useMemo(() => {
    return WithCDN("/project_info.json");
  }, []);

  const tokenEndPoint = useMemo(() => {
    return WithCDN("/tokenlist/solana.json");
  }, []);

  return {
    apiEndPoint,
    projectInfoEndPoint,
    tokenEndPoint,
  };
}
