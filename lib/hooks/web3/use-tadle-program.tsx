import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { TadleAbi } from "@/lib/abi/tadle";
import useProvider from "./use-provider";
import { useClusterConfig } from "./use-cluster-config";

export default function useTadleProgram() {
  const { provider } = useProvider();
  const { clusterConfig } = useClusterConfig();

  const programId = new PublicKey(clusterConfig.program.tadleProgram);
  const program = new anchor.Program(TadleAbi as any, programId, provider);
  const systemProgram = anchor.web3.SystemProgram.programId;

  return {
    program,
    programId,
    systemProgram,
  };
}
