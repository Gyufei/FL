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
import { useTranslations } from "next-intl";

function validateEmail(input: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(input);
}

export default function ContactUs() {
  const t = useTranslations("Home");
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
    <div className="bg-[#F9FAF2] px-4 pt-[60px] sm:px-[120px]">
      <div className="flex flex-col items-end justify-between sm:flex-row">
        <div className="flex w-full flex-col items-center sm:w-fit sm:items-start">
          <div className="text-center text-2xl leading-9 text-black sm:text-[40px] sm:text-4xl sm:leading-[54px]">
            {t("cap-StayInTheLoopWithUs")}
          </div>
          <div className="relative mt-5 flex w-full justify-center sm:w-fit">
            <Input
              className="h-10 w-full rounded-xl border border-[#d8d8d8] sm:h-12 sm:w-[480px]"
              type="email"
              placeholder={t("pl-EnterEmailAddress")}
              value={email}
              onChange={(e) => handleInput(e.target.value)}
            />
            <div
              data-active={isEmail}
              style={{
                left: "calc(50% + 116px)",
              }}
              className="absolute top-0 flex h-10 items-center rounded-lg px-5 leading-5 text-lightgray data-[active=true]:cursor-pointer data-[active=true]:bg-yellow data-[active=true]:text-black sm:top-1 sm:leading-[22px]"
              onClick={handleSubscribe}
            >
              {t("btn-Subscribe")}
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full items-center justify-start space-x-5 sm:mt-0 sm:w-fit">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray sm:h-14 sm:w-14">
            <HoverIcon
              onClick={handleGoDiscord}
              src="/icons/discord-gray.svg"
              hoverSrc="/icons/discord.svg"
              width={32}
              height={32}
              alt="discord"
            />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray sm:h-14 sm:w-14">
            <HoverIcon
              onClick={handleGoTwitter}
              src="/icons/twitter-gray.svg"
              hoverSrc="/icons/twitter.svg"
              width={32}
              height={32}
              alt="x"
            />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray sm:h-14 sm:w-14">
            <HoverIcon
              onClick={handleGoGithub}
              src="/icons/github.svg"
              hoverSrc="/icons/github.svg"
              width={32}
              height={32}
              alt="discord"
            />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray sm:h-14 sm:w-14">
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

      <div className="flex flex-col items-start justify-between py-[60px] px-0 sm:flex-row sm:items-center">
        <Image
          src="/icons/logo.svg"
          width={75}
          height={20}
          alt="logo"
          className="mb-8 sm:mb-0"
        />
        <div className="flex flex-wrap items-center justify-between gap-x-10 sm:flex-nowrap">
          <LinkItem href="">{t("lb-SubmitTicket")}</LinkItem>
          <LinkItem href="">{t("lb-ListingProposal")}</LinkItem>
          <LinkItem href="">{t("lb-ContactUs")}</LinkItem>
          <LinkItem href="">{t("lb-Docs")}</LinkItem>
        </div>
      </div>

      <div
        className="flex h-10 items-center justify-between py-[24px] px-0"
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
