import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { TadleAbi } from "@/lib/abi/tadle";
import useProvider from "./use-provider";

export default function useTadleProgram() {
  const { provider } = useProvider();

  const programId = new PublicKey(TadleAbi.metadata.address);
  const program = new anchor.Program(TadleAbi as any, programId, provider);
  const systemProgram = anchor.web3.SystemProgram.programId;

  return {
    program,
    programId,
    systemProgram,
  };
}
