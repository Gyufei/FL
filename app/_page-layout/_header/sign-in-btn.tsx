import { useSignInAction } from "@/lib/hooks/web3/use-sign-in-action";

export function SignInBtn() {
  const { signInAction } = useSignInAction();

  return (
    <div className="mt-5 w-full">
      <button
        onClick={signInAction}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-yellow text-black"
      >
        Sign in
      </button>
    </div>
  );
}
