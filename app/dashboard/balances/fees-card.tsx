"use client";
import { useState } from "react";
import { CardTitle } from "./card-title";
import DataTable from "./data-table";
import { range } from "lodash";

export function FeesCard() {
  const [page, setPage] = useState(1);
  const totalPage = 2;

  function handlePageChange(p: number) {
    setPage(p);
  }

  return (
    <div className="flex h-[310px] w-[49%] flex-col rounded-[20px] bg-white p-5">
      <CardTitle
        title="Fees"
        page={page}
        totalPage={totalPage}
        handlePageChange={handlePageChange}
      />
      <DataTable data={range(4)} handleGet={() => {}} />
    </div>
  );
}
