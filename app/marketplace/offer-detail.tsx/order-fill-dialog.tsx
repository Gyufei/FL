import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { truncateAddr } from "@/lib/utils/web3";
import Link from "next/link";
import { useOrderFormat } from "@/lib/hooks/use-order-format";
import { IOrder } from "@/lib/types/order";

export default function OrderFillDialog({
  open,
  onOpenChange,
  order,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  order: IOrder;
}) {
  const { amount, orderTokenInfo } = useOrderFormat({ order: order });

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
            <div className="text-black">#{order.order_id}</div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-gray">Deposited</div>
            <div className="flex items-center space-x-1 text-black">
              <span>${amount}</span>
              <Image
                src={orderTokenInfo.logoURI}
                width={16}
                height={16}
                alt="token"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-gray">Tx</div>
            <div className="text-black">
              {truncateAddr(order.relist_tx_hash || order.order_tx_hash, {
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
