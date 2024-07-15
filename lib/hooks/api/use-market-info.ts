import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";
import { EndPointPathMap } from "@/lib/PathMap";

interface ProjectLinks {
  twitter: string;
  discord: string;
}

export function useMarketInfo() {
  const res = useSWRImmutable<
    Record<string, ProjectLinks>
  >(EndPointPathMap.projectInfo, fetcher);

  return res;
}
