import Image from "next/image";

export function CardTitle({
  title,
  page,
  totalPage,
  handlePageChange,
}: {
  title: string;
  page: number;
  totalPage: number;
  handlePageChange: (_p: number) => void;
}) {
  const beginInactive = totalPage === 1 || page === 1;
  const endInactive = page === totalPage;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-6 w-6 rounded-lg bg-yellow"></div>
        <div className="ml-[10px] text-base leading-6 text-black">{title}</div>
      </div>
      <div className="flex items-center">
        <Image
          src={beginInactive ? "/icons/left-gray.svg" : "/icons/left.svg"}
          width={24}
          height={24}
          alt="left"
          onClick={() => handlePageChange(page - 1)}
          data-active={!beginInactive}
          className="cursor-pointer data-[active=false]:pointer-events-none"
        />
        <div className="h-6 w-6 text-center text-base leading-6 text-black">
          {page}
        </div>
        <Image
          src={endInactive ? "/icons/left-gray.svg" : "/icons/left.svg"}
          width={24}
          height={24}
          alt="left"
          onClick={() => handlePageChange(page + 1)}
          data-active={!endInactive}
          className="rotate-180 cursor-pointer data-[active=false]:pointer-events-none"
        />
      </div>
    </div>
  );
}
