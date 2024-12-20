import { IPoint } from "@/lib/types/token";
import { useTokenBalance } from "@/lib/hooks/api/use-token-balance";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { useEffect, useState, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ChainType } from "@/lib/types/chain";
import NP from "number-precision";

export default function PointBalance({
  point,
  className,
}: {
  point: IPoint;
  className?: string;
}) {
  const [balance, setBalance] = useState(0);
  const chain = point?.marketplace?.chain;

  const evmTokenBalance = useTokenBalance({
    abiAddress: point?.marketplace?.project_token_addr,
    decimals: ProjectDecimalsMap[point?.marketplace?.market_symbol],
  });

  useEffect(() => {
    if (chain !== ChainType.SOLANA) {
      setBalance((prevBalance) => {
        if (prevBalance !== evmTokenBalance) {
          return evmTokenBalance;
        }
        return prevBalance;
      });
    }
  }, [chain, evmTokenBalance]);

  const { connection } = useConnection();
  const { publicKey: solAddress } = useWallet();

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
