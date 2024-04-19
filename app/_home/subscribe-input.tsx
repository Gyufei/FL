"use client";
import { useState } from "react";
import { Input } from "../../components/ui/input";

function validateEmail(input: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(input);
}

export default function SubscribeInput() {
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  function handleInput(val: string) {
    setEmail(val);
    setIsEmail(validateEmail(val));
  }

  function handleSubscribe() {
    if (!isEmail) return;
    console.log("subscribed");
  }

  return (
    <div
      className="mt-[60px] w-full bg-cover bg-no-repeat py-20"
      style={{
        backgroundColor: "rgba(254, 255, 250, 0.8)",
        backdropFilter: "blur(100px)",
        backgroundImage: "url(/img/yellow-bg.png)",
      }}
    >
      <div className="text-center text-2xl leading-9 text-black sm:text-4xl sm:leading-[54px]">
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
  );
}
