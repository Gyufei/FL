import Image from "next/image";
import SolanaDevIcon from "@/components/share/solana-dev-icon";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { isProduction } from "@/lib/PathMap";

export default function CurrChainLogo() {
  const { isEth, isSolana } = useCurrentChain();

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
          {isProduction ? (
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
        {isSolana && <>{isProduction ? "Solana" : "Solana Dev"}</>}
      </span>
    </div>
  );
}
