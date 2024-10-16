import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";
import { IEntry } from "@/lib/types/entry";

export function useEntryById(entryId: number) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IEntry>(`${apiEndPoint}${Paths.entry}/${entryId}`);

  return res;
}
