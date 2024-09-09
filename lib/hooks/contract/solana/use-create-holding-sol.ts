import useTadleProgram from "@/lib/hooks/web3/solana/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";
import { SolanaZeroed } from "@/lib/const/solana";

export function useCreateHoldingSol({
  marketplaceStr,
  offerStr,
  makerStr,
  originOfferStr,
  originOfferAuthStr,
  preOfferAuthStr,
  referrerStr,
  isNativeToken,
}: {
  marketplaceStr: string;
  offerStr: string;
  makerStr: string;
  originOfferStr: string;
  originOfferAuthStr: string;
  preOfferAuthStr: string;
  referrerStr: string;
  isNativeToken: boolean;
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol(
    program.programId,
  );

  const writeAction = async ({ pointAmount }: { pointAmount: number }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      poolSolTokenAccount,
      usdcTokenMint,
      seedAccount,
      userConfig: userBConfig,
      userSolTokenAccount,
      wsolTokenMint,
      platformFeeAccountUSDT,
      platformFeeAccountSOL,
    } = await getAccounts();

    const marketplace = new PublicKey(marketplaceStr);
    const preOffer = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);
    const originOffer = new PublicKey(originOfferStr);
    const originOfferAuthority = new PublicKey(originOfferAuthStr);
    const preOfferAuthority = new PublicKey(preOfferAuthStr);
    const referrer = new PublicKey(referrerStr || SolanaZeroed);

    const {
      walletCollateralTokenBalance: walletBCollateralTokenBalance,
      walletPointTokenBalance: walletBPointTokenBalance,
    } = await getWalletBalanceAccount(authority!, marketplace, isNativeToken);

    const { walletCollateralTokenBalance: originMakerCollateralTokenBalance } =
      await getWalletBalanceAccount(
        originOfferAuthority,
        marketplace,
        isNativeToken,
      );

    const { walletCollateralTokenBalance: preOfferCollateralTokenBalance } =
      await getWalletBalanceAccount(
        preOfferAuthority,
        marketplace,
        isNativeToken,
      );

    const holdingB = PublicKey.findProgramAddressSync(
      [Buffer.from("stock"), seedAccount.publicKey.toBuffer()],
      program.programId,
    )[0];

    const referralConfig = referrerStr
      ? PublicKey.findProgramAddressSync(
          [Buffer.from("referral_config"), authority!.toBuffer()],
          program.programId,
        )[0]
      : referrer;

    const referrerCollateralTokenBalance = referrerStr
      ? PublicKey.findProgramAddressSync(
          [
            Buffer.from("token_balance"),
            usdcTokenMint.toBuffer(),
            referrer.toBuffer(),
          ],
          program.programId,
        )[0]
      : referrer;

    console.log(
      Object.entries({
        authority: authority,
        systemConfig,
        originMakerCollateralTokenBalance,
        preOfferCollateralTokenBalance,
        seedAccount: seedAccount.publicKey,
        holding: holdingB,
        maker,
        marketplace,
        poolTokenAccount: isNativeToken
          ? poolSolTokenAccount
          : poolUsdcTokenAccount,
        collateralTokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      }).map((v) => ({ [v[0]]: v[1]?.toBase58() })),
    );

    const methodTransaction = await program.methods
      .createHolding(new BN(pointAmount))
      .accounts({
        authority: authority,
        systemConfig,
        originMakerCollateralTokenBalance,
        preOfferCollateralTokenBalance,
        seedAccount: seedAccount.publicKey,
        holding: holdingB,
        maker,
        marketplace,
        poolTokenAccount: isNativeToken
          ? poolSolTokenAccount
          : poolUsdcTokenAccount,
        collateralTokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      })
      .remainingAccounts([
        {
          pubkey: walletBCollateralTokenBalance,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: walletBPointTokenBalance,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: userBConfig,
          isSigner: false,

          isWritable: true,
        },
        {
          pubkey: isNativeToken ? userSolTokenAccount : userUsdcTokenAccount,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: referralConfig,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: referrer,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: referrerCollateralTokenBalance,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: isNativeToken
            ? platformFeeAccountSOL
            : platformFeeAccountUSDT,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: preOffer,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: originOffer,
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
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
