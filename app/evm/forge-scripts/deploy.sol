// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {IWormhole} from "modules/wormhole/IWormhole.sol";
import {MultichainWalrus} from "contracts/multichain_walrus/MultichainWalrus.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";

contract ContractScript is Script {
    IWormhole wormhole;
    MultichainWalrus multichain;
    IPyth pyth;

    function setUp() public {
        wormhole = IWormhole(vm.envAddress("TESTING_WORMHOLE_ADDRESS"));
        pyth = IPyth(vm.envAddress("PYTH_ADDRESS"));
    }

    function deploy() public {
        multichain = new MultichainWalrus(
            address(pyth),
            address(wormhole),
            wormhole.chainId(),
            200,
            vm.envBytes32("ETH_FEED_ID"),
            vm.envBytes32("WAL_FEED_ID")
        );
    }

    function run() public {
        // begin sending transactions
        vm.startBroadcast();

        deploy();

        // finished
        vm.stopBroadcast();
    }
}
