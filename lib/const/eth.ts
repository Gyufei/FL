export const EthRPCS = {
  TadleRPC1:
    process.env.NEXT_PUBLIC_DEFAULT_RPC_ETH || "https://rpc.ankr.com/solana",
  TadleDevRPC1: "https://devnet-rpc.aggregation.top/",
};

export const EthTestConfig = {
  id: 1337,
  contracts: {
    usdcToken: "0xc464e5f632827F5C886f849Ca9D4C59Ba7e094F2",
    ethToken: "0xc374F907b7218eCCD775077998c646E737150a93",
    preMarkets: "0x350a46b98259730aDb72dbC1Af3D892A43F60953",
    tokenManager: "0xb32C57B4718D744e7DB5440395302a9bAF871A40",
    systemConfig: "0xd4e1c4aFfB64957076304FF140d1ad4F07250fBb",
    deliveryPlace: "0xFbbB0159dc92273503f93A59fE1140f66A021510",
  },
};

export const EthConfig = {
  id: 1,
  contracts: {
    usdcToken: "0xc464e5f632827F5C886f849Ca9D4C59Ba7e094F2",
    ethToken: "0xc374F907b7218eCCD775077998c646E737150a93",
    preMarkets: "0xa853BE4931401059Dce7146b28aC4A190f108354",
    tokenManager: "0xa921e0BA08ceA8850D82D5e8240f626777FC1dB9",
    systemConfig: "0xa026b4E35AAE30f7CC5F0a205D49b8A38d1B65Aa",
    deliveryPlace: "0x384124A2588a8a446873a34c0FdFfE7f30FfE70F",
  },
};
