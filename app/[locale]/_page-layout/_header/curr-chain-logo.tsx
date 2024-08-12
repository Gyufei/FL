import Image from "next/image";
import { useAtomValue } from "jotai";
import { ClusterAtom } from "@/lib/states/cluster";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import SolanaDevIcon from "@/components/share/solana-dev-icon";
import { ENetworks, NetworkAtom } from "@/lib/states/network";

export default function CurrChainLogo() {
  const network = useAtomValue(NetworkAtom);
  const cluster = useAtomValue(ClusterAtom);

  const isEth = network === ENetworks.Eth;
  const isSolana = network === ENetworks.Solana;
  const isSolMainnet = cluster === WalletAdapterNetwork.Mainnet;

  return (
    <div className="relative flex items-center justify-center">
      {isEth && (
        <Image
          width={24}
          height={24}
          src="/icons/eth.svg"
          alt="evms"
          className="z-10 mr-0 rounded-full bg-black sm:mr-2 sm:bg-white"
        ></Image>
      )}
      {isSolana && (
        <>
          {isSolMainnet ? (
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
        </>
      )}
      <span className="hidden text-base leading-6 text-black sm:inline-block">
        {isEth && <>Ethereum</>}
        {isSolana && <>{isSolMainnet ? "Solana" : "Solana Dev"}</>}
      </span>
    </div>
  );
}
