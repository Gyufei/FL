import Image from "next/image";
import { useEffect, useState } from "react";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import { IStock } from "@/lib/types/stock";

export default function DelistBtn({
  order,
  onSuccess,
}: {
  order: IStock;
  onSuccess: () => void;
}) {
  const [isHover, setIsHover] = useState(false);

  const {
    isLoading,
    write: action,
    isSuccess,
  } = useCloseOffer({
    marketplaceStr: order.market_place_account,
    makerStr: order.maker_account,
    offerStr: order.offer_account,
  });

  function handleCancel() {
    action(undefined);
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

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
        <div className="text-sm leading-7 text-black">Listed</div>
      )}
    </div>
  );
}
