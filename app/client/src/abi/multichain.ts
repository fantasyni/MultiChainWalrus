export const abi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "pyth_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "wormhole_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "chainId_",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "wormholeFinality_",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "ethPriceId_",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "walPriceId_",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "ETH_DECIMALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "PRICE_VALID_DURATION",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "WAL_DECIMALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "calculatePaymentETH",
        "inputs": [
            {
                "name": "walAmount",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [
            {
                "name": "ethAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "chainId",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "convertToUint",
        "inputs": [
            {
                "name": "price",
                "type": "int64",
                "internalType": "int64"
            },
            {
                "name": "expo",
                "type": "int32",
                "internalType": "int32"
            },
            {
                "name": "targetDecimals",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "decodeMessage",
        "inputs": [
            {
                "name": "encodedMessage",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "parsedMessage",
                "type": "tuple",
                "internalType": "struct MultichainWalrusStructs.MultichainWalrusMessage",
                "components": [
                    {
                        "name": "payloadID",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "message",
                        "type": "bytes",
                        "internalType": "bytes"
                    }
                ]
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "encodeMessage",
        "inputs": [
            {
                "name": "parsedMessage",
                "type": "tuple",
                "internalType": "struct MultichainWalrusStructs.MultichainWalrusMessage",
                "components": [
                    {
                        "name": "payloadID",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "message",
                        "type": "bytes",
                        "internalType": "bytes"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "encodedMessage",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "ethPriceId",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getReceivedMessage",
        "inputs": [
            {
                "name": "hash",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRegisteredEmitter",
        "inputs": [
            {
                "name": "emitterChainId",
                "type": "uint16",
                "internalType": "uint16"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isMessageConsumed",
        "inputs": [
            {
                "name": "hash",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "receiveMessage",
        "inputs": [
            {
                "name": "encodedMessage",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "registerEmitter",
        "inputs": [
            {
                "name": "emitterChainId",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "emitterAddress",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "sendUploadWalrus",
        "inputs": [
            {
                "name": "walAmount",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "message",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "messageSequence",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "updatePyth",
        "inputs": [
            {
                "name": "pythUpdateData",
                "type": "bytes[]",
                "internalType": "bytes[]"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "walPriceId",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "withdrawETH",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "wormhole",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IWormhole"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "wormholeFinality",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "DepositedETH",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "WithdrawnETH",
        "inputs": [
            {
                "name": "admin",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
] as const