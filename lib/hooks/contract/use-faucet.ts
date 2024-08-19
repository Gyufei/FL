import { useFaucetEth } from "./eth/use-faucet-eth";
import { useChainTx } from "./help/use-chain-tx";
import { useFaucetSol } from "./solana/use-faucet-sol";

export function useFaucet() {
  const chainActionRes = useChainTx(useFaucetEth, useFaucetSol, undefined);

  return chainActionRes;
}
