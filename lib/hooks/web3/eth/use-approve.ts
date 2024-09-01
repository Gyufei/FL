import { useEffect, useMemo, useState } from "react";
import { erc20Abi } from "viem";
import { readContract } from "@wagmi/core";
import { useAccount, useConfig } from "wagmi";

import { useCurrentChain } from "../use-current-chain";
import { useTokens } from "../../api/token/use-tokens";
import { USDTAbi } from "@/lib/abi/eth/USDT";
import { useEthConfig } from "../use-eth-config";
import { useTranslations } from "next-intl";

export function useApprove(tokenAddr: string, allowAmount: number = 0) {
  const config = useConfig();
  const { ethConfig } = useEthConfig();
  const spender = ethConfig.contracts.tokenManager;

  const CT = useTranslations("Common");

  const { isEth } = useCurrentChain();
  const { address } = useAccount();
  const { data: tokens } = useTokens();

  const [allowance, setAllowance] = useState<number | null>(null);
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    if (!isEth) {
      return;
    }

    readAllowance();
  }, [isEth, address, spender, tokenAddr, allowAmount]);

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
    if (!isEth) return false;
    if (allowance == null || isAllowanceLoading) return false;

    if (allowance === 0) return true;
    if (allowance < allowAmount) return true;

    return false;
  }, [allowance, allowAmount, isEth, isAllowanceLoading]);

  const approveBtnText = useMemo(() => {
    const tokenSymbol = tokens?.find((t) => t.address === tokenAddr)?.symbol;
    if (!isEth) return "";

    if (isApproving) {
      return `${CT("btn-Approving")} ${tokenSymbol}...`;
    }

    if (isShouldApprove) {
      return `${CT("btn-Approve")} ${tokenSymbol}`;
    }

    return "";
  }, [tokens, isShouldApprove, isApproving, isEth, tokenAddr, CT]);

  async function approveAction() {
    if (!isEth) return;

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

    const result = await readContract(config, callParams as any);

    await readAllowance();

    setIsApproving(true);
    return result;
  }

  return {
    isShouldApprove,
    isApproving,
    approveAction,
    approveBtnText,
  };
}
