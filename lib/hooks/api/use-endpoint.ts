import { useCallback, useMemo } from "react";
import { WithCDN, WithHost, WithWss } from "@/lib/PathMap";
import { useCurrentChain } from "../web3/use-current-chain";

export function useEndPoint() {
  const { isEth, isSolana, isBnb } = useCurrentChain();

  const getEndpoint = useCallback(
    (ethPath: string, solanaPath: string, bnbPath: string, isCDN = false) => {
      if (isEth) return (isCDN ? WithCDN : WithHost)(ethPath);
      if (isSolana) return (isCDN ? WithCDN : WithHost)(solanaPath);
      if (isBnb) return (isCDN ? WithCDN : WithHost)(bnbPath);
      return "";
    },
    [isEth, isSolana, isBnb],
  );

  const apiEndPoint = useMemo(() => getEndpoint("", "", ""), [getEndpoint]);

  const projectInfoEndPoint = useMemo(
    () =>
      getEndpoint(
        "/eth/project_info.json",
        "/solana/project_info.json",
        "/bnb/project_info.json",
        true,
      ),
    [getEndpoint],
  );

  const tokenEndPoint = useMemo(
    () =>
      getEndpoint(
        "/eth/tokenlist/eth.json",
        "/solana/tokenlist/solana.json",
        "/bnb/tokenlist/bnb.json",
        true,
      ),
    [getEndpoint],
  );

  const wssEndPoint = useMemo(() => {
    if (isEth) return WithWss("/eth");
    if (isSolana) return WithWss("/solana");
    if (isBnb) return WithWss("/bnb");

    return "";
  }, [isEth, isSolana, isBnb]);

  return {
    apiEndPoint,
    projectInfoEndPoint,
    tokenEndPoint,
    wssEndPoint,
  };
}
