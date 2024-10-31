"use client";

import { useEffect, useState } from "react";
import { Twitter, Mail, Send, MessageSquare, Github } from "lucide-react";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";

type SocialLink = {
  icon: React.ElementType;
  name: string;
  type: string;
  url: string;
  placeholder: string;
  value: string;
  linked: boolean;
  focus: boolean;
  linkFn: () => void;
  unlinkFn: (subject: string) => void;
  subject: string;
};

export default function Component() {
  const {
    user,
    linkEmail,
    linkDiscord,
    linkTelegram,
    linkGithub,
    linkTwitter,
    unlinkGithub,
    unlinkTelegram,
    unlinkEmail,
    unlinkTwitter,
    unlinkDiscord,
  } = usePrivy();
  const [links, setLinks] = useState<SocialLink[]>([
    {
      icon: Twitter,
      name: "X (twitter)",
      type: "twitter",
      url: "https://x.com/",
      placeholder: " | yourid",
      value: "",
      linked: true,
      focus: false,
      linkFn: linkTwitter,
      unlinkFn: unlinkTwitter,
      subject: "",
    },
    {
      icon: Mail,
      name: "Email",
      type: "email",
      url: "",
      placeholder: "name@gmail.com",
      value: "",
      linked: false,
      focus: false,
      linkFn: linkEmail,
      unlinkFn: unlinkEmail,
      subject: "",
    },
    {
      icon: Send,
      name: "Telegram",
      type: "telegram",
      url: "https://telegram.org/",
      placeholder: " | yourid",
      value: "",
      linked: false,
      focus: false,
      linkFn: linkTelegram,
      unlinkFn: unlinkTelegram,
      subject: "",
    },
    {
      icon: MessageSquare,
      name: "Discord",
      type: "discord",
      url: "",
      placeholder: "@",
      value: "",
      linked: false,
      focus: false,
      linkFn: linkDiscord,
      unlinkFn: unlinkDiscord,
      subject: "",
    },
    {
      icon: Github,
      name: "Github",
      type: "github",
      url: "https://github.com/",
      placeholder: " | yourid",
      value: "",
      linked: false,
      focus: false,
      linkFn: linkGithub,
      unlinkFn: unlinkGithub,
      subject: "",
    },
  ]);

  useEffect(() => {
    if (user) {
      const newLinks = links.map((link) => {
        let value = (user as any)?.[link.type]?.address || "";
        if (["github", "telegram", "twitter", "discord"].includes(link.type)) {
          value = (user as any)?.[link.type]?.username;
        }
        return {
          ...link,
          value,
          subject: (user as any)?.[link.type]?.subject || "",
          linked: (user as any)?.[link.type],
        };
      });
      setLinks(newLinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleInputChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index].value = value;
    setLinks(newLinks);
  };
  const handleInputFocus = (index: number) => {
    const newLinks = [...links];
    newLinks[index].focus = true; // 设置 focus 为 true
    setLinks(newLinks);
  };

  const handleInputBlur = (index: number) => {
    const newLinks = [...links];
    newLinks[index].focus = false; // 设置 focus 为 false
    setLinks(newLinks);
  };

  const handleLinkChange = (link: SocialLink) => {
    if (link.linked) {
      link.unlinkFn(link.subject);
    } else {
      link.linkFn();
    }
  };

  return (
    <div className="font-video mx-auto mt-5 max-w-md text-[16px]">
      {links.map((link, index) => (
        <div key={link.name} className="mb-6 last:mb-0">
          <div className="mb-2 flex items-center">
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-black">
              <link.icon className="h-3 w-3 text-white" />
            </div>
            <span className="text-lg font-medium">{link.name}</span>
          </div>
          <div
            className={`flex h-[48px] items-center rounded-xl border bg-[#fafafa] ${
              link.focus ? "border-[#3DD866]" : "border-transparent"
            }`}
          >
            <span className="text-gray-400 pl-3">{link.url}</span>
            <input
              type="text"
              readOnly
              value={link.value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onFocus={() => handleInputFocus(index)}
              onBlur={() => handleInputBlur(index)}
              placeholder={link.placeholder}
              className=" w-full pr-10 text-[14px]"
            />
            <Image
              onClick={() => handleLinkChange(link)}
              src={
                link.linked ? "/icons/disconnect.svg" : "/icons/rpc-link.svg"
              }
              width={24}
              height={24}
              alt="link"
              className="mr-[12px] cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
