// SPDX-License-Identifier: Apache 2
pragma solidity ^0.8.19;

import "modules/wormhole/IWormhole.sol";
import "modules/utils/BytesLib.sol";

import "./MultichainWalrusGetters.sol";
import "./MultichainWalrusMessages.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

/**
 * @title A Cross-Chain MultichainWalrus Application
 * @notice This contract uses Wormhole's generic-messaging to send an arbitrary
 * MultichainWalrus message to registered emitters on foreign blockchains
 */
contract MultichainWalrus is MultichainWalrusGetters, MultichainWalrusMessages {
    using BytesLib for bytes;
    IPyth pyth;
    bytes32 public immutable ethPriceId;
    bytes32 public immutable walPriceId;

    uint256 public constant PRICE_VALID_DURATION = 60;
    uint8 public constant ETH_DECIMALS = 18;
    uint8 public constant WAL_DECIMALS = 9;

    event DepositedETH(address indexed user, uint256 amount);
    event WithdrawnETH(address indexed admin, uint256 amount);

    /**
     * @notice Deploys the smart contract and sanity checks initial deployment values
     * @dev Sets the owner, wormhole, chainId and wormholeFinality state variables.
     * See MultichainWalrusState.sol for descriptions of each state variable.
     */
    constructor(
        address pyth_,
        address wormhole_,
        uint16 chainId_,
        uint8 wormholeFinality_,
        bytes32 ethPriceId_,
        bytes32 walPriceId_
    ) {
        // sanity check input values
        require(pyth_ != address(0), "invalid pyth address");
        require(wormhole_ != address(0), "invalid Wormhole address");
        require(chainId_ > 0, "invalid chainId");
        require(wormholeFinality_ > 0, "invalid wormholeFinality");

        pyth = IPyth(pyth_);
        ethPriceId = ethPriceId_;
        walPriceId = walPriceId_;

        // set constructor state values
        setOwner(msg.sender);
        setWormhole(wormhole_);
        setChainId(chainId_);
        setWormholeFinality(wormholeFinality_);
    }

    function updatePyth(bytes[] calldata pythUpdateData) public payable {
        uint updateFee = pyth.getUpdateFee(pythUpdateData);
        pyth.updatePriceFeeds{value: updateFee}(pythUpdateData);
    }

    function calculatePaymentETH(uint64 walAmount) public view returns (uint256 ethAmount) {
        (uint256 ethPrice, uint256 walPrice) = _getValidatedPrices();
        ethAmount = walAmount * (1 ether * walPrice) / ethPrice;
    }

    function withdrawETH(uint256 amount, address payable to) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient ETH balance");
        (bool success, ) = to.call{value: amount}("");
        require(success, "ETH transfer failed");
        emit WithdrawnETH(msg.sender, amount);
    }

    function _getValidatedPrices() internal view returns (uint256 ethPrice, uint256 walPrice) {
        PythStructs.Price memory eth = pyth.getPriceUnsafe(ethPriceId);
        PythStructs.Price memory b = pyth.getPriceUnsafe(walPriceId);

        require(eth.price > 0 && b.price > 0, "Invalid price data");
        require(block.timestamp - eth.publishTime <= PRICE_VALID_DURATION, "ETH price expired");
        require(block.timestamp - b.publishTime <= PRICE_VALID_DURATION, "Wal price expired");

        ethPrice = _scalePrice(eth, ETH_DECIMALS);
        walPrice = _scalePrice(b, WAL_DECIMALS);
    }

    function _scalePrice(PythStructs.Price memory price, uint8 targetDecimals) internal pure returns (uint256) {
        return convertToUint(
            price.price,
            price.expo,
            targetDecimals
        );
    }

    function convertToUint(
        int64 price,
        int32 expo,
        uint8 targetDecimals
    ) public pure returns (uint256) {
        if (price < 0 || expo > 0 || expo < -255) {
            revert();
        }

        uint8 priceDecimals = uint8(uint32(-1 * expo));

        if (targetDecimals >= priceDecimals) {
            return
                uint(uint64(price)) *
                10 ** uint32(targetDecimals - priceDecimals);
        } else {
            return
                uint(uint64(price)) /
                10 ** uint32(priceDecimals - targetDecimals);
        }
    }

    /**
     * @notice Creates an arbitrary MultichainWalrus message to be attested by the
     * Wormhole guardians.
     * @dev batchID is set to 0 to opt out of batching in future Wormhole versions.
     * Reverts if:
     * - caller doesn't pass enough value to pay the Wormhole network fee
     * - `MultichainWalrusMessage` length is >= max(uint16)
     * @param message Arbitrary MultichainWalrus string
     * @return messageSequence Wormhole message sequence for this contract
     */
    function sendUploadWalrus(
        uint64 walAmount,
        string memory message
    ) public payable returns (uint64 messageSequence) {
        // enforce a max size for the arbitrary message
        require(
            abi.encodePacked(message).length < type(uint16).max,
            "message too large"
        );

        uint256 requiredEth = calculatePaymentETH(walAmount);
        require(msg.value == requiredEth, "Incorrect ETH amount");
        emit DepositedETH(msg.sender, msg.value);

        // cache Wormhole instance and fees to save on gas
        IWormhole wormhole = wormhole();
        uint256 wormholeFee = wormhole.messageFee();

        // Confirm that the caller has sent enough value to pay for the Wormhole
        // message fee.
        // require(msg.value == wormholeFee, "insufficient value");

        // create the MultichainWalrusMessage struct
        MultichainWalrusMessage memory parsedMessage = MultichainWalrusMessage({
            payloadID: uint8(1),
            message: bytes(message)
        });

        // encode the MultichainWalrusMessage struct into bytes
        bytes memory encodedMessage = encodeMessage(parsedMessage);

        // Send the MultichainWalrus message by calling publishMessage on the
        // Wormhole core contract and paying the Wormhole protocol fee.
        messageSequence = wormhole.publishMessage{value: wormholeFee}(
            0, // batchID
            encodedMessage,
            wormholeFinality()
        );
    }

    /**
     * @notice Consumes arbitrary MultichainWalrus messages sent by registered emitters
     * @dev The arbitrary message is verified by the Wormhole core endpoint
     * `verifyVM`.
     * Reverts if:
     * - `encodedMessage` is not attested by the Wormhole network
     * - `encodedMessage` was sent by an unregistered emitter
     * - `encodedMessage` was consumed already
     * @param encodedMessage verified Wormhole message containing arbitrary
     * MultichainWalrus message.
     */
    function receiveMessage(bytes memory encodedMessage) public {
        // call the Wormhole core contract to parse and verify the encodedMessage
        (
            IWormhole.VM memory wormholeMessage,
            bool valid,
            string memory reason
        ) = wormhole().parseAndVerifyVM(encodedMessage);

        // confirm that the Wormhole core contract verified the message
        require(valid, reason);

        // verify that this message was emitted by a registered emitter
        require(verifyEmitter(wormholeMessage), "unknown emitter");

        // decode the message payload into the MultichainWalrusMessage struct
        MultichainWalrusMessage memory parsedMessage = decodeMessage(
            wormholeMessage.payload
        );

        /**
         * Check to see if this message has been consumed already. If not,
         * save the parsed message in the receivedMessages mapping.
         *
         * This check can protect against replay attacks in xDapps where messages are
         * only meant to be consumed once.
         */
        require(
            !isMessageConsumed(wormholeMessage.hash),
            "message already consumed"
        );
        consumeMessage(wormholeMessage.hash, parsedMessage.message);
    }

    /**
     * @notice Registers foreign emitters (MultichainWalrus contracts) with this contract
     * @dev Only the deployer (owner) can invoke this method
     * @param emitterChainId Wormhole chainId of the contract being registered
     * See https://book.wormhole.com/reference/contracts.html for more information.
     * @param emitterAddress 32-byte address of the contract being registered. For EVM
     * contracts the first 12 bytes should be zeros.
     */
    function registerEmitter(
        uint16 emitterChainId,
        bytes32 emitterAddress
    ) public onlyOwner {
        // sanity check the emitterChainId and emitterAddress input values
        require(
            emitterChainId != 0 && emitterChainId != chainId(),
            "emitterChainId cannot equal 0 or this chainId"
        );
        require(
            emitterAddress != bytes32(0),
            "emitterAddress cannot equal bytes32(0)"
        );

        // update the registeredEmitters state variable
        setEmitter(emitterChainId, emitterAddress);
    }

    function verifyEmitter(
        IWormhole.VM memory vm
    ) internal view returns (bool) {
        // Verify that the sender of the Wormhole message is a trusted
        // MultichainWalrus contract.
        return getRegisteredEmitter(vm.emitterChainId) == vm.emitterAddress;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "caller not the owner");
        _;
    }
}
