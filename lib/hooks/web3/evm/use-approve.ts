import { useEffect, useMemo, useState } from "react";
import { erc20Abi } from "viem";
import { readContract } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useTokens } from "../../api/token/use-tokens";
import { USDTAbi } from "@/lib/abi/eth/USDT";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { ChainConfigs } from "@/lib/const/chain-config";

export function useApprove(
  chain: ChainType,
  tokenAddr: string,
  allowAmount: number = 0,
) {
  const config = useConfig();
  const chainConf = ChainConfigs[chain];
  const isEvm = chainConf.isEvm;
  const spender = chainConf.contracts.tokenManager;

  const CT = useTranslations("Common");

  const { address } = useAccount();
  const { data: tokens } = useTokens();

  const [allowance, setAllowance] = useState<number | null>(null);
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const { data: hash, writeContract } = useWriteContract();

  const { data: txReceipt, error: txError } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  useEffect(() => {
    if (!isEvm) {
      return;
    }

    readAllowance();
  }, [isEvm, address, spender, tokenAddr, allowAmount]);

  useEffect(() => {
    if (txReceipt) {
      setIsApproving(false);
      readAllowance();
    }

    if (txError) {
      setIsApproving(false);
    }
  }, [txReceipt, txError]);

  async function readAllowance() {
    if (!address || !spender || !tokenAddr) return;

    setIsAllowanceLoading(true);

    const res = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddr as any,
      functionName: "allowance",
      args: [address, spender as any],
    });

    setIsAllowanceLoading(false);
    setAllowance(Number(res) / 10 ** 18);
  }

  const isShouldApprove = useMemo(() => {
    if (!isEvm || !tokenAddr) return false;

    const tokenSymbol = tokens?.find((t) => t.address === tokenAddr)?.symbol;
    if (tokenSymbol === "ETH") return false;

    if (allowance == null || isAllowanceLoading) return false;
    if (allowance === 0) return true;
    if (allowance < allowAmount) return true;

    return false;
  }, [allowance, allowAmount, isEvm, isAllowanceLoading, tokenAddr, tokens]);

  const approveBtnText = useMemo(() => {
    if (!isEvm || !tokenAddr) return "";

    const tokenSymbol = tokens?.find((t) => t.address === tokenAddr)?.symbol;

    if (isApproving) {
      return `${CT("btn-Approving")} ${tokenSymbol}...`;
    }

    if (isShouldApprove) {
      return `${CT("btn-Approve")} ${tokenSymbol}`;
    }

    return "";
  }, [tokens, isShouldApprove, isEvm, tokenAddr, CT, isApproving]);

  async function approveAction() {
    if (!isEvm || !tokenAddr) return;

    setIsApproving(true);
    const findToken = tokens?.find((t) => t.address === tokenAddr);
    const isUSDT = findToken?.symbol === "USDT";

    const amountMax =
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    const amount = isUSDT ? (allowAmount == 0 ? amountMax : "0") : amountMax;

    const callParams = {
      abi: isUSDT ? USDTAbi : erc20Abi,
      address: tokenAddr as any,
      functionName: "approve",
      args: [spender, amount],
    };

    writeContract(callParams as any);
  }

  return {
    isShouldApprove,
    isApproving,
    approveAction,
    approveBtnText,
  };
}
