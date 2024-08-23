import {
  encodeAbiParameters,
  encodePacked,
  getAddress,
  keccak256,
  parseAbiParameters,
} from "viem";

export function truncateAddr(
  address: string,
  params = {
    nPrefix: 3,
    nSuffix: 3,
  },
): string {
  if (!address) return address;

  const { nPrefix, nSuffix } = params;

  const shorter = `${address.slice(0, nPrefix)}...${address.slice(
    -1 * nSuffix,
  )}`;

  return shorter;
}

export function generateEthAddress(_id: string, seed: string) {
  const idBytes = encodeAbiParameters(parseAbiParameters("uint256"), [
    BigInt(_id),
  ]);
  const hash = keccak256(encodePacked(["string", "bytes"], [seed, idBytes]));
  const address = getAddress("0x" + hash.slice(-40));

  return address;
}
