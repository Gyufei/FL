import Image from "next/image";
import { useAtomValue } from "jotai";
import { ClusterAtom } from "@/lib/states/cluster";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import SolanaDevIcon from "@/components/share/solana-dev-icon";

export default function CurrChainLogo() {
  const cluster = useAtomValue(ClusterAtom);

  const isMainnet = cluster === WalletAdapterNetwork.Mainnet;

  return (
    <div className="relative flex items-center justify-center">
      {isMainnet ? (
        <Image
          width={24}
          height={24}
          src="/icons/solana.svg"
          alt="current chain logo"
          className="z-10 mr-0 bg-black sm:mr-2 sm:bg-white"
        ></Image>
      ) : (
        <SolanaDevIcon className="z-10 mr-0 bg-black sm:mr-2 sm:bg-white" />
      )}
      <span className="hidden text-base leading-6 text-black sm:inline-block">
        {isMainnet ? "Solana" : "Solana Dev"}
      </span>
    </div>
  );
}