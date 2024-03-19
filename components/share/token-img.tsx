import Image from "next/image";
import { useTokensInfo } from "@/lib/hooks/api/use-token-info";

export default function TokenImg({
  tokenAddr,
  width,
  height,
  className,
}: {
  tokenAddr: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const [tokenInfo] = useTokensInfo([tokenAddr]);

  return (
    <Image
      src={tokenInfo?.logoURI || "/img/token-placeholder.png"}
      width={width}
      height={height}
      className={className}
      alt="token"
    />
  );
}
