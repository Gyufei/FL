import Image from "next/image";
import { useAtomValue } from "jotai";
import { ClusterAtom, ClusterType } from "@/lib/states/cluster";

export default function CurrChainLogo() {
  const cluster = useAtomValue(ClusterAtom);

  const isMainnet = cluster === ClusterType.Mainnet;
  const isDev = cluster === ClusterType.Devnet;

  return (
    <div className="relative flex items-center justify-center">
      <Image
        width={24}
        height={24}
        src="/icons/solana.svg"
        alt="current chain logo"
        className="z-10 bg-white mr-2"
      ></Image>
      <span className="text-base leading-6 text-[#2D2E33]">
        {isMainnet ? "Solana" : "EVMs"}
      </span>
    </div>
  );
}
