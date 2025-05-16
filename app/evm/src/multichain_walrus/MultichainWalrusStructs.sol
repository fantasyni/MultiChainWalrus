// SPDX-License-Identifier: Apache 2
pragma solidity ^0.8.19;

contract MultichainWalrusStructs {
    struct MultichainWalrusMessage {
        // unique identifier for this message type
        uint8 payloadID;
        // arbitrary message string
        bytes message;
    }
}
