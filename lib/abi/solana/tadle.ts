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
      name: "createMarketplace",
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
          name: "marketplace",
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
          name: "marketplaceName",
          type: "string",
        },
      ],
    },
    {
      name: "updateMarketplace",
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
          name: "marketplace",
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
        {
          name: "isSpecial",
          type: "bool",
        },
      ],
    },
    {
      name: "updateMarketplaceStatus",
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
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "marketplaceStatus",
          type: {
            defined: "MarketPlaceStatus",
          },
        },
      ],
    },
    {
      name: "updateAuthority",
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
      ],
      args: [
        {
          name: "newAuthority",
          type: "publicKey",
        },
      ],
    },
    {
      name: "updateReferralExtraRate",
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
          name: "referralExtraRateConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
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
          name: "extraRate",
          type: "u64",
        },
      ],
    },
    {
      name: "updateReferralBaseRate",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "referralBaseRateConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
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
          name: "baseReferralRate",
          type: "u64",
        },
      ],
    },
    {
      name: "updateReferralConfig",
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
          name: "referralCodeData",
          isMut: false,
          isSigner: false,
        },
        {
          name: "referralConfig",
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
          name: "referrer",
          type: "publicKey",
        },
        {
          name: "referralCodeName",
          type: "string",
        },
      ],
    },
    {
      name: "createReferralCode",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "referralBaseRateConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "referralExtraRateConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "referralCodeData",
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
          name: "referralCodeName",
          type: "string",
        },
        {
          name: "referrerRate",
          type: "u64",
        },
        {
          name: "refereeRate",
          type: "u64",
        },
      ],
    },
    {
      name: "removeReferralCode",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "referralCodeData",
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
          name: "referralCodeName",
          type: "string",
        },
      ],
    },
    {
      name: "createOffer",
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
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "holding",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "collateralTokenMint",
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
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "projectPoints",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "collateralRate",
          type: "u64",
        },
        {
          name: "eachTradeTax",
          type: "u64",
        },
        {
          name: "offerType",
          type: {
            defined: "OfferType",
          },
        },
        {
          name: "offerSettleType",
          type: {
            defined: "OfferSettleType",
          },
        },
      ],
    },
    {
      name: "createHolding",
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
          name: "preOfferCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "originMakerCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "seedAccount",
          isMut: false,
          isSigner: true,
        },
        {
          name: "holding",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralTokenMint",
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
          name: "projectPoints",
          type: "u64",
        },
      ],
    },
    {
      name: "list",
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
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "holding",
          isMut: true,
          isSigner: false,
        },
        {
          name: "offer",
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
          name: "collateralTokenMint",
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
          name: "collateralRate",
          type: "u64",
        },
      ],
    },
    {
      name: "relist",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "holding",
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
          name: "collateralTokenMint",
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
      name: "closeOffer",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "holding",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketplace",
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
      name: "abortAskOffer",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "holding",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralTokenMint",
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
      name: "abortBidHolding",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "holding",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
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
      name: "settleAskMaker",
      accounts: [
        {
          name: "manager",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
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
          name: "projectTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userCollateralTokenBalance",
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
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "projectTokenMint",
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
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "settledProjectPoints",
          type: "u64",
        },
      ],
    },
    {
      name: "settleAskHolding",
      accounts: [
        {
          name: "manager",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
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
          name: "projectTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "makerCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "makerProjectTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "holding",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "projectTokenMint",
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
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "settledProjectPoints",
          type: "u64",
        },
      ],
    },
    {
      name: "closeBidOffer",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userCollateralTokenBalance",
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
          name: "marketplace",
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
      name: "closeBidHolding",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userProjectTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "holding",
          isMut: true,
          isSigner: false,
        },
        {
          name: "maker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketplace",
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
      name: "closeAccount",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemConfig",
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
      name: "safeTransferToken",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
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
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userAddress",
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
    {
      name: "withdrawCollateralToken",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
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
          name: "userCollateralTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralTokenMint",
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
          name: "tokenBalanceType",
          type: {
            defined: "TokenBalanceType",
          },
        },
      ],
    },
    {
      name: "withdrawProjectToken",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userProjectTokenBalance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "marketplace",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "projectTokenMint",
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
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updatePlatformFeeRate",
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
      ],
      args: [
        {
          name: "newPlatformFeeRate",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawPlatformFee",
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
          name: "platformFeeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "wsolTmpTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "platformFeeTokenMint",
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
      name: "rollin",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "rollinState",
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
  ],
  accounts: [
    {
      name: "Stock",
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
            name: "preOffer",
            type: "publicKey",
          },
          {
            name: "projectPoints",
            type: "u64",
          },
          {
            name: "quoteTokenAmount",
            type: "u64",
          },
          {
            name: "holdingStatus",
            type: {
              defined: "StockStatus",
            },
          },
          {
            name: "holdingType",
            type: {
              defined: "StockType",
            },
          },
          {
            name: "offer",
            type: {
              option: "publicKey",
            },
          },
        ],
      },
    },
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
            name: "offerSettleType",
            type: {
              defined: "OfferSettleType",
            },
          },
          {
            name: "marketplace",
            type: "publicKey",
          },
          {
            name: "collateralTokenMint",
            type: "publicKey",
          },
          {
            name: "originOffer",
            type: "publicKey",
          },
          {
            name: "platformFee",
            type: "u64",
          },
          {
            name: "eachTradeTax",
            type: "u64",
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
            name: "projectTokenMint",
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
            name: "isSpecial",
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
      name: "Offer",
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
            name: "projectPoints",
            type: "u64",
          },
          {
            name: "quoteTokenAmount",
            type: "u64",
          },
          {
            name: "collateralRate",
            type: "u64",
          },
          {
            name: "usedProjectPoints",
            type: "u64",
          },
          {
            name: "tradeTax",
            type: "u64",
          },
          {
            name: "settledProjectPoints",
            type: "u64",
          },
          {
            name: "settledCollateralAmount",
            type: "u64",
          },
          {
            name: "settledProjectTokenAmount",
            type: "u64",
          },
          {
            name: "offerStatus",
            type: {
              defined: "OfferStatus",
            },
          },
          {
            name: "offerType",
            type: {
              defined: "OfferType",
            },
          },
          {
            name: "abortOfferStatus",
            type: {
              defined: "AbortOfferStatus",
            },
          },
        ],
      },
    },
    {
      name: "PlatformFeeData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "platformFeeTokenAmount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PointTokenBalanceData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "projectTokenAmount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "BaseReferralRateData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "baseReferralRate",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ReferralCodeData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "referrerRate",
            type: "u64",
          },
          {
            name: "refereeRate",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ReferralConfigData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "referrer",
            type: "publicKey",
          },
          {
            name: "referrerRate",
            type: "u64",
          },
          {
            name: "refereeRate",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ReferralExtraRateData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "extraRate",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "RollinStateData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "rollinAt",
            type: "i64",
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
      name: "TokenBalanceData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "taxIncome",
            type: "u64",
          },
          {
            name: "referralBonus",
            type: "u64",
          },
          {
            name: "salesRevenue",
            type: "u64",
          },
          {
            name: "remainingCash",
            type: "u64",
          },
          {
            name: "makerRefund",
            type: "u64",
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
            name: "OtherAccount",
          },
        ],
      },
    },
    {
      name: "StockStatus",
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
        ],
      },
    },
    {
      name: "StockType",
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
    {
      name: "OfferSettleType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Protected",
          },
          {
            name: "Turbo",
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
      name: "OfferStatus",
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
      name: "OfferType",
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
    {
      name: "AbortOfferStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "InitializeV1",
          },
          {
            name: "InitializeV2",
          },
          {
            name: "AllocationPropagated",
          },
          {
            name: "Aborted",
          },
        ],
      },
    },
    {
      name: "TokenBalanceType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "TaxIncome",
          },
          {
            name: "ReferralBonus",
          },
          {
            name: "SalesRevenue",
          },
          {
            name: "RemainingCash",
          },
          {
            name: "MakerRefund",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "AbortAskOfferEvent",
      fields: [
        {
          name: "offer",
          type: "publicKey",
          index: false,
        },
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "AbortBidHoldingEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "holding",
          type: "publicKey",
          index: false,
        },
        {
          name: "offer",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "CloseBidHoldingEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "preOffer",
          type: "publicKey",
          index: false,
        },
        {
          name: "holding",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "CloseBidOfferEvent",
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
          name: "offer",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "CloseOfferEvent",
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
          name: "offer",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "CreateHoldingEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "holding",
          type: "publicKey",
          index: false,
        },
        {
          name: "preOffer",
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
          name: "projectPoints",
          type: "u64",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
        {
          name: "tradeTax",
          type: "u64",
          index: false,
        },
        {
          name: "platformFee",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "ReferralBonusEvent",
      fields: [
        {
          name: "maker",
          type: "publicKey",
          index: false,
        },
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "referrer",
          type: "publicKey",
          index: false,
        },
        {
          name: "authorityReferralBonus",
          type: "u64",
          index: false,
        },
        {
          name: "referrerReferralBonus",
          type: "u64",
          index: false,
        },
        {
          name: "tradingFee",
          type: "u64",
          index: false,
        },
        {
          name: "tradingVol",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CreateOfferEvent",
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
          name: "holding",
          type: "publicKey",
          index: false,
        },
        {
          name: "offer",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "projectPoints",
          type: "u64",
          index: false,
        },
        {
          name: "quoteTokenAmount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CreateReferralCodeEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "referralCodeName",
          type: "string",
          index: false,
        },
        {
          name: "referrerRate",
          type: "u64",
          index: false,
        },
        {
          name: "refereeRate",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "ListEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "holding",
          type: "publicKey",
          index: false,
        },
        {
          name: "offer",
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
          name: "projectPoints",
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
      name: "RelistEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "offer",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "RemoveReferralCodeEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "referralCodeName",
          type: "string",
          index: false,
        },
      ],
    },
    {
      name: "RollinEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "rollinAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "SettleAskHoldingEvent",
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
          name: "preOffer",
          type: "publicKey",
          index: false,
        },
        {
          name: "holding",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "salesRevenue",
          type: "u64",
          index: false,
        },
        {
          name: "usedCollateralAmount",
          type: "u64",
          index: false,
        },
        {
          name: "settledProjectPoints",
          type: "u64",
          index: false,
        },
        {
          name: "settledProjectTokenAmount",
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
          name: "offer",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "salesRevenue",
          type: "u64",
          index: false,
        },
        {
          name: "settledCollateralAmount",
          type: "u64",
          index: false,
        },
        {
          name: "settledProjectPoints",
          type: "u64",
          index: false,
        },
        {
          name: "settledProjectTokenAmount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "UpdateReferralEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "referrer",
          type: "publicKey",
          index: false,
        },
        {
          name: "referrerRate",
          type: "u64",
          index: false,
        },
        {
          name: "refereeRate",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "PlatformFeeUpdateEvent",
      fields: [
        {
          name: "platformFeeTokenMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "platformFeeTokenAmount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "PointTokenBalanceUpdateEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "marketId",
          type: "publicKey",
          index: false,
        },
        {
          name: "projectTokenMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "projectTokenAmount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "TokenBalanceUpdateEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "tokenMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "taxIncome",
          type: "u64",
          index: false,
        },
        {
          name: "referralBonus",
          type: "u64",
          index: false,
        },
        {
          name: "salesRevenue",
          type: "u64",
          index: false,
        },
        {
          name: "remainingCash",
          type: "u64",
          index: false,
        },
        {
          name: "makerRefund",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "AuthorityMismatch",
      msg: "authority mismatch",
    },
    {
      code: 6001,
      name: "AlreadyInitialized",
      msg: "account already initialized",
    },
    {
      code: 6002,
      name: "MarketPlaceStatusMismatch",
      msg: "marketplace status mismatch",
    },
    {
      code: 6003,
      name: "InvalidTokenAccount",
      msg: "Invalid token account",
    },
    {
      code: 6004,
      name: "TokenMintMismatch",
      msg: "token mint mismatch",
    },
    {
      code: 6005,
      name: "TokenOwnerMismatch",
      msg: "token owner mismatch",
    },
    {
      code: 6006,
      name: "AlreadyListed",
      msg: "already listed",
    },
    {
      code: 6007,
      name: "SettleBreachFeeMismatch",
      msg: "collateral rate mismatch",
    },
    {
      code: 6008,
      name: "InvalidSettledPoints",
      msg: "Invalid settled project_points",
    },
    {
      code: 6009,
      name: "WrongRange",
      msg: "wrong params range",
    },
    {
      code: 6010,
      name: "AccountIsNotWritable",
      msg: "account is not writable",
    },
    {
      code: 6011,
      name: "InvalidRemainingAccounts",
      msg: "Invalid remaining accounts",
    },
    {
      code: 6012,
      name: "InvalidTokenBalanceAccount",
      msg: "token balance account mismatch",
    },
    {
      code: 6013,
      name: "InvalidReferralRate",
      msg: "Invalid referral rate",
    },
    {
      code: 6014,
      name: "InvalidPoints",
      msg: "Invalid project_points",
    },
    {
      code: 6015,
      name: "InvalidAmount",
      msg: "Invalid amount",
    },
    {
      code: 6016,
      name: "ReferrerMismatch",
      msg: "referrer mismatch",
    },
    {
      code: 6017,
      name: "ReferralConfigMismatch",
      msg: "referral config mismatch",
    },
    {
      code: 6018,
      name: "AlreadyAborted",
      msg: "already aborted",
    },
    {
      code: 6019,
      name: "OfferMismatch",
      msg: "offer mismatch",
    },
    {
      code: 6020,
      name: "OfferAuthorityMismatch",
      msg: "offer authority mismatch",
    },
    {
      code: 6021,
      name: "OfferTypeMismatch",
      msg: "offer type mismatch",
    },
    {
      code: 6022,
      name: "OfferStatusMismatch",
      msg: "offer status mismatch",
    },
    {
      code: 6023,
      name: "AbortOfferStatusMismatch",
      msg: "abort offer status mismatch",
    },
    {
      code: 6024,
      name: "MakerMismatch",
      msg: "maker account mismatch",
    },
    {
      code: 6025,
      name: "MarketplaceIsFixedRatio",
      msg: "market place is fixed ratio",
    },
    {
      code: 6026,
      name: "HoldingAuthorityMismatch",
      msg: "holding authority mismatch",
    },
    {
      code: 6027,
      name: "HoldingStatusMismatch",
      msg: "holding status mismatch",
    },
    {
      code: 6028,
      name: "HoldingTypeMismatch",
      msg: "holding type mismatch",
    },
    {
      code: 6029,
      name: "HoldingPreOfferMismatch",
      msg: "holding pre offer mismatch",
    },
  ],
  metadata: {
    address: "TADLEyeCY4UfTtMgGJqHi74w4Zs8KqpjyLceqQCfGRj",
  },
};
