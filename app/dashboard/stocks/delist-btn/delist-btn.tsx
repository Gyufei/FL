import Image from "next/image";
import { useState } from "react";
import { IOrder } from "@/lib/types/order";
import { useUnlistMaker } from "@/lib/hooks/contract/use-unlist-maker";

export default function DelistBtn({ order }: { order: IOrder }) {
  const [isHover, setIsHover] = useState(false);

  const {
    isLoading,
    write: action,
    // isSuccess,
  } = useUnlistMaker({
    makerStr: order.maker_id,
    orderStr: order.order,
  });

  function handleCancel() {
    action(undefined);
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover || isLoading ? (
        <button
          disabled={isLoading}
          onClick={handleCancel}
          className="flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black disabled:opacity-70"
        >
          <Image
            src="/icons/upload.svg"
            width={16}
            height={16}
            alt="list"
            className="rotate-180"
          />
          <span>Delist</span>
        </button>
      ) : (
        <div className="text-sm leading-5 text-black">Listed</div>
      )}
    </div>
  );
}
