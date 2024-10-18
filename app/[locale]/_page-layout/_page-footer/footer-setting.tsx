import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import HoverIcon from "@/components/share/hover-icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useRpcLatency } from "@/lib/hooks/web3/use-rpc-latency";
import { Input } from "@/components/ui/input";
import { isProduction } from "@/lib/PathMap";
import { getDomainName } from "@/lib/utils/common";
import { useTranslations } from "next-intl";
import { useRpc } from "@/lib/hooks/web3/use-rpc";
import { ChainType } from "@/lib/types/chain";

export default function FooterSetting() {
  const ct = useTranslations("pop-Setting");

  const { globalRpcs, customRpcs, setCustomRpcAction, testRpcLatency } =
    useRpc();

  const [popOpen, setPopOpen] = useState(false);

  const [checkedChain, setCheckedChain] = useState<ChainType>(ChainType.ETH);

  const [inputRpc, setInputRpc] = useState("");
  const [inputRpcActive, setInputRpcActive] = useState(false);
  const [inputRpcError, setInputRpcError] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [inputRpcLatency, setInputRpcLatency] = useState(0);

  useEffect(() => {
    if (customRpcs[checkedChain]) {
      setInputRpc(customRpcs[checkedChain]);
      setInputRpcActive(true);
      setShowInput(false);
    }
  }, [customRpcs, checkedChain]);

  function handleCheck(chain: ChainType) {
    if (checkedChain === chain) {
      return;
    }

    setCheckedChain(chain);
    setInputRpcActive(false);
    setInputRpcError(false);
    setShowInput(true);
  }

  async function handleLinkCustomRpc() {
    if (!inputRpc) {
      return;
    }

    try {
      const latency = await testRpcLatency(checkedChain, inputRpc);

      setCustomRpcAction(checkedChain, inputRpc);
      setInputRpcActive(true);

      return latency;
    } catch (e) {
      setInputRpcError(true);
    }
  }

  useEffect(() => {
    if (!inputRpc || !inputRpcActive) {
      return;
    }

    async function getRpcMs() {
      const latency = await testRpcLatency(checkedChain, inputRpc);
      setInputRpcLatency(latency);
    }

    getRpcMs();
  }, [inputRpc, inputRpcActive]);

  function handleCheckCustomRpc() {
    return;
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <HoverIcon
          src="/icons/setting-gray.svg"
          hoverSrc="/icons/setting.svg"
          width={24}
          height={24}
          active={popOpen}
          alt="setting"
        />
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[348px] flex-col items-stretch space-y-2 border-none bg-white p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        <div className="ml-30 flex items-center">
          <div className="flex flex-1 justify-center text-xl leading-[30px]">
            {ct("cap-Setting")}
          </div>
          <Image
            onClick={() => setPopOpen(false)}
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            className="cursor-pointer"
          />
        </div>

        <div className="mt-4 flex flex-col space-y-2">
          <div className="text-sm leading-5 text-black">
            {ct("cap-Networks")}
          </div>
          <NetItem
            name="Eth RPC"
            label="Mainnet"
            chain={ChainType.ETH}
            rpc={globalRpcs[ChainType.ETH]}
            checked={checkedChain === ChainType.ETH}
            onCheckedChange={() => handleCheck(ChainType.ETH)}
          />
          <NetItem
            name="Bnb RPC"
            label="Mainnet"
            chain={ChainType.BNB}
            rpc={globalRpcs[ChainType.BNB]}
            checked={checkedChain === ChainType.BNB}
            onCheckedChange={() => handleCheck(ChainType.BNB)}
          />
          <NetItem
            name="Solana RPC"
            label="Mainnet"
            chain={ChainType.SOLANA}
            rpc={globalRpcs[ChainType.SOLANA]}
            checked={checkedChain === ChainType.SOLANA}
            onCheckedChange={() => handleCheck(ChainType.SOLANA)}
          />
        </div>

        <div className="relative mt-4 border-t border-dashed border-[#eee] pt-4">
          {showInput ? (
            <>
              <Input
                data-error={inputRpcError}
                placeholder={ct("pl-InputYourCustomRPC")}
                value={inputRpc}
                onChange={(e) => setInputRpc(e.target.value)}
                className="h-10 rounded-lg border-none bg-[#fafafa] pl-3 pr-[50px] data-[error]:border-red"
              />
              <Image
                onClick={handleLinkCustomRpc}
                src={
                  inputRpcActive
                    ? "/icons/rpc-link.svg"
                    : "/icons/rpc-link-gray.svg"
                }
                width={24}
                height={24}
                alt="link"
                className="absolute right-3 top-6 cursor-pointer"
              />
            </>
          ) : (
            <div className="flex items-center rounded-lg bg-[#fafafa] px-3 py-2">
              <div className="flex w-[240px] flex-col">
                <div className="flex items-center justify-between text-xs leading-[18px]">
                  <div className="text-clip">{getDomainName(inputRpc)}</div>
                  <MsDisplay ms={inputRpcLatency} />
                </div>
                <div className="text-[10px] leading-4 text-gray">
                  {isProduction ? "Mainnet" : "Devnet"}
                </div>
              </div>
              <Image
                onClick={() => setShowInput(true)}
                src="/icons/edit.svg"
                width={20}
                height={20}
                alt="edit"
                className="mx-2 cursor-pointer"
              />
              <Checkbox
                checked={inputRpcActive}
                onCheckedChange={() => handleCheckCustomRpc()}
                className="rounded-full"
              />
            </div>
          )}
          {inputRpcError && (
            <div className="pl-2 text-[10px] text-red">
              {ct("txt-UnsupportedRPC")}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NetItem({
  name,
  label,
  rpc,
  checked,
  onCheckedChange,
  chain,
}: {
  name: string;
  label: string;
  rpc: string;
  checked: boolean;
  onCheckedChange: (_v: boolean) => void;
  chain: ChainType;
}) {
  const { data: ms } = useRpcLatency(chain, rpc);

  return (
    <div
      data-active={checked}
      className="flex items-center justify-between rounded-lg px-3 py-2 data-[active=true]:bg-[#fafafa]"
    >
      <div className="flex items-center justify-start">
        <div className="ml-2 flex flex-col text-xs leading-[18px] text-black">
          <div className="flex items-center space-x-1">
            <div>{name}</div>
            <MsDisplay ms={ms} />
          </div>
          <div className="text-[10px] leading-4 text-gray">{label}</div>
        </div>
      </div>

      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(!!v)}
        className="rounded-full"
      />
    </div>
  );
}

function MsDisplay({ ms }: { ms: number | undefined }) {
  const msColor = useMemo(() => {
    if (!ms) return "#3DD866";
    if (ms < 100) return "#3DD866";
    if (ms > 99 && ms < 200) return "#FFA95B";
    if (ms > 200) return "#FF6262";
  }, [ms]);

  if (!ms) return null;

  return (
    <div
      style={{
        color: msColor,
      }}
    >
      {ms}ms
    </div>
  );
}
