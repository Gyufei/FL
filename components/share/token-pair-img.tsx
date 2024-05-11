import { useTokensInfo } from "@/lib/hooks/api/use-token-info";
import Image from "next/image";

export function TokenAddrPairImg({
  token1Addr,
  token2Addr,
  ...rest
}: {
  token1Addr: string;
  token2Addr: string;
  width1?: number;
  height1?: number;
  width2?: number;
  height2?: number;
}) {
  const [tokenInfo1, tokenInfo2] = useTokensInfo([token1Addr, token2Addr]);

  return (
    <TokenPairImg
      src1={tokenInfo1?.logoURI || ""}
      src2={tokenInfo2?.logoURI || ""}
      {...rest}
    />
  );
}

export function TokenPairImg({
  src1,
  src2,
  width1 = 56,
  height1 = 56,
  width2 = 14,
  height2 = 14,
}: {
  src1: string;
  src2: string;
  width1?: number;
  height1?: number;
  width2?: number;
  height2?: number;
}) {
  return (
    <div className="relative h-fit">
      <Image
        src={src1}
        width={width1}
        height={height1}
        alt="token1"
        className="rounded-full"
      />
      <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-white">
        <Image
          src={src2 || "/icons/solana.svg"}
          width={width2}
          height={height2}
          alt="token2"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
