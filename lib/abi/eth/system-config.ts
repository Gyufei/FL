export const SystemConfigABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "basePlatformFeeRate",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "baseReferralRate",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createMarketPlace",
    inputs: [
      { name: "_marketPlaceName", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createReferralCode",
    inputs: [
      { name: "_referralCode", type: "string", internalType: "string" },
      { name: "_referrerRate", type: "uint256", internalType: "uint256" },
      { name: "_authorityRate", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBaseReferralRate",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketPlaceInfo",
    inputs: [
      { name: "_marketPlace", type: "address", internalType: "address" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct MarketPlaceInfo",
        components: [
          { name: "isSpecial", type: "bool", internalType: "bool" },
          {
            name: "status",
            type: "uint8",
            internalType: "enum MarketPlaceStatus",
          },
          {
            name: "projectTokenAddr",
            type: "address",
            internalType: "address",
          },
          { name: "tokenPerPoint", type: "uint256", internalType: "uint256" },
          { name: "tge", type: "uint256", internalType: "uint256" },
          {
            name: "settlementPeriod",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPlatformFeeRate",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getReferralInfo",
    inputs: [{ name: "_referrer", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ReferralInfo",
        components: [
          { name: "referrer", type: "address", internalType: "address" },
          { name: "referrerRate", type: "uint256", internalType: "uint256" },
          { name: "authorityRate", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_basePlatformFeeRate",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_baseReferralRate", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initializeOwnership",
    inputs: [{ name: "_newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "marketPlaceInfoMap",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      { name: "isSpecial", type: "bool", internalType: "bool" },
      { name: "status", type: "uint8", internalType: "enum MarketPlaceStatus" },
      { name: "projectTokenAddr", type: "address", internalType: "address" },
      { name: "tokenPerPoint", type: "uint256", internalType: "uint256" },
      { name: "tge", type: "uint256", internalType: "uint256" },
      { name: "settlementPeriod", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "referralCodeMap",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "referrer", type: "address", internalType: "address" },
      { name: "referrerRate", type: "uint256", internalType: "uint256" },
      { name: "authorityRate", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "referralExtraRateMap",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "referralInfoMap",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      { name: "referrer", type: "address", internalType: "address" },
      { name: "referrerRate", type: "uint256", internalType: "uint256" },
      { name: "authorityRate", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeReferralCode",
    inputs: [{ name: "_referralCode", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rescue",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "token", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPauseStatus",
    inputs: [{ name: "pauseSatus", type: "bool", internalType: "bool" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "tadleFactory",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract ITadleFactory" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateMarket",
    inputs: [
      { name: "_marketPlaceName", type: "string", internalType: "string" },
      { name: "_projectTokenAddr", type: "address", internalType: "address" },
      { name: "_isSpecial", type: "bool", internalType: "bool" },
      { name: "_tokenPerPoint", type: "uint256", internalType: "uint256" },
      { name: "_tge", type: "uint256", internalType: "uint256" },
      { name: "_settlementPeriod", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateMarketPlaceStatus",
    inputs: [
      { name: "_marketPlaceName", type: "string", internalType: "string" },
      {
        name: "_status",
        type: "uint8",
        internalType: "enum MarketPlaceStatus",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateReferralExtraRateMap",
    inputs: [
      { name: "_referrer", type: "address", internalType: "address" },
      { name: "_extraRate", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateReferrerInfo",
    inputs: [{ name: "_referralCode", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateUserPlatformFeeRate",
    inputs: [
      { name: "_accountAddress", type: "address", internalType: "address" },
      { name: "_platformFeeRate", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userPlatformFeeRate",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "CreateMarketPlaceInfo",
    inputs: [
      {
        name: "marketPlaceAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "marketPlaceName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CreateReferralCode",
    inputs: [
      {
        name: "referrer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "code", type: "string", indexed: false, internalType: "string" },
      {
        name: "_referrerRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_authorityRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialize",
    inputs: [
      {
        name: "_basePlatformFeeRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_baseReferralRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RemoveReferralCode",
    inputs: [
      {
        name: "referrer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "code", type: "string", indexed: false, internalType: "string" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Rescue",
    inputs: [
      { name: "to", type: "address", indexed: false, internalType: "address" },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetPauseStatus",
    inputs: [
      { name: "status", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateBasePlatformFeeRate",
    inputs: [
      {
        name: "basePlatformFeeRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateBaseReferralRate",
    inputs: [
      {
        name: "baseReferralRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateMarket",
    inputs: [
      {
        name: "marketPlaceAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "isSpecial", type: "bool", indexed: false, internalType: "bool" },
      {
        name: "marketPlaceName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "tokenPerPoint",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      { name: "tge", type: "uint256", indexed: false, internalType: "uint256" },
      {
        name: "settlementPeriod",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateMarketPlaceStatus",
    inputs: [
      {
        name: "marketPlaceAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "status",
        type: "uint8",
        indexed: false,
        internalType: "enum MarketPlaceStatus",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateReferralExtraRate",
    inputs: [
      {
        name: "referrerAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "referrerRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateReferralExtraRateMap",
    inputs: [
      {
        name: "referrerAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "referrerRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateReferrerExtraRate",
    inputs: [
      {
        name: "authorityAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "authorityRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateReferrerInfo",
    inputs: [
      {
        name: "authorityAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "referrerAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "referrerRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "authorityRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateUserPlatformFeeRate",
    inputs: [
      {
        name: "userAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "userPlatformFeeRate",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "AlreadyInitialized", inputs: [] },
  {
    type: "error",
    name: "InvalidPlatformFeeRate",
    inputs: [
      { name: "platformFeeRate", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "InvalidRate",
    inputs: [
      { name: "referrerRate", type: "uint256", internalType: "uint256" },
      { name: "authorityRate", type: "uint256", internalType: "uint256" },
      { name: "totalRate", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "InvalidReferrer",
    inputs: [{ name: "referrer", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "InvalidReferrerRate",
    inputs: [
      { name: "referrerRate", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "InvalidTotalRate",
    inputs: [{ name: "totalRate", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "MarketPlaceAlreadyInitialized", inputs: [] },
  {
    type: "error",
    name: "MarketPlaceNotOnline",
    inputs: [
      { name: "status", type: "uint8", internalType: "enum MarketPlaceStatus" },
    ],
  },
  {
    type: "error",
    name: "ReferralCodeExist",
    inputs: [{ name: "", type: "string", internalType: "string" }],
  },
  { type: "error", name: "TransferFailed", inputs: [] },
  { type: "error", name: "Unauthorized", inputs: [] },
  { type: "error", name: "ZeroAddress", inputs: [] },
] as const;
