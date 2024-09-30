import Image from "next/image";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";
import { isProduction } from "@/lib/PathMap";

export default function CurrChainLogo() {
  const { isEth, isSolana, isBsc, currentChainInfo } = useCurrentChain();

  return (
    <div className="relative flex items-center justify-center">
      <Image
        width={24}
        height={24}
        src={currentChainInfo.logo}
        alt={currentChainInfo.alias}
        className="z-10 mr-0 rounded-full bg-black sm:mr-2 sm:bg-white"
      ></Image>
      <span className="hidden text-base leading-6 text-black sm:inline-block">
        {isEth && <>{isProduction ? "Ethereum" : "EthTest"}</>}
        {isSolana && <>{isProduction ? "Solana" : "Solana Dev"}</>}
        {isBsc && <>{isProduction ? "BNB Chain" : "BNB Test"}</>}
      </span>
    </div>
  );
}
