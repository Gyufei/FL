import { useEthConfig } from "../../web3/use-eth-config";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { DeliveryPlaceABI } from "@/lib/abi/eth/DeliveryPlace";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";

export function useCloseBidOfferEth({
  marketplaceStr,
  makerStr,
  offerStr,
}: {
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
}) {
  const { ethConfig } = useEthConfig();
  const { getGasParams } = useGasEth();

  const { address } = useChainWallet();

  const { writeContractAsync } = useWriteContract();

  const txAction = useCallback(async () => {
    const abiAddress = ethConfig.contracts.deliveryPlace;

    const callParams = {
      abi: DeliveryPlaceABI,
      address: abiAddress as any,
      functionName: "closeBidOffer",
      args: [marketplaceStr, makerStr, offerStr, address],
    };

    const gasParams = await getGasParams(callParams);

    return writeContractAsync({
      ...callParams,
      ...gasParams,
    });
  }, [
    writeContractAsync,
    ethConfig,
    marketplaceStr,
    makerStr,
    offerStr,
    address,
    getGasParams,
  ]);

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
