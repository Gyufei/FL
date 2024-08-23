import useTadleProgram from "@/lib/hooks/web3/use-tadle-program";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useAccountsSol } from "@/lib/hooks/contract/help/use-accounts-sol";
import { useBuildTransactionSol } from "@/lib/hooks/contract/help/use-build-transaction-sol";
import { SolanaZeroed } from "@/lib/const/solana";

export function useCreateTakerSol({
  marketplaceStr,
  offerStr,
  makerStr,
  originOfferStr,
  originOfferAuthStr,
  preOfferAuthStr,
  referrerStr,
  isNativeToken
}: {
  marketplaceStr: string;
  offerStr: string;
  makerStr: string;
  originOfferStr: string
  originOfferAuthStr: string,
  preOfferAuthStr: string,
  referrerStr: string,
  isNativeToken: boolean
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransactionSol();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccountsSol();

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
      wsolTokenMint
    } = await getAccounts(program.programId);

    const marketPlace = new PublicKey(marketplaceStr);
    const offerA = new PublicKey(offerStr);
    const maker = new PublicKey(makerStr);
    const originOffer = new PublicKey(originOfferStr);
    const originOfferAuthority = new PublicKey(originOfferAuthStr);
    const preOfferAuthority = new PublicKey(preOfferAuthStr);
    const referrer = new PublicKey(referrerStr || SolanaZeroed);

    const {
      walletBaseTokenBalance: walletBBaseTokenBalance,
      walletPointTokenBalance: walletBPointTokenBalance
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace, isNativeToken)

    const {
      walletBaseTokenBalance: originMakerBaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, originOfferAuthority, marketPlace, isNativeToken)

    const {
      walletBaseTokenBalance: preOfferBaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, preOfferAuthority, marketPlace, isNativeToken)

    const stockB = PublicKey.findProgramAddressSync(
      [
        Buffer.from("stock"),
        seedAccount.publicKey.toBuffer()
      ],
      program.programId
    )[0];

    const referralConfig = referrerStr ? PublicKey.findProgramAddressSync(
      [
        Buffer.from("referral_config"),
        authority!.toBuffer()
      ],
      program.programId
    )[0] : referrer;

    const referrerBaseTokenBalance = referrerStr ? PublicKey.findProgramAddressSync(
      [
        Buffer.from("token_balance"),
        usdcTokenMint.toBuffer(),
        referrer.toBuffer()
      ],
      program.programId
    )[0] : referrer;


    console.log(Object.entries({
        authority: authority,
        systemConfig,
        originMakerBaseTokenBalance,
        preOfferBaseTokenBalance,
        seedAccount: seedAccount.publicKey,
        stock: stockB,
        preOffer: offerA,
        originOffer: originOffer,
        maker,
        marketPlace,
        poolTokenAccount: isNativeToken ? poolSolTokenAccount : poolUsdcTokenAccount,
        tokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
    }).map((v) => 
      ({ [v[0]]: v[1]?.toBase58() })
    ))

    const methodTransaction = await program.methods
      .createTaker(new BN(pointAmount))
      .accounts({
        authority: authority,
        systemConfig,
        originMakerBaseTokenBalance,
        preOfferBaseTokenBalance,
        seedAccount: seedAccount.publicKey,
        stock: stockB,
        preOffer: offerA,
        originOffer: originOffer,
        maker,
        marketPlace,
        poolTokenAccount: isNativeToken ? poolSolTokenAccount : poolUsdcTokenAccount,
        tokenMint: isNativeToken ? wsolTokenMint : usdcTokenMint,
        tokenProgram,
        tokenProgram2022,
        systemProgram,
      }).remainingAccounts([
        {
          pubkey: walletBBaseTokenBalance,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: walletBPointTokenBalance,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: userBConfig,
          isSigner: false,

          isWritable: true
        },
        {
          pubkey: isNativeToken ? userSolTokenAccount : userUsdcTokenAccount,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: referralConfig,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: referrer,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: referrerBaseTokenBalance,
          isSigner: false,
          isWritable: true
        }
      ]).transaction();

    const txHash = await buildTransaction(methodTransaction, program, [seedAccount], authority!);

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
