import { IPoint } from "@/lib/types/token";
import { useTokenBalance } from "@/lib/hooks/api/use-token-balance";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";

export default function PointBalance({
  point,
  className,
}: {
  point: IPoint;
  className?: string;
}) {
  const tokenBalance = useTokenBalance({
    abiAddress: point?.marketplace?.project_token_addr,
    decimals: ProjectDecimalsMap[point?.marketplace?.market_symbol],
  });
  return (
    <div className={cn("mb-6 text-[12px] text-[#99A0AF]", className)}>
      Balance: {formatNum(tokenBalance)}
    </div>
  );
}
