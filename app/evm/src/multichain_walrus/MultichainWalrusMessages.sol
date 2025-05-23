// SPDX-License-Identifier: Apache 2
pragma solidity ^0.8.19;

import "modules/utils/BytesLib.sol";

import "./MultichainWalrusStructs.sol";

contract MultichainWalrusMessages is MultichainWalrusStructs {
    using BytesLib for bytes;

    /**
     * @notice Encodes the MultichainWalrusMessage struct into bytes
     * @param parsedMessage MultichainWalrusMessage struct with arbitrary MultichainWalrus message
     * @return encodedMessage MultichainWalrusMessage encoded into bytes
     */
    function encodeMessage(
        MultichainWalrusMessage memory parsedMessage
    ) public pure returns (bytes memory encodedMessage) {
        // Convert message string to bytes so that we can use the .length attribute.
        // The length of the arbitrary messages needs to be encoded in the message
        // so that the corresponding decode function can decode the message properly.
        bytes memory encodedMessagePayload = abi.encodePacked(parsedMessage.message);

        // return the encoded message
        encodedMessage = abi.encodePacked(
            parsedMessage.payloadID,
            uint16(encodedMessagePayload.length),
            encodedMessagePayload
        );
    }

    /**
     * @notice Decodes bytes into MultichainWalrusMessage struct
     * @dev Verifies the payloadID
     * @param encodedMessage encoded arbitrary MultichainWalrus message
     * @return parsedMessage MultichainWalrusMessage struct with arbitrary MultichainWalrus message
     */
    function decodeMessage(
        bytes memory encodedMessage
    ) public pure returns (MultichainWalrusMessage memory parsedMessage) {
        // starting index for byte parsing
        uint256 index = 0;

        // parse and verify the payloadID
        parsedMessage.payloadID = encodedMessage.toUint8(index);
        require(parsedMessage.payloadID == 1, "invalid payloadID");
        index += 1;

        // parse the message string length
        uint256 messageLength = encodedMessage.toUint16(index);
        index += 2;

        // parse the message string
        bytes memory messageBytes = encodedMessage.slice(index, messageLength);
        parsedMessage.message = (messageBytes);
        index += messageLength;

        // confirm that the message was the expected length
        require(index == encodedMessage.length, "invalid message length");
    }
}
