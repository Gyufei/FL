export function WithHost(path: string) {
  return `https://tadle.aggregation.top${path}`;
  //return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function WithCDN(path: string) {
  return `https://cdn.depe.app${path}`;
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
}

export const EndPointPathMap = {
  solanaApi: WithHost(""),
  solanaToken: WithCDN("/tokens/solana/tokenlist.json"),
};

export const Paths = {
  signIn: "/user/sign_in",
  order: "/market_place/order",
  makerDetail: "/market_place/maker_detail",
  marketPlace: "/market_place",
};
