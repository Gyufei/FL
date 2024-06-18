import { useSignInAction } from "@/lib/hooks/web3/use-sign-in-action";
import { useTranslations } from "next-intl";

export function SignInBtn() {
  const t = useTranslations("Common");
  const { signInAction } = useSignInAction();

  return (
    <div className="mt-10 w-full">
      <button
        onClick={signInAction}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-yellow text-black"
      >
        {t("SignIn")}
      </button>
    </div>
  );
}
