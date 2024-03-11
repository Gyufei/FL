export function WithHost(path: string) {
  return `https://api.depe.app${path}`;
  //return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function WithCDN(path: string) {
  return `https://cdn.depe.app${path}`;
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
}

export const EndPointPathMap = {
  solanaApi: WithHost("/sepolia"),
  solanaToken: WithCDN("/tokens/sepolia/tokenlist.json"),
};
