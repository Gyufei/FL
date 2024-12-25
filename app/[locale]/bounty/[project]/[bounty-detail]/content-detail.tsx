"use client";

import React from "react";
import Image from "next/image";

function ProjectContentDetail({ closeDetail }: any) {
  return (
    <div className="flex flex-col items-center justify-center  bg-[#fafafa] text-white">
      <div className="mb-5 flex items-center justify-center">
        <Image
          src="/img/mock/image@2x (3).png"
          alt="Icon"
          className="cursor-pointer rounded-lg sm:max-w-[800px]"
          width={800}
          height={800}
          onClick={closeDetail}
        />
      </div>
      <div className="max-w-[800px] text-[16px] text-[#2D2E33] ">
        Transact Using Backpack Transact Using Backpack Transact Using Backpack
        Transact Using Backpack Transact Using Backpack Transact Using Backpack
        Transact Using Backpack Transact Using Backpack Transact Using Backpack
        Transact Using Backpack{" "}
      </div>
    </div>
  );
}

export default ProjectContentDetail;
