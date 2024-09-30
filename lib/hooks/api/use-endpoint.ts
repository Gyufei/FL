import { useCallback, useMemo } from "react";
import { WithCDN, WithHost, WithWss } from "@/lib/PathMap";
import { useCurrentChain } from "../web3/use-current-chain";

export function useEndPoint() {
  const { isEth, isSolana, isBsc } = useCurrentChain();

  const ethApiEndPoint = WithHost("/eth");
  const solanaApiEndPoint = WithHost("/solana");
  const bscApiEndPoint = WithHost("/bsc");

  const getEndpoint = useCallback(
    (ethPath: string, solanaPath: string, bscPath: string, isCDN = false) => {
      if (isEth) return (isCDN ? WithCDN : WithHost)(ethPath);
      if (isSolana) return (isCDN ? WithCDN : WithHost)(solanaPath);
      if (isBsc) return (isCDN ? WithCDN : WithHost)(bscPath);
      return "";
    },
    [isEth, isSolana, isBsc],
  );

  const apiEndPoint = useMemo(
    () => getEndpoint("/eth", "/solana", "/bsc"),
    [getEndpoint],
  );

  const projectInfoEndPoint = useMemo(
    () =>
      getEndpoint(
        "/eth/project_info.json",
        "/solana/project_info.json",
        "/bsc/project_info.json",
        true,
      ),
    [getEndpoint],
  );

  const tokenEndPoint = useMemo(
    () =>
      getEndpoint(
        "/eth/tokenlist/eth.json",
        "/solana/tokenlist/solana.json",
        "/bsc/tokenlist/bsc.json",
        true,
      ),
    [getEndpoint],
  );

  const wssEndPoint = useMemo(() => {
    if (isEth) return WithWss("/eth");
    if (isSolana) return WithWss("/solana");
    if (isBsc) return WithWss("/bsc");

    return "";
  }, [isEth, isSolana, isBsc]);

  return {
    apiEndPoint,
    projectInfoEndPoint,
    tokenEndPoint,
    ethApiEndPoint,
    solanaApiEndPoint,
    bscApiEndPoint,
    wssEndPoint,
  };
}
