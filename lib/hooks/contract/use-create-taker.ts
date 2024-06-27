import useTadleProgram from "../web3/use-tadle-program";
import useTxStatus from "./help/use-tx-status";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useTransactionRecord } from "../api/use-transactionRecord";
import { useAccounts } from "./help/use-accounts";
import { useBuildTransaction } from "./help/use-build-transaction";
import { SolanaZeroed } from "@/lib/constant";

export function useCreateTaker({
  marketplaceStr,
  offerStr,
  makerStr,
  originOfferStr,
  originOfferAuthStr,
  preOfferAuthStr,
  referrerStr,
  isSol
}: {
  marketplaceStr: string;
  offerStr: string;
  makerStr: string;
  originOfferStr: string
  originOfferAuthStr: string,
  preOfferAuthStr: string,
  referrerStr: string,
  isSol: boolean
}) {
  const { program } = useTadleProgram();
  const { buildTransaction } = useBuildTransaction();
  const { recordTransaction } = useTransactionRecord();
  const { getAccounts, getWalletBalanceAccount } = useAccounts();

  const writeAction = async ({ pointAmount }: { pointAmount: number }) => {
    const {
      tokenProgram,
      tokenProgram2022,
      authority,
      systemProgram,
      systemConfig,
      userUsdcTokenAccount,
      poolUsdcTokenAccount,
      usdcTokenMint,
      seedAccount,
      userConfig: userBConfig,
      userSolTokenAccount
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
    } = await getWalletBalanceAccount(program.programId, authority!, marketPlace)

    const {
      walletBaseTokenBalance: originMarkerBaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, originOfferAuthority, marketPlace)

    const {
      walletBaseTokenBalance: preOfferBaseTokenBalance,
    } = await getWalletBalanceAccount(program.programId, preOfferAuthority, marketPlace)

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


    const methodTransaction = await program.methods
      .createTaker(new BN(pointAmount))
      .accounts({
        authority: authority,
        systemConfig,
        originMarkerBaseTokenBalance,
        preOfferBaseTokenBalance,
        seedAccount: seedAccount.publicKey,
        stock: stockB,
        preOffer: offerA,
        originOffer: originOffer,
        maker,
        marketPlace,
        poolTokenAccount: poolUsdcTokenAccount,
        tokenMint: usdcTokenMint,
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
          pubkey: isSol ? userSolTokenAccount : userUsdcTokenAccount,
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
