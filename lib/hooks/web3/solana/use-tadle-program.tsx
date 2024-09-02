import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { TadleAbi } from "@/lib/abi/solana/tadle";

import useProvider from "./use-provider";
import { useSolanaConfig } from "./use-solana-config";

export default function useTadleProgram() {
  const { provider } = useProvider();
  const { solanaConfig: clusterConfig } = useSolanaConfig();

  const programId = new PublicKey(clusterConfig.program.tadleProgram);
  const program = new anchor.Program(TadleAbi as any, programId, provider);
  const systemProgram = anchor.web3.SystemProgram.programId;

  return {
    program,
    programId,
    systemProgram,
  };
}
