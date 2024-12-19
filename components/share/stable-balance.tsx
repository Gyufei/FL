import { useAccount, useBalance } from "wagmi";
import NP from "number-precision";
import { checkIsNativeToken } from "@/lib/utils/web3";
import { formatNum } from "@/lib/utils/number";
import { IToken } from "@/lib/types/token";
import { ChainType } from "@/lib/types/chain";
import { cn } from "@/lib/utils/common";

export function StableBalance({
  chain,
  token,
  className,
}: {
  chain: ChainType;
  token: IToken;
  className?: string;
}) {
  const isNativeToken = checkIsNativeToken(chain, token || null);
  const { address } = useAccount();
  const userBalance = useBalance({
    address: address as `0x${string}`,
    token: isNativeToken ? undefined : (token?.address as `0x${string}`),
  });
  const balance = userBalance?.data?.value || "0";
  const nativeBalance = NP.divide(String(balance), 10 ** 18);

  return (
    <div className={cn("mb-6 text-[12px] text-[#99A0AF]", className)}>
      Balance: {formatNum(nativeBalance)}
    </div>
  );
}
