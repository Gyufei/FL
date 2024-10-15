import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { Paths } from "@/lib/PathMap";

interface IEntry {
  id: number;
  is_root: boolean;
  root_entry_id: number;
  market_symbol: string;
  item_amount: string;
  direction: string;
  original_creator: string;
  project_token_addr: string;
  created_at: number;
}

export function useEntryById(entryId: number) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IEntry>(`${apiEndPoint}${Paths.entry}/${entryId}`);

  return res;
}
