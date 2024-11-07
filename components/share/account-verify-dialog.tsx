import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function AccountVerifyDialog({
  marketSymbol,
  targetUrl,
  open,
  setOpen,
}: {
  marketSymbol: string;
  targetUrl: string;
  open: boolean;
  setOpen: (_o: boolean) => void;
}) {
  function handleGo() {
    window.open(targetUrl);
  }

  return (
    <Dialog aria-describedby={undefined} open={open} onOpenChange={setOpen}>
      <DialogContent
        className="z-[101] flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-4"
        showClose={false}
      >
        <div className="mb-3 text-xl leading-[30px] text-black">
          Register an account
        </div>
        <div className="min-h-10 px-5 text-center text-sm leading-5 text-black">
          Go to the
          <span className="mx-2 inline-block text-red">{marketSymbol}</span>
          to register an account to trade
        </div>
        <div className="mt-10 w-full">
          <button
            onClick={handleGo}
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-yellow bg-yellow text-black"
          >
            Go
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
