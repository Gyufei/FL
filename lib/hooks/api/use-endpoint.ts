import { useCallback, useMemo } from "react";
import { WithCDN, WithHost } from "@/lib/PathMap";
import { useCurrentChain } from "../web3/use-current-chain";

export function useEndPoint() {
  const { isEth, isSolana } = useCurrentChain();

  const ethApiEndPoint = WithHost("/eth");
  const solanaApiEndPoint = WithHost("/solana");

  const getEndpoint = useCallback(
    (ethPath: string, solanaPath: string, isCDN = false) => {
      if (isEth) return (isCDN ? WithCDN : WithHost)(ethPath);
      if (isSolana) return (isCDN ? WithCDN : WithHost)(solanaPath);
      return "";
    },
    [isEth, isSolana],
  );

  const apiEndPoint = useMemo(
    () => getEndpoint("/eth", "/solana"),
    [getEndpoint],
  );

  const projectInfoEndPoint = useMemo(
    () =>
      getEndpoint("/eth/project_info.json", "/solana/project_info.json", true),
    [getEndpoint],
  );

  const tokenEndPoint = useMemo(
    () =>
      getEndpoint(
        "/eth/tokenlist/eth.json",
        "/solana/tokenlist/solana.json",
        true,
      ),
    [getEndpoint],
  );

  return {
    apiEndPoint,
    projectInfoEndPoint,
    tokenEndPoint,
    ethApiEndPoint,
    solanaApiEndPoint,
  };
}
