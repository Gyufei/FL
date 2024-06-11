"use client";

import Image from "next/image";
import HoverIcon from "@/components/share/hover-icon";
import { Input } from "@/components/ui/input";
import {
  handleGoDiscord,
  handleGoGithub,
  handleGoTg,
  handleGoTwitter,
} from "@/lib/utils/social";
import { useState } from "react";

function validateEmail(input: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(input);
}

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  function handleInput(val: string) {
    setEmail(val);
    setIsEmail(validateEmail(val));
  }

  function handleSubscribe() {
    if (!isEmail) return;
  }

  return (
    <div className="bg-[#F9FAF2] px-[120px] pt-[60px]">
      <div className="flex items-end justify-between">
        <div className="flex flex-col items-start">
          <div className="text-center text-[40px] leading-[54px] text-black sm:text-4xl sm:leading-[54px]">
            Stay in the loop with us
          </div>
          <div className="relative mt-5 flex justify-center">
            <Input
              className="h-10 w-[480px] rounded-xl border border-[#d8d8d8] sm:h-12"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => handleInput(e.target.value)}
            />
            <div
              data-active={isEmail}
              style={{
                left: "calc(50% + 118px)",
              }}
              className="absolute top-0 flex h-10 items-center rounded-lg px-5 leading-5 text-lightgray data-[active=true]:cursor-pointer data-[active=true]:bg-yellow data-[active=true]:text-black sm:top-1 sm:leading-[22px]"
              onClick={handleSubscribe}
            >
              Subscribe
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray">
            <HoverIcon
              onClick={handleGoDiscord}
              src="/icons/discord-gray.svg"
              hoverSrc="/icons/discord.svg"
              width={32}
              height={32}
              alt="discord"
            />
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray">
            <HoverIcon
              onClick={handleGoTwitter}
              src="/icons/twitter-gray.svg"
              hoverSrc="/icons/twitter.svg"
              width={32}
              height={32}
              alt="x"
            />
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray">
            <HoverIcon
              onClick={handleGoGithub}
              src="/icons/github.svg"
              hoverSrc="/icons/github.svg"
              width={32}
              height={32}
              alt="discord"
            />
          </div>
          <div className="flex h-14 w-14  items-center justify-center rounded-xl border border-gray">
            <HoverIcon
              onClick={handleGoTg}
              src="/icons/telegram.svg"
              hoverSrc="/icons/telegram.svg"
              width={32}
              height={32}
              alt="discord"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between py-[60px] px-4 sm:flex-row sm:px-[120px] 2xl:px-0">
        <Image
          src="/icons/logo.svg"
          width={75}
          height={20}
          alt="logo"
          className="mb-8 sm:mb-0"
        />
        <div className="flex flex-wrap items-center space-x-10 sm:flex-nowrap">
          <LinkItem href="">Submit ticket</LinkItem>
          <LinkItem href="">Listing proposal</LinkItem>
          <LinkItem href="">Contact us</LinkItem>
          <LinkItem href="">Docs</LinkItem>
        </div>
      </div>

      <div
        className="flex h-10 items-center justify-between px-2 py-[24px] sm:px-[120px] 2xl:px-0"
        style={{
          boxShadow: "inset 0px 1px 0px 0px #EEEEEE",
        }}
      >
        <div className="text-sm leading-5 text-lightgray">
          <span className="hidden sm:inline-block">
            Copyright @ Tadle Protocol 2024. All Rights Reserved.
          </span>
          <span className="inline-block sm:hidden">
            Copyright @ Tadle Protocol 2024. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

function LinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="text-sm leading-5 text-lightgray hover:text-black"
      href={href}
    >
      {children}
    </a>
  );
}
