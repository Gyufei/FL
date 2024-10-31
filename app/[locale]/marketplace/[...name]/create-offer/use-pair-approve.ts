import { ChainConfigs } from "@/lib/const/chain-configs";
import { useApprove } from "@/lib/hooks/web3/evm/use-approve";
import { ChainType } from "@/lib/types/chain";
import { IPoint, IToken } from "@/lib/types/token";
import { useMemo } from "react";

export function usePairApprove(
  chain: ChainType,
  token: IToken | undefined,
  point: IPoint | undefined,
) {
  const isMarketPointToken =
    point?.marketplace?.market_catagory === "point_token";

  const skipToken = useMemo(() => {
    if (!token) return true;

    if (isMarketPointToken) return true;

    if (token?.symbol === "ETH" || token?.symbol === "BNB") return true;

    return false;
  }, [token, isMarketPointToken]);

  const skipPoint = useMemo(() => {
    if (!point || !point.marketplace) return true;

    if (!isMarketPointToken) {
      return true;
    }

    if (
      point?.marketplace?.project_token_addr === ChainConfigs[chain].zeroAddr
    ) {
      return true;
    }

    return false;
  }, [point, isMarketPointToken, chain]);

  const {
    isShouldApprove: isShouldApproveToken,
    approveAction: approveActionToken,
    isApproving: isApprovingToken,
    approveBtnText: approveBtnTextToken,
  } = useApprove(chain || "", token, skipToken);

  const {
    isShouldApprove: isShouldApprovePoint,
    approveAction: approveActionPoint,
    isApproving: isApprovingPoint,
    approveBtnText: approveBtnTextPoint,
  } = useApprove(chain || "", point, skipPoint);

  const isShouldApprove = isShouldApprovePoint || isShouldApproveToken;
  const isApproving = isApprovingPoint || isApprovingToken;
  const approveBtnText = approveBtnTextPoint || approveBtnTextToken;
  const approveAction = async () => {
    if (isShouldApprovePoint) {
      await approveActionPoint();
    } else if (isShouldApproveToken) {
      await approveActionToken();
    }

    return () => {};
  };

  return {
    isShouldApprove,
    isApproving,
    approveBtnText,
    approveAction,
  };
}
