import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { truncateAddr } from "@/lib/utils/web3";
import Link from "next/link";

export default function OrderFillDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
}) {
  const orderNo = 11209371;
  const deposit = 63;
  const tokenLogo = "/icons/usdc.svg";
  const txHash = "DSUvc5qf5LJHHV5e2tD184ixotSnCnwj7i4jJa4Xsrmt";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent
        overlayClassName="z-[110]"
        className="z-[110] flex w-[400px] flex-col gap-0 rounded-3xl border-none bg-white p-6"
      >
        <div className="flex flex-col items-center">
          <Image
            src="/img/image-placeholder.png"
            width={120}
            height={120}
            alt="placeholder"
          />
          <div className="mt-4 text-xl leading-[30px] text-black">
            Taker Order filled
          </div>
        </div>

        <div className="mt-[30px] text-sm leading-5">
          <div className="flex justify-between">
            <div className="text-gray">Sub No.</div>
            <div className="text-black">#{orderNo}</div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-gray">Deposited</div>
            <div className="flex items-center space-x-1 text-black">
              <span>${deposit}</span>
              <Image src={tokenLogo} width={16} height={16} alt="token" />
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-gray">Tx</div>
            <div className="text-black">
              {truncateAddr(txHash, {
                nPrefix: 4,
                nSuffix: 4,
              })}
            </div>
          </div>
        </div>

        <Link href="/dashboard/my-stocks">
          <button className="mt-7 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black">
            <span className="mr-1 inline-block">Go To My Stocks</span>
            <Image
              src="/icons/right-45.svg"
              className="rotate-45"
              width={20}
              height={20}
              alt="token"
            />
          </button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}