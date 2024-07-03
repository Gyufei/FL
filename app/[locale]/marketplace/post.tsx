import Image from "next/image";
import { format } from "date-fns";

export default function Post() {
  const postData = {
    time: Date.now(),
    title: "How Did My Audit Go?",
    subTitle: "A Framework For Evaluating Audit Effectiveness.",
    content:
      "Right now the process of choosing and recommending audit firms in the blockchain space is opaque. Sticking to the values of Web3, we want to demystify the selection process and introduce quantifiable metrics for audit",
  };

  return (
    <div className="mt-4 flex flex-col rounded-3xl bg-[#fafafa] p-4">
      <div className="text-xs leading-[18px] text-lightgray mb-[10px]">
        {format(postData.time, "MMMM d, yyyy")}
      </div>
      <div className="mb-2 flex h-10 items-center rounded-lg bg-yellow px-[10px] text-xl leading-[30px] text-black">
        {postData.title}
      </div>
      <div className="mb-[10px] text-xl leading-[30px] text-black">
        {postData.subTitle}
      </div>
      <div className="text-sm leading-5 text-lightgray line-clamp-6">{postData.content}</div>
      <div className="flex items-center justify-between mt-[14px]">
        <div className="h-[2px] w-10 rounded-lg bg-lightgray"></div>
        <div className="flex items-center cursor-pointer">
          <div className="text-sm leading-5 text-lightgray">Read</div>
          <Image
            src="/icons/right-arrow-gray.svg"
            width={16}
            height={16}
            alt="go"
          />
        </div>
      </div>
    </div>
  );
}
