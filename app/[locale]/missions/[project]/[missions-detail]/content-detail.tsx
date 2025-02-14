"use client";

import React from "react";

function ProjectContentDetail({
  needRegister,
  goRegister,
  htmlStr,
}: {
  needRegister: boolean;
  goRegister: () => void;
  htmlStr: string;
}) {
  if (needRegister) {
    return (
      <div className="m-auto flex h-full items-center justify-center bg-[#fafafa] sm:max-w-[768px]">
        <button
          onClick={goRegister}
          className="flex w-[320px] items-center justify-center space-x-2 rounded-full bg-[#E0FF62] px-4 py-3 text-[16px] font-[500]"
        >
          <span>Please register first</span>
        </button>
      </div>
    );
  }
  return (
    <div
      className="m-auto flex flex-col items-center justify-center bg-[#fafafa] sm:max-w-[768px]"
      dangerouslySetInnerHTML={{ __html: htmlStr }}
    />
  );
}

export default ProjectContentDetail;
