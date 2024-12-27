import { useAccount, useBalance } from "wagmi";
import NP from "number-precision";
import { checkIsNativeToken } from "@/lib/utils/web3";
import { formatNum } from "@/lib/utils/number";
import { IToken } from "@/lib/types/token";
import { ChainType } from "@/lib/types/chain";
import { cn } from "@/lib/utils/common";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState, useCallback } from "react";
export function StableBalance({
  chain,
  token,
  className,
}: {
  chain: ChainType;
  token: IToken;
  className?: string;
}) {
  const [balance, setBalance] = useState(0);
  const isNativeToken = checkIsNativeToken(chain, token || null);
  const { address } = useAccount();
  const userBalance = useBalance({
    address: address as `0x${string}`,
    token: isNativeToken ? undefined : (token?.address as `0x${string}`),
    query: {
      enabled: !!address && chain !== ChainType.SOLANA,
    },
  });
  const nativeBalance = userBalance?.data?.value || "0";
  const evmBalance = NP.divide(String(nativeBalance), 10 ** 18);

  const { connection } = useConnection();
  const { publicKey: solAddress } = useWallet();

  useEffect(() => {
    if (chain !== ChainType.SOLANA) {
      setBalance((prevBalance) => {
        if (prevBalance !== evmBalance) {
          return evmBalance;
        }
        return prevBalance;
      });
    }
  }, [chain, evmBalance]);

  const getSolBalance = useCallback(async () => {
    const nativeBalance = await connection.getBalance(solAddress as PublicKey);
    const solBalance = NP.divide(String(nativeBalance), 10 ** 9);
    setBalance((prevBalance) => {
      if (prevBalance !== solBalance) {
        return solBalance;
      }
      return prevBalance;
    });
  }, [solAddress]);

  useEffect(() => {
    if (chain === ChainType.SOLANA) {
      getSolBalance();
    }
  }, [getSolBalance, chain]);

  return (
    <div className={cn("mb-6 text-[12px] text-[#99A0AF]", className)}>
      Balance: {formatNum(balance)}
    </div>
  );
}
