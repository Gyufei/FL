import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";

function validateEmail(input: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(input);
}

export default function SubscribeInput() {
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
    <div className="relative mt-5 flex w-full justify-center sm:w-fit">
      {/* <iframe
        src="https://embeds.beehiiv.com/c77f4105-291d-498e-b453-51890806d944?slim=true"
        data-test-id="beehiiv-embed"
        height="52"
        frameBorder="0"
        scrolling="no"
        style={{
          margin: 0,
          borderRadius: "0px !important",
          backgroundColor: "transparent",
        }}
      ></iframe> */}
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
  );
}
