import Image from "next/image";

export default function HomeFooter() {
  return (
    <div
      className="flex h-10 items-center justify-between px-[120px]"
      style={{
        boxShadow: "inset 0px 1px 0px 0px #EEEEEE",
      }}
    >
      <div className="text-sm leading-5 text-lightgray">
        Copyright @ Sherlock Protocol 2024. All Rights Reserved.
      </div>
      <div className="flex items-center space-x-5">
        <Image
          src="/icons/x.svg"
          width={28}
          height={28}
          alt="x"
          className="cursor-pointer hover:brightness-75"
        />
        <Image
          src="/icons/discord.svg"
          width={28}
          height={28}
          alt="discord"
          className="cursor-pointer hover:brightness-75"
        />
      </div>
    </div>
  );
}
