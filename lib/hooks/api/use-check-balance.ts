import { useAccount, useBalance } from "wagmi";
import NP from "number-precision";
import { reportEvent } from "@/lib/utils/analytics";
import { useTokenBalance } from "@/lib/hooks/api/use-token-balance";
import { checkIsNativeToken } from "@/lib/utils/web3";
import { ChainType } from "@/lib/types/chain";
import { formatLeadingZeros } from "@/lib/utils/number";
import { ChainConfigs } from "@/lib/const/chain-configs";
import toast from "react-hot-toast";

export function useCheckBalance(chain: ChainType, token: any) {
  const { address } = useAccount();
  const tokenBalance = useTokenBalance({
    abiAddress: token?.address,
    decimals: token?.decimals,
  });
  const isNativeToken = checkIsNativeToken(chain, token || null);

  const userBalance = useBalance({
    address: address as `0x${string}`,
    token: isNativeToken ? undefined : (token?.address as `0x${string}`),
    chainId: ChainConfigs[chain].network as number,
    query: {
      enabled: !!address,
    },
  });
  const balance = userBalance?.data?.value;

  function checkBalanceInsufficient(value: any, showTip = false) {
    if (balance === undefined) return "";
    const gas = 0.0005;
    const nativeBalance = NP.divide(String(balance), 10 ** 18);

    if (isNativeToken) {
      const total = NP.plus(gas, value);
      const result = NP.minus(nativeBalance, total) >= 0;
      if (!result) {
        // reportEvent("InsufficientBalance", {
        //   value: `${nativeBalance}-${total}`,
        // });

        if (showTip) {
          toast.error(
            `Insufficient Balance: ${total} ${
              token.symbol
            } is needed but only ${formatLeadingZeros(nativeBalance, 6)} ${
              token.symbol
            } in the wallet`,
          );
        }
        return `Insufficient ${token.symbol} to pay`;
      }
      return "";
    } else {
      const gasResult = NP.minus(nativeBalance, gas) >= 0;
      if (!gasResult) {
        reportEvent("InsufficientBalance-gas", {
          value: `${nativeBalance}-${gas}`,
        });
        if (showTip) {
          toast.error(
            `Insufficient Balance: ${gas.toFixed(9)} ${
              token.symbol
            } is needed but only ${formatLeadingZeros(nativeBalance, 6)} ${
              token.symbol
            } in the wallet`,
          );
        }

        return `No enough ${token.symbol} to send transaction`;
      }
      const valueResult = NP.minus(tokenBalance, value) >= 0;
      if (!valueResult) {
        reportEvent("InsufficientBalance-value", {
          value: `${nativeBalance}-${value}`,
        });
        if (showTip) {
          toast.error(
            `Insufficient Balance: ${value} ${
              token.symbol
            } is needed but only ${formatLeadingZeros(tokenBalance, 6)} ${
              token.symbol
            } in the wallet`,
          );
        }
        return `Insufficient ${token.symbol} to pay`;
      }
      return "";
    }
  }

  return { checkBalanceInsufficient };
}
