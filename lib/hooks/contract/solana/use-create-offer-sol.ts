import { BN } from "bn.js";
import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { ISettleMode } from "@/lib/types/maker-detail";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";

export function useCreateOfferSol({
  marketplaceStr: marketplaceStr,
  offerType,
}: {
  marketplaceStr: string;
  offerType: "bid" | "ask";
}) {
  const { program } = useTadleProgram();
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol();

  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();

  const writeAction = async ({
    pointAmount,
    tokenAmount,
    collateralRate,
    taxForSub,
    settleMode,
    note,
    isNativeToken,
  }: {
    pointAmount: number;
    tokenAmount: number;
    collateralRate: number;
    taxForSub: number;
    settleMode: ISettleMode;
    note: string;
    isNativeToken: boolean;
  }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      usdcTokenMint,
      seedAccount,
      associatedTokenProgram,
      poolTokenAuthority,
      poolUsdcTokenAccount,
      poolSolTokenAccount,
      userSolTokenAccount,
      wsolTokenMint,
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);

    const {
      walletBaseTokenBalance: walletABaseTokenBalance,
      walletPointTokenBalance: walletAPointTokenBalance,
    } = await getWalletBalanceAccount(
      program.programId,
      authority!,
      marketPlace,
      isNativeToken,
    );

    const maker = PublicKey.findProgramAddressSync(
      [Buffer.from("marker"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const stockA = PublicKey.findProgramAddressSync(
      [Buffer.from("stock"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const offerA = PublicKey.findProgramAddressSync(
      [Buffer.from("offer"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    console.log(
      Object.entries({
        authority,
        seedAccount: seedAccount.publicKey,
        marketPlace,
        systemConfig,
        maker,
        stock: stockA,
        offer: offerA,
        poolTokenAuthority,
        tokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        associatedTokenProgram,
        systemProgram,
        pubkey1: isNativeToken ? userSolTokenAccount : userUsdcTokenAccount,
        pubkey2: isNativeToken ? poolSolTokenAccount : poolUsdcTokenAccount,
        pubkey3: walletABaseTokenBalance,
        pubkey4: walletAPointTokenBalance,
      }).map((v) => ({ [v[0]]: v[1]?.toBase58() })),
    );

    const methodTransaction = await program.methods
      .createOffer(
        new BN(pointAmount),
        new BN(tokenAmount),
        new BN(collateralRate),
        new BN(taxForSub),
        {
          [offerType]: {},
        },
        {
          [settleMode]: {},
        },
      )
      .accounts({
        authority,
        seedAccount: seedAccount.publicKey,
        marketPlace,
        systemConfig,
        maker,
        stock: stockA,
        poolTokenAuthority,
        tokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        associatedTokenProgram,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: offerA,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: isNativeToken ? userSolTokenAccount : userUsdcTokenAccount,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: isNativeToken ? poolSolTokenAccount : poolUsdcTokenAccount,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: walletABaseTokenBalance,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: walletAPointTokenBalance,
          isSigner: false,
          isWritable: true,
        },
      ])
      .transaction();

    const txHash = await buildTransaction(
      methodTransaction,
      program,
      [seedAccount],
      authority!,
    );

    await recordTransaction({
      txHash,
      note,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
