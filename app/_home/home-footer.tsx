"use client";
import HoverIcon from "../../components/share/hover-icon";

export default function HomeFooter() {
  const handleGoTwitter = () => {};

  const handleGoDiscord = () => {};

  return (
    <div
      className="flex h-10 items-center justify-between px-[120px]"
      style={{
        boxShadow: "inset 0px 1px 0px 0px #EEEEEE",
      }}
    >
      <div className="text-sm leading-5 text-lightgray">
        Copyright @ Tadle 2023. All Rights Reserved.
      </div>
      <div className="flex items-center space-x-5">
        <HoverIcon
          onClick={handleGoTwitter}
          src="/icons/twitter-gray.svg"
          hoverSrc="/icons/twitter.svg"
          width={28}
          height={28}
          alt="x"
        />
        <HoverIcon
          onClick={handleGoDiscord}
          src="/icons/discord-gray.svg"
          hoverSrc="/icons/discord.svg"
          width={28}
          height={28}
          alt="discord"
        />
      </div>
    </div>
  );
}
