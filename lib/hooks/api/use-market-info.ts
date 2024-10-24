import useSWRImmutable from "swr/immutable";
import { dataApiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "./use-endpoint";

interface ProjectLinks {
  twitter: string;
  discord: string;
}

export function useMarketInfo() {
  const { projectInfoEndPoint } = useEndPoint();

  const res = useSWRImmutable<Record<string, ProjectLinks>>(
    projectInfoEndPoint,
    (url: string) => dataApiFetcher(url, undefined, true),
  );

  return res;
}
