import Image from "next/image";
import { useAtomValue } from "jotai";
import { ClusterAtom, ClusterType } from "@/lib/states/cluster";

export default function CurrChainLogo() {
  const cluster = useAtomValue(ClusterAtom);

  const isMainnet = cluster === ClusterType.Mainnet;
  // const isDev = cluster === ClusterType.Devnet;

  return (
    <div className="relative flex items-center justify-center">
      <Image
        width={24}
        height={24}
        src="/icons/solana.svg"
        alt="current chain logo"
        className="z-10 mr-2 bg-white"
      ></Image>
      <span className="text-base leading-6 text-black">
        {isMainnet ? "Solana" : "Solana Dev"}
      </span>
    </div>
  );
}
