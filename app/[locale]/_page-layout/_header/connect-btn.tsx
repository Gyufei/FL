"use client";

import { useCallback, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { truncateAddr } from "@/lib/utils/web3";
import WalletSelectDialog, {
  WalletSelectDialogVisibleAtom,
} from "@/components/share/wallet-select-dialog";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSignInAction } from "@/lib/hooks/web3/use-sign-in-action";
import { AccessTokenAtom, ShowSignDialogAtom } from "@/lib/states/user";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useUpdateReferral } from "@/lib/hooks/contract/use-update-referral";
import { useReferralCodeData } from "@/lib/hooks/api/use-referral-data";
import { usePathname, useRouter } from "@/app/navigation";
import { useReferralView } from "@/lib/hooks/api/use-referral";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useCurrentChain } from "@/lib/hooks/web3/use-current-chain";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConnectBtn() {
  const t = useTranslations("Header");

  const { isEth, isSolana } = useCurrentChain();
  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  const query = useSearchParams();
  const referralCode = query.get("s") || "";

  const { trigger: viewReferral } = useReferralView();

  const { open: wcModalOpen } = useWeb3Modal();
  const openSolWalletSelectDialog = useCallback(() => {
    if (isEth) {
      wcModalOpen();
    }

    if (isSolana) {
      setWalletSelectDialogVisible(true);
    }
  }, [setWalletSelectDialogVisible, isEth, isSolana, wcModalOpen]);

  const { address, shortAddr, connected, connecting } = useChainWallet();

  const token = useAtomValue(AccessTokenAtom);
  const [showSignIn, setShowSignIn] = useAtom(ShowSignDialogAtom);

  useEffect(() => {
    if (referralCode && address) {
      viewReferral({ referral_code: referralCode, authority: address });
    }
  }, [referralCode, viewReferral, address]);

  useEffect(() => {
    setTimeout(() => {
      const noConnect = !connecting && !connected && !address;
      if (noConnect) {
        setWalletSelectDialogVisible(true);
      }
    }, 500);
  }, [connecting, connected, address, setWalletSelectDialogVisible]);

  useEffect(() => {
    if (address && (referralCode || !token)) {
      setShowSignIn(true);
      return;
    }
  }, [address, setShowSignIn, token, referralCode]);

  if (!connected) {
    return (
      <>
        <button
          className="shadow-25 h-10 rounded-full bg-[#f0f1f5] px-4 text-base leading-6 transition-all sm:h-12 sm:px-[22px]"
          onClick={() => openSolWalletSelectDialog()}
        >
          <span className="hidden sm:inline-block">
            {t("btn-ConnectWallet")}
          </span>
          <span className="inline-block sm:hidden">{t("btn-Connect")}</span>
        </button>
        <WalletSelectDialog />
      </>
    );
  }

  return (
    <Dialog open={showSignIn} onOpenChange={(isOpen) => setShowSignIn(isOpen)}>
      <DialogTrigger asChild>
        <button className="shadow-25 h-10 rounded-full border border-[#d3d4d6] px-6 text-base leading-6 text-black transition-all hover:border-transparent hover:bg-yellow sm:h-12">
          <div className="flex items-center">
            {!shortAddr || connecting ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <div>{shortAddr}</div>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        showClose={false}
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {referralCode ? (
          <ReferralSignInBtn referralCode={referralCode} />
        ) : token ? (
          <SignOutBtn />
        ) : (
          <ContinueBtn />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ContinueBtn() {
  const t = useTranslations("Header");
  const { signInAction } = useSignInAction();

  return (
    <>
      <div className="mb-3 text-xl leading-[30px] text-black">
        {t("cap-YouAreSignedOut")}
      </div>
      <div className="min-h-10 px-5 text-center text-sm leading-5 text-black">
        {t("txt-SignAMessageInYourWallet")}
      </div>
      <div className="mt-10 w-full">
        <button
          onClick={signInAction}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-yellow text-black"
        >
          {t("btn-Continue")}
        </button>
      </div>
    </>
  );
}

export function ReferralSignInBtn({ referralCode }: { referralCode: string }) {
  const t = useTranslations("Header");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: codeData } = useReferralCodeData({ code: referralCode });

  const referrerStr = useMemo(() => {
    if (!codeData) return "";
    return codeData.authority;
  }, [codeData]);

  const shortAddr = useMemo(() => {
    if (!referrerStr) return "";
    return truncateAddr(referrerStr, {
      nPrefix: 4,
      nSuffix: 4,
    });
  }, [referrerStr]);

  const {
    data: txHash,
    isLoading: isUpdating,
    isSuccess,
    write: writeAction,
  } = useUpdateReferral({
    referrerStr,
    referralCode,
  });

  function handleSignInReferral() {
    if (isUpdating || !codeData) return;
    writeAction(undefined);
  }

  useEffect(() => {
    if (isSuccess) {
      if (searchParams.get("s")) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("s");

        router.replace(pathname + `?${params.toString()}`);
      }
    }
  }, [isSuccess, txHash]);

  return (
    <>
      <div className="mb-3 text-xl leading-[30px] text-black">
        {t("cap-Welcome")}
      </div>
      <div className="min-h-10 px-5 text-center text-sm leading-5 text-black">
        {t.rich("txt-YourFriendSentYouAnOnboardingInvitation", {
          name: (_chunks: any) => (
            <span className="text-green">{shortAddr}</span>
          ),
          num: (_chunks: any) => (
            <span className="text-green">
              {Number(codeData?.authority_rate || 0) / 10 ** 4 + "%"}
            </span>
          ),
        })}
      </div>
      <div className="mt-10 w-full">
        <button
          onClick={handleSignInReferral}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-yellow text-black"
        >
          {t("btn-SignIn")}
        </button>
      </div>
    </>
  );
}

function SignOutBtn() {
  const t = useTranslations("Header");
  const { disconnect } = useChainWallet();
  const setToken = useSetAtom(AccessTokenAtom);

  const handleDisconnect = () => {
    disconnect();
    setToken("");
  };

  return (
    <>
      <div className="mb-3 text-xl leading-[30px] text-black">
        {t("cap-YouAreSignedIn")}
      </div>
      <div className="min-h-10 px-5 text-center text-sm leading-5 text-black"></div>
      <div className="mt-10 w-full">
        <button
          onClick={handleDisconnect}
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-red bg-white text-red hover:bg-red hover:text-white"
        >
          {t("btn-SignOut")}
        </button>
      </div>
    </>
  );
}
