import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import HoverIcon from "../../../components/share/hover-icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useRpcLatency } from "@/lib/hooks/web3/use-rpc-latency";
import { CustomRpcsAtom, GlobalRpcsAtom, RPCS } from "@/lib/states/cluster";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useClusterConfig } from "@/lib/hooks/web3/use-cluster-config";
import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { Connection } from "@solana/web3.js";

export default function FooterSetting() {
  const { setClusterType, clusterConfig } = useClusterConfig();
  const [globalRpc, setGlobalRpc] = useAtom(GlobalRpcsAtom);
  const [customRpc, setCustomRpc] = useAtom(CustomRpcsAtom);

  const [popOpen, setPopOpen] = useState(false);

  const [checkedRpc, setCheckedRpc] = useState<string | null>(null);

  const [inputRpc, setInputRpc] = useState("");
  const [inputRpcActive, setInputRpcActive] = useState(false);
  const [inputRpcError, setInputRpcError] = useState(false);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (customRpc[clusterConfig.network]) {
      setInputRpc(customRpc[clusterConfig.network]!);
      setInputRpcActive(true);
      setCheckedRpc(null);
      setShowInput(false);
    } else {
      setCheckedRpc(globalRpc[clusterConfig.network]);
    }
  }, [globalRpc, customRpc, clusterConfig]);

  function handleCheck(rpc: string, network: WalletAdapterNetwork) {
    if (checkedRpc === rpc) {
      return;
    }

    setCheckedRpc(rpc);
    setGlobalRpc((prev) => {
      return {
        ...prev,
        [network]: rpc,
      };
    });
    setCustomRpc((prev) => {
      return {
        ...prev,
        [network]: null,
      };
    });
    setInputRpc("");
    setInputRpcActive(false);
    setInputRpcError(false);
    setShowInput(true);

    if (network !== clusterConfig.network) {
      setClusterType(network);
    }
  }

  async function handleLinkCustomRpc() {
    if (!inputRpc) {
      return;
    }

    try {
      const latency = await testRpcLatency(inputRpc);

      setCustomRpc((prev) => {
        return {
          ...prev,
          [clusterConfig.network]: inputRpc,
        };
      });

      setCheckedRpc(null);
      setInputRpcActive(true);

      return latency;
    } catch (e) {
      setInputRpcError(true);
    }
  }

  async function testRpcLatency(testRpc: string) {
    const connection = new Connection(testRpc);

    const startTimestamp = Date.now();
    await connection.getEpochInfo();
    const endTimestamp = Date.now();

    const latency = endTimestamp - startTimestamp;

    return latency;
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
            Setting
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
          <div className="text-sm leading-5 text-black">Networks</div>
          <NetItem
            name="SolanaFM's RPC"
            label="Mainnet"
            rpc={RPCS.solanaFm}
            checked={checkedRpc === RPCS.solanaFm}
            onCheckedChange={() =>
              handleCheck(RPCS.solanaFm, WalletAdapterNetwork.Mainnet)
            }
          />
          <NetItem
            name="SolanaFM's Devnet RPC"
            label="Devnet"
            rpc={RPCS.solanaFmDevnet}
            checked={checkedRpc === RPCS.solanaFmDevnet}
            onCheckedChange={() =>
              handleCheck(RPCS.solanaFmDevnet, WalletAdapterNetwork.Devnet)
            }
          />
          <NetItem
            name="Solana"
            label="Devnet"
            rpc={RPCS.solanaDevnet}
            checked={checkedRpc === RPCS.solanaDevnet}
            onCheckedChange={() =>
              handleCheck(RPCS.solanaDevnet, WalletAdapterNetwork.Devnet)
            }
          />
          <NetItem
            name="Solana"
            label="Testnet"
            rpc={RPCS.solanaTestnet}
            checked={checkedRpc === RPCS.solanaTestnet}
            onCheckedChange={() =>
              handleCheck(RPCS.solanaTestnet, WalletAdapterNetwork.Testnet)
            }
          />
        </div>

        <div className="relative mt-4 border-t border-dashed border-[#eee] pt-4">
          {showInput ? (
            <>
              <Input
                data-error={inputRpcError}
                placeholder="Input your custom RPC URL here..."
                value={inputRpc}
                onChange={(e) => setInputRpc(e.target.value)}
                className="h-10 rounded-lg border-none bg-[#fafafa] pl-3 data-[error]:border-red"
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
            <div className="flex items-center">
              <div className="w-[240px] break-all">{inputRpc}</div>
              <div
                className="flex cursor-pointer items-center space-x-1"
                onClick={() => setShowInput(true)}
              >
                <Image
                  src="/icons/edit.svg"
                  width={20}
                  height={20}
                  alt="edit"
                />
                <div className="text-sm leading-5 text-gray">Edit</div>
              </div>
            </div>
          )}
          {inputRpcError && (
            <div className="pl-2 text-[10px] text-red">
              Unsupported RPC Endpoint for Solana Mainnet/Testnet
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
}: {
  name: string;
  label: string;
  rpc: string;
  checked: boolean;
  onCheckedChange: (_v: boolean) => void;
}) {
  const { data: ms } = useRpcLatency(rpc);

  const msColor = useMemo(() => {
    if (!ms) return "#3DD866";
    if (ms < 100) return "#3DD866";
    if (ms > 99 && ms < 200) return "#FFA95B";
    if (ms > 200) return "#FF6262";
  }, [ms]);

  return (
    <div
      data-active={checked}
      className="flex items-center justify-between rounded-lg px-3 py-2 data-[active=true]:bg-[#fafafa]"
    >
      <div className="flex items-center justify-start">
        <Image
          src="/img/token-placeholder.png"
          width={32}
          height={32}
          className="rounded-full"
          alt="net"
        />
        <div className="ml-2 flex flex-col text-xs leading-[18px] text-black">
          <div className="flex items-center space-x-1">
            <div>{name}</div>
            {ms && (
              <div
                style={{
                  color: msColor,
                }}
              >
                {ms}ms
              </div>
            )}
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
