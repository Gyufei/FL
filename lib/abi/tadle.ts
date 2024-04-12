export const TadleAbi = {
  version: "0.1.0",
  name: "tadle_contracts",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "platformFeeRate",
          type: "u64",
        },
      ],
    },
    {
      name: "createMarketPlace",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "seedAccount",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateMarketPlace",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenMint",
          type: "publicKey",
        },
        {
          name: "tokenPerPoint",
          type: "u64",
        },
        {
          name: "tge",
          type: "i64",
        },
        {
          name: "settlementPeriod",
          type: "i64",
        },
      ],
    },
    {
      name: "createMaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "seedAccount",
          isMut: false,
          isSigner: true,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "points",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "settleBreachFee",
          type: "u64",
        },
        {
          name: "eachTradeTax",
          type: "u64",
        },
        {
          name: "isNativeToken",
          type: "bool",
        },
        {
          name: "orderType",
          type: {
            defined: "OrderType",
          },
        },
      ],
    },
    {
      name: "createTaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "seedAccount",
          isMut: false,
          isSigner: true,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "preOrder",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "points",
          type: "u64",
        },
      ],
    },
    {
      name: "relistMaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "settleBreachFee",
          type: "u64",
        },
      ],
    },
    {
      name: "unlistMaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "wsolTmpTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "closeOriginMaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "wsolTmpTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "settleAskMaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "wsolTmpTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pointTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pointTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "settledPoints",
          type: "u64",
        },
      ],
    },
    {
      name: "settleAskTaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "preOrder",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "wsolTmpTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pointTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pointTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "settledPoints",
          type: "u64",
        },
      ],
    },
    {
      name: "settleBidMaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "wsolTmpTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pointTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pointTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "settleBidTaker",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "order",
          isMut: true,
          isSigner: false,
        },
        {
          name: "preOrder",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketPlace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPointTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "wsolTmpTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pointTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pointTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "closeAccount",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "accountType",
          type: {
            defined: "AccountType",
          },
        },
      ],
    },
    {
      name: "transferTokenAccounts",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram2022",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "updateUserConfig",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "platformFeeRate",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Maker",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "marketPlace",
            type: "publicKey",
          },
          {
            name: "tokenMint",
            type: "publicKey",
          },
          {
            name: "tradeTax",
            type: "u64",
          },
          {
            name: "platformFee",
            type: "u64",
          },
          {
            name: "eachTradeTax",
            type: "u64",
          },
          {
            name: "isNativeToken",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "MarketPlace",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokenMint",
            type: "publicKey",
          },
          {
            name: "tokenPerPoint",
            type: "u64",
          },
          {
            name: "tge",
            type: "i64",
          },
          {
            name: "settlementPeriod",
            type: "i64",
          },
          {
            name: "fixedratio",
            type: "bool",
          },
          {
            name: "status",
            type: {
              defined: "MarketPlaceStatus",
            },
          },
        ],
      },
    },
    {
      name: "Order",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "maker",
            type: "publicKey",
          },
          {
            name: "preOrder",
            type: "publicKey",
          },
          {
            name: "points",
            type: "u64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "usedPoints",
            type: "u64",
          },
          {
            name: "settledPoints",
            type: "u64",
          },
          {
            name: "settleBreachFee",
            type: "u64",
          },
          {
            name: "settleFlag",
            type: "bool",
          },
          {
            name: "makerStatus",
            type: {
              defined: "MakerStatus",
            },
          },
          {
            name: "takerStatus",
            type: {
              defined: "TakerStatus",
            },
          },
          {
            name: "orderType",
            type: {
              defined: "OrderType",
            },
          },
        ],
      },
    },
    {
      name: "SystemConfigData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "poolTokenAuthority",
            type: "publicKey",
          },
          {
            name: "platformFeeRate",
            type: "u64",
          },
          {
            name: "poolTokenAuthorityBumpSeed",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "UserConfigData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "platformFeeRate",
            type: "u64",
          },
          {
            name: "initialized",
            type: "bool",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "AccountType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "TokenAccount",
          },
          {
            name: "MakerAccount",
          },
          {
            name: "OrderAccount",
          },
          {
            name: "MarketPlaceAccount",
          },
          {
            name: "SystemConfigAccount",
          },
          {
            name: "UserConfigAccount",
          },
        ],
      },
    },
    {
      name: "MarketPlaceStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Online",
          },
          {
            name: "AskSettling",
          },
          {
            name: "BidSettling",
          },
          {
            name: "Offline",
          },
        ],
      },
    },
    {
      name: "MakerStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Unknown",
          },
          {
            name: "Virgin",
          },
          {
            name: "Ongoing",
          },
          {
            name: "Canceled",
          },
          {
            name: "Filled",
          },
          {
            name: "Settling",
          },
          {
            name: "Settled",
          },
        ],
      },
    },
    {
      name: "TakerStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Unknown",
          },
          {
            name: "Initialized",
          },
          {
            name: "Finished",
          },
          {
            name: "Settled",
          },
        ],
      },
    },
    {
      name: "OrderType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Ask",
          },
          {
            name: "Bid",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "CloseOriginMakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "points",
          type: "u64",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CreateMakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "points",
          type: "u64",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CreateTakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "preOrder",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "points",
          type: "u64",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "RelistMakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "points",
          type: "u64",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "SettleAskMakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "settledTokenAmount",
          type: "u64",
          index: false,
        },
        {
          name: "depositAmount",
          type: "u64",
          index: false,
        },
        {
          name: "receiveAmount",
          type: "u64",
          index: false,
        },
        {
          name: "settledPoints",
          type: "u64",
          index: false,
        },
        {
          name: "tradeTax",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "SettleAskTakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "preOrder",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "settledTokenAmount",
          type: "u64",
          index: false,
        },
        {
          name: "depositAmount",
          type: "u64",
          index: false,
        },
        {
          name: "receiveAmount",
          type: "u64",
          index: false,
        },
        {
          name: "settledPoints",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "SettleBidMakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "settledTokenAmount",
          type: "u64",
          index: false,
        },
        {
          name: "depositAmount",
          type: "u64",
          index: false,
        },
        {
          name: "receiveAmount",
          type: "u64",
          index: false,
        },
        {
          name: "settledPoints",
          type: "u64",
          index: false,
        },
        {
          name: "tradeTax",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "SettleBidTakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "preOrder",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "settledTokenAmount",
          type: "u64",
          index: false,
        },
        {
          name: "depositAmount",
          type: "u64",
          index: false,
        },
        {
          name: "receiveAmount",
          type: "u64",
          index: false,
        },
        {
          name: "settledPoints",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "UnlistMakerEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "order",
          type: "publicKey",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidMangerAccount",
      msg: "invaild system manager account",
    },
    {
      code: 6001,
      name: "InvaildAuthorityAccount",
      msg: "invaild user authority account",
    },
    {
      code: 6002,
      name: "AlreadyInitialized",
      msg: "account already initialized",
    },
    {
      code: 6003,
      name: "InvaildTokenAccount",
      msg: "invaild token account",
    },
    {
      code: 6004,
      name: "MarketPlaceStatusMismatch",
      msg: "market_palce status mismatch",
    },
    {
      code: 6005,
      name: "MarketPlaceTypeMismatch",
      msg: "market_palce type mismatch",
    },
    {
      code: 6006,
      name: "OrderStatusMismatch",
      msg: "order status mismatch",
    },
    {
      code: 6007,
      name: "OrderTypeMismatch",
      msg: "order type mismatch",
    },
    {
      code: 6008,
      name: "InvaildOrder",
      msg: "order mismatch",
    },
    {
      code: 6009,
      name: "WrongMathOperation",
      msg: "wrong math operation",
    },
  ],
};
