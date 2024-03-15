import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export type ISortField = "Created" | "Price" | "Collateral";
export type ISortDir = "Ascending" | "Descending";

export function SortSelect({
  sortField,
  sortDir,
  handleSortFieldChange,
  handleSortDirChange,
}: {
  sortField: ISortField;
  sortDir: ISortDir;
  handleSortFieldChange: (_s: ISortField) => void;
  handleSortDirChange: (_s: ISortDir) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleSortDirClick(field: ISortField, dir: ISortDir) {
    handleSortFieldChange(field);
    handleSortDirChange(dir);
    setPopOpen(false);
  }

  return (
    <DropdownMenu open={popOpen} onOpenChange={setPopOpen}>
      <DropdownMenuTrigger asChild>
        <div
          data-open={popOpen}
          className="flex cursor-pointer items-center space-x-1 rounded-full border border-[#D3D4D6] px-[16px] py-[5px] outline-none data-[open=true]:border-yellow data-[open=true]:bg-yellow"
        >
          <Image src="/icons/sort.svg" width={20} height={20} alt="type icon" />
          <div className="text-sm leading-5 text-black">{`${sortField}:${sortDir}`}</div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-left.svg"
            width={16}
            height={16}
            alt="arrow"
            className="data-[open=true]:rotate-90 data-[open=false]:-rotate-90"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[158px] border-0 bg-white p-1 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            data-checked={sortField === "Created"}
            className="flex h-9 cursor-pointer items-center rounded-xl px-4 text-xs leading-[18px] text-black data-[checked=true]:bg-[#FAFAFA]"
          >
            Created
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={6}
              className="w-[158px] border-0 bg-white p-1 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
            >
              <DropdownMenuItem
                data-active={sortField === "Created" && sortDir === "Ascending"}
                className="h-9 cursor-pointer py-[3px] data-[active=true]:bg-[#FAFAFA]"
              >
                <SortUp
                  onClick={() => handleSortDirClick("Created", "Ascending")}
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                data-active={
                  sortField === "Created" && sortDir === "Descending"
                }
                className="h-9 cursor-pointer py-[3px] data-[active=true]:bg-[#FAFAFA]"
              >
                <SortDown
                  onClick={() => handleSortDirClick("Created", "Descending")}
                />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortUp({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center space-x-1 " onClick={onClick}>
      <Image src="/icons/sort-up.svg" width={16} height={16} alt="up" />
      <span className="text-xs leading-[18px]">Sort Ascending</span>
    </div>
  );
}

function SortDown({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center space-x-1">
      <Image
        src="/icons/sort-up.svg"
        className="rotate-180"
        width={16}
        height={16}
        alt="up"
      />
      <span className="text-xs leading-[18px]">Sort Descending</span>
    </div>
  );
}
