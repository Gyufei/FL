export const TadleAbi = {
  "version": "0.1.0",
  "name": "tadle_contracts",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "platformFeeRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createMarketPlace",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketPlaceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateMarketPlace",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenMint",
          "type": "publicKey"
        },
        {
          "name": "tokenPerPoint",
          "type": "u64"
        },
        {
          "name": "tge",
          "type": "i64"
        },
        {
          "name": "settlementPeriod",
          "type": "i64"
        }
      ]
    },
    {
      "name": "updateAuthority",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createOffer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "seedAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolTokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stock",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "points",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "collateralRate",
          "type": "u64"
        },
        {
          "name": "eachTradeTax",
          "type": "u64"
        },
        {
          "name": "offerType",
          "type": {
            "defined": "OfferType"
          }
        },
        {
          "name": "offerSettleType",
          "type": {
            "defined": "OfferSettleType"
          }
        }
      ]
    },
    {
      "name": "createTaker",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "preOfferBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "originMarkerBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seedAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "stock",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "preOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "originOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "points",
          "type": "u64"
        }
      ]
    },
    {
      "name": "list",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "seedAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stock",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "originOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "collateralRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "relist",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stock",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeOffer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stock",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "settleAskMaker",
      "accounts": [
        {
          "name": "manager",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wsolTmpTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "settledPoints",
          "type": "u64"
        }
      ]
    },
    {
      "name": "settleAskTaker",
      "accounts": [
        {
          "name": "manager",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wsolTmpTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "makerBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "makerPointTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stock",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "preOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pointTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "settledPoints",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeBidOffer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolTokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "accountType",
          "type": {
            "defined": "AccountType"
          }
        }
      ]
    },
    {
      "name": "safeTransferToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolTokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateUserConfig",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "platformFeeRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawBaseToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolTokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wsolTmpTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenBalanceType",
          "type": {
            "defined": "TokenBalanceType"
          }
        }
      ]
    },
    {
      "name": "withdrawPointToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPointTokenBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketPlace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Maker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "offerSettleType",
            "type": {
              "defined": "OfferSettleType"
            }
          },
          {
            "name": "marketPlace",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "originOffer",
            "type": "publicKey"
          },
          {
            "name": "platformFee",
            "type": "u64"
          },
          {
            "name": "eachTradeTax",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "MarketPlace",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenPerPoint",
            "type": "u64"
          },
          {
            "name": "tge",
            "type": "i64"
          },
          {
            "name": "settlementPeriod",
            "type": "i64"
          },
          {
            "name": "fixedratio",
            "type": "bool"
          },
          {
            "name": "status",
            "type": {
              "defined": "MarketPlaceStatus"
            }
          }
        ]
      }
    },
    {
      "name": "Offer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "maker",
            "type": "publicKey"
          },
          {
            "name": "points",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "collateralRate",
            "type": "u64"
          },
          {
            "name": "usedPoints",
            "type": "u64"
          },
          {
            "name": "tradeTax",
            "type": "u64"
          },
          {
            "name": "settledPoints",
            "type": "u64"
          },
          {
            "name": "totalSettledPoints",
            "type": "u64"
          },
          {
            "name": "settledPointTokenAmount",
            "type": "u64"
          },
          {
            "name": "offerStatus",
            "type": {
              "defined": "OfferStatus"
            }
          },
          {
            "name": "offerType",
            "type": {
              "defined": "OfferType"
            }
          }
        ]
      }
    },
    {
      "name": "PointTokenBalanceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Stock",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "maker",
            "type": "publicKey"
          },
          {
            "name": "preOffer",
            "type": "publicKey"
          },
          {
            "name": "points",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "stockStatus",
            "type": {
              "defined": "StockStatus"
            }
          },
          {
            "name": "stockType",
            "type": {
              "defined": "StockType"
            }
          },
          {
            "name": "offer",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "SystemConfigData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "poolTokenAuthority",
            "type": "publicKey"
          },
          {
            "name": "platformFeeRate",
            "type": "u64"
          },
          {
            "name": "poolTokenAuthorityBumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "TokenBalanceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "taxIncome",
            "type": "u64"
          },
          {
            "name": "referralBonus",
            "type": "u64"
          },
          {
            "name": "salesRevenue",
            "type": "u64"
          },
          {
            "name": "remainingCash",
            "type": "u64"
          },
          {
            "name": "makerRefund",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserConfigData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "platformFeeRate",
            "type": "u64"
          },
          {
            "name": "initialized",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AccountType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TokenAccount"
          },
          {
            "name": "MakerAccount"
          },
          {
            "name": "OfferAccount"
          },
          {
            "name": "StockAccount"
          },
          {
            "name": "MarketPlaceAccount"
          },
          {
            "name": "SystemConfigAccount"
          },
          {
            "name": "UserConfigAccount"
          },
          {
            "name": "PointTokenBalanceAccount"
          },
          {
            "name": "TokenBalanceAccount"
          }
        ]
      }
    },
    {
      "name": "OfferSettleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Protected"
          },
          {
            "name": "Turbo"
          }
        ]
      }
    },
    {
      "name": "MarketPlaceStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Online"
          },
          {
            "name": "AskSettling"
          },
          {
            "name": "BidSettling"
          },
          {
            "name": "Offline"
          }
        ]
      }
    },
    {
      "name": "OfferStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Virgin"
          },
          {
            "name": "Ongoing"
          },
          {
            "name": "Canceled"
          },
          {
            "name": "Filled"
          },
          {
            "name": "Settling"
          },
          {
            "name": "Settled"
          }
        ]
      }
    },
    {
      "name": "OfferType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Ask"
          },
          {
            "name": "Bid"
          }
        ]
      }
    },
    {
      "name": "StockStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Initialized"
          },
          {
            "name": "Finished"
          }
        ]
      }
    },
    {
      "name": "StockType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Ask"
          },
          {
            "name": "Bid"
          }
        ]
      }
    },
    {
      "name": "TokenBalanceType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TaxIncome"
          },
          {
            "name": "ReferralBonus"
          },
          {
            "name": "SalesRevenue"
          },
          {
            "name": "RemainingCash"
          },
          {
            "name": "MakerRefund"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CloseBidOfferEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "offer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "CloseOfferEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "offer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "CreateOfferEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stock",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "offer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "points",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CreateTakerEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stock",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "preOffer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "points",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tradeTax",
          "type": "u64",
          "index": false
        },
        {
          "name": "platformFee",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "ListEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stock",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "offer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "points",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "RelistEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "offer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "SettleAskMakerEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "offer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "salesRevenue",
          "type": "u64",
          "index": false
        },
        {
          "name": "collateralRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "settledPoints",
          "type": "u64",
          "index": false
        },
        {
          "name": "settledPointTokenAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "SettleAskTakerEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "preOffer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stock",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "salesRevenue",
          "type": "u64",
          "index": false
        },
        {
          "name": "collateralRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "settledPoints",
          "type": "u64",
          "index": false
        },
        {
          "name": "settledPointTokenAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "PointTokenBalanceUpdateEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TokenBalanceUpdateEvent",
      "fields": [
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "taxIncome",
          "type": "u64",
          "index": false
        },
        {
          "name": "referralBonus",
          "type": "u64",
          "index": false
        },
        {
          "name": "salesRevenue",
          "type": "u64",
          "index": false
        },
        {
          "name": "remainingCash",
          "type": "u64",
          "index": false
        },
        {
          "name": "makerRefund",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AuthorityMismatch",
      "msg": "authority mismatch"
    },
    {
      "code": 6001,
      "name": "AlreadyInitialized",
      "msg": "account already initialized"
    },
    {
      "code": 6002,
      "name": "MarketPlaceStatusMismatch",
      "msg": "market_palce status mismatch"
    },
    {
      "code": 6003,
      "name": "InvaildTokenAccount",
      "msg": "invaild token account"
    },
    {
      "code": 6004,
      "name": "TokenMintMismatch",
      "msg": "token mint mismatch"
    },
    {
      "code": 6005,
      "name": "TokenOwnerMismatch",
      "msg": "token owner mismatch"
    },
    {
      "code": 6006,
      "name": "AlreadyListed",
      "msg": "already listed"
    },
    {
      "code": 6007,
      "name": "OfferTypeMismatch",
      "msg": "offer type mismatch"
    },
    {
      "code": 6008,
      "name": "OfferStatusMismatch",
      "msg": "offer status mismatch"
    },
    {
      "code": 6009,
      "name": "StockStatusMismatch",
      "msg": "stock status mismatch"
    },
    {
      "code": 6010,
      "name": "MarketPlaceIsFixedRatio",
      "msg": "market place is fixed ratio"
    },
    {
      "code": 6011,
      "name": "SettleBreachFeeMismatch",
      "msg": "collateral rate mismatch"
    },
    {
      "code": 6012,
      "name": "InvalidSettledPoints",
      "msg": "invalid settled points"
    },
    {
      "code": 6013,
      "name": "OfferMismatch",
      "msg": "offer mismatch"
    },
    {
      "code": 6014,
      "name": "MakerMismatch",
      "msg": "maker account mismatch"
    },
    {
      "code": 6015,
      "name": "WrongRange",
      "msg": "wrong params range"
    },
    {
      "code": 6016,
      "name": "AccountIsNotWritable",
      "msg": "account is not writable"
    },
    {
      "code": 6017,
      "name": "InvaildRemainingAccounts",
      "msg": "invaild remaining accounts"
    },
    {
      "code": 6018,
      "name": "InvaildTokenBalanceAccount",
      "msg": "token balance account mismatch"
    }
  ],
  "metadata": {
    "address": "V2hUyeFz8NwR6QXYxFo3ixJNK5GtFvTGSifsM2RCwEJ"
  }
}