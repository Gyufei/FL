import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { IEntry } from "@/lib/types/entry";

export function useEntryById(entryId: number) {
  const { dataApiEndPoint: apiEndPoint } = useEndPoint();

  const res = useSWR<IEntry>(`${apiEndPoint}${DataApiPaths.entry}/${entryId}`);

  return res;
}
