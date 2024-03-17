"use client";
import Image from "next/image";
import { useState } from "react";
import HoverIcon from "../../components/share/hover-icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../../components/ui/input";
import { formatNum } from "@/lib/utils/number";

export default function OverviewCard() {
  const overviewDetail = {
    avatar: "/img/avatar-placeholder.png",
    name: "Open Solmap",
    floorPrice: 1.911,
    supply: 1000,
    dayChangePercent: 5.66,
    dayVol: 920.48,
    sevenDayChangePercent: -64.66,
    sevenVol: 6733.48,
    token: {
      logoURI: "/icons/eth.svg",
    },
  };

  const [isStar, setIsStar] = useState(false);

  function handleStar() {
    if (isStar) {
      setIsStar(false);
    } else {
      setIsStar(true);
    }
  }

  const handleCopy = () => {
    if (!overviewDetail.name) return;

    navigator.clipboard.writeText(overviewDetail.name);
    console.log({
      type: "success",
      message: "Copied to clipboard",
    });
  };

  const handleGoTwitter = () => {};

  const handleGoDiscord = () => {};

  return (
    <div className="rounded-3xl bg-[#F0F1F5] p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={overviewDetail.avatar}
            width={56}
            height={56}
            alt="avatar"
            className="rounded-full"
          />
          <div className="flex flex-col">
            <div className="text-lg leading-[28px] text-black">
              {overviewDetail.name}
            </div>
            <OverviewIcons
              isStar={isStar}
              handleStar={handleStar}
              handleCopy={handleCopy}
              handleGoTwitter={handleGoTwitter}
              handleGoDiscord={handleGoDiscord}
            />
          </div>
        </div>
        <FoldPop />
      </div>

      <div className="mt-5 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <LabelText>Floor Price</LabelText>
            <div className="flex items-center leading-6 text-black">
              {overviewDetail.floorPrice}
              <Image
                src={overviewDetail.token.logoURI}
                width={18}
                height={18}
                alt="token"
              />
            </div>
          </div>

          <div className="flex flex-col items-end">
            <LabelText>Supply</LabelText>
            <div className="flex items-center leading-6 text-black">
              {formatNum(overviewDetail.supply)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <LabelText>1D Change</LabelText>
            <div
              data-up={overviewDetail.dayChangePercent > 0}
              className="leading-6 data-[up=true]:text-green data-[up=false]:text-red"
            >
              {overviewDetail.dayChangePercent}%
            </div>
          </div>
          <div className="flex flex-col items-end">
            <LabelText>1D Vol.</LabelText>
            <div className="flex items-center leading-6 text-black">
              {overviewDetail.dayVol}
              <Image
                src={overviewDetail.token.logoURI}
                width={18}
                height={18}
                alt="token"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <LabelText>7D Change</LabelText>
            <div
              data-up={overviewDetail.sevenDayChangePercent > 0}
              className="leading-6 data-[up=true]:text-green data-[up=false]:text-red"
            >
              {overviewDetail.sevenDayChangePercent}%
            </div>
          </div>

          <div className="flex flex-col items-end">
            <LabelText>7D Vol.</LabelText>
            <div className="flex items-center leading-6 text-black">
              {overviewDetail.sevenVol}
              <Image
                src={overviewDetail.token.logoURI}
                width={18}
                height={18}
                alt="token"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewIcons({
  isStar,
  handleStar,
  handleCopy,
  handleGoTwitter,
  handleGoDiscord,
}: {
  isStar: boolean;
  handleStar: () => void;
  handleCopy: () => void;
  handleGoTwitter: () => void;
  handleGoDiscord: () => void;
}) {
  return (
    <div className="flex items-center space-x-1">
      <HoverIcon
        onClick={handleCopy}
        src="/icons/copy-gray.svg"
        hoverSrc="/icons/copy.svg"
        width={20}
        height={20}
        alt="copy"
      />

      <HoverIcon
        onClick={handleGoTwitter}
        src="/icons/twitter-gray.svg"
        hoverSrc="/icons/twitter.svg"
        width={20}
        height={20}
        alt="x"
      />

      <HoverIcon
        onClick={handleGoDiscord}
        src="/icons/discord-gray.svg"
        hoverSrc="/icons/discord.svg"
        width={20}
        height={20}
        alt="discord"
      />

      {isStar ? (
        <Image
          onClick={handleStar}
          src="/icons/stared.svg"
          width={20}
          height={20}
          alt="stared"
          className="cursor-pointer"
        />
      ) : (
        <HoverIcon
          onClick={handleStar}
          src="/icons/star-gray.svg"
          hoverSrc="/icons/star.svg"
          width={20}
          height={20}
          alt="star"
        />
      )}
    </div>
  );
}

function FoldPop() {
  const cateList = [
    {
      avatar: "/img/avatar-placeholder.png",
      name: "Untitled Ul",
      link: "untitledui.com",
    },
    {
      avatar: "/img/avatar-placeholder.png",
      name: "Sisyphus Ventures",
      link: "sisyphusvc.com",
    },
    {
      avatar: "/img/avatar-placeholder.png",
      name: "PolymathAl",
      link: "polymath-ai.com",
    },
  ];

  const [popOpen, setPopOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Image
            src={popOpen ? "/icons/fold.svg" : "/icons/fold-gray.svg"}
            width={20}
            height={20}
            alt="fold"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[210px] flex-col items-stretch border-none bg-white p-1"
      >
        <div className="relative mb-2 border-b border-[#fafafa] pb-2">
          <Image
            src={
              isInputFocused ? "/icons/search.svg" : "/icons/search-gray.svg"
            }
            width={20}
            height={20}
            alt="search"
            className="absolute top-[7px] left-[7px]"
          />
          <Input
            placeholder="Search"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="h-8 rounded-lg border-none bg-[#fafafa] pl-8"
          />
        </div>
        {cateList.map((cate) => (
          <div
            className="flex rounded-lg px-2 py-[6px] hover:bg-[#fafafa]"
            key={cate.name}
          >
            <Image
              src={cate.avatar || ""}
              width={32}
              height={32}
              alt="avatar"
              className="rounded-full"
            />
            <div className="ml-2 flex flex-col">
              <div className="text-xs leading-[18px] text-black">
                {cate.name}
              </div>
              <div className="text-[10px] leading-4 text-gray">{cate.link}</div>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return <div className="text-xs leading-[18px] text-gray">{children}</div>;
}
