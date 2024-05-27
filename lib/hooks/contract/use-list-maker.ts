import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./use-tx-status";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./use-accounts";

export function useListStock({
  marketplaceStr,
  makerStr,
  stockStr,
  originOfferStr
}: {
  marketplaceStr: string;
  makerStr: string;
  stockStr: string;
  originOfferStr: string;
}) {
  const { program } = useTadleProgram();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts } = useAccounts();

  const writeAction = async ({
    receiveTokenAmount,
    breachFee,
  }: {
    receiveTokenAmount: number;
    breachFee: number;
  }) => {
    const {
      tokenProgram,
      seedAccount,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount: walletDUsdcTokenAccount,
      poolUsdcTokenAccount,
      usdcTokenMint,
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);
    const stockD = new PublicKey(stockStr);
    const maker = new PublicKey(makerStr);
    const originOffer = new PublicKey(originOfferStr);

    const offerD = PublicKey.findProgramAddressSync(
      [
        Buffer.from("offer"),
        seedAccount.publicKey.toBuffer()
      ],
      program.programId
    )[0];

    const txHash = await program.methods
      .list(
        new BN(receiveTokenAmount * LAMPORTS_PER_SOL),
        new BN(breachFee),
      )
      .accounts({
        authority: authority,
        seedAccount: seedAccount.publicKey,
        systemConfig,
        stock: stockD,
        offer: offerD,
        originOffer,
        poolTokenAccount: poolUsdcTokenAccount,
        maker,
        marketPlace,
        tokenMint: usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      }).signers([seedAccount]).remainingAccounts([
        {
          pubkey: walletDUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        }
      ])
      .rpc();

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
