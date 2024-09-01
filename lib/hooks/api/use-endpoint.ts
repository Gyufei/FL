import { useMemo } from "react";
import { WithCDN, WithHost } from "@/lib/PathMap";
import { useCurrentChain } from "../web3/use-current-chain";

export function useEndPoint() {
  const { isEth, isSolana } = useCurrentChain();

  console.log("isEth", isEth, "isSolana", isSolana);
  const apiEndPoint = useMemo(() => {
    if (isEth) {
      return WithHost("/eth");
    }

    if (isSolana) {
      return WithHost("/solana");
    }

    return "";
  }, [isEth, isSolana]);

  const projectInfoEndPoint = useMemo(() => {
    if (isEth) {
      return WithCDN("/eth/project_info.json");
    }

    if (isSolana) {
      return WithCDN("/solana/project_info.json");
    }

    return "";
  }, [isEth, isSolana]);

  const tokenEndPoint = useMemo(() => {
    if (isEth) {
      return WithCDN("/eth/tokenlist/eth.json");
    }

    if (isSolana) {
      return WithCDN("/solana/tokenlist/solana.json");
    }

    return "";
  }, [isEth, isSolana]);

  return {
    apiEndPoint,
    projectInfoEndPoint,
    tokenEndPoint,
  };
}
