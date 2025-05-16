#!/bin/bash

while getopts ":n:c:u:k:" opt; do
  case $opt in
    n) network="$OPTARG"
    ;;
    c) chain="$OPTARG"
    ;;
    u) rpc="$OPTARG"
    ;;
    k) private_key="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    exit 1
    ;;
  esac

  case $OPTARG in
    -*) echo "Option $opt needs a valid argument" >&2
    exit 1
    ;;
  esac
done

if [ -z ${network+x} ];
then
    echo "network (-n) is unset" >&2
    exit 1
fi

if [ -z ${chain+x} ];
then
    echo "chain (-c) is unset" >&2
    exit 1
fi

if [ -z ${private_key+x} ];
then
    echo "private key (-k) is unset" >&2
    exit 1
fi

set -euo pipefail

ROOT=$(dirname $0)
ENV=$ROOT/../env

# . $ENV/$network/$chain.env

# # Use the RPC environment variable if rpc isn't set.
# if [ -z ${rpc+x} ];
# then
#     rpc=$RPC
# fi
export TESTING_WORMHOLE_ADDRESS=0xBB73cB66C26740F31d1FabDC6b7A46a038A300dd
export PYTH_ADDRESS=0x2880aB155794e7179c9eE2e38200202908C17B43
export ETH_FEED_ID=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace
export WAL_FEED_ID=0xeba0732395fae9dec4bae12e52760b35fc1c5671e2da8b449c9af4efe5d54341
export rpc=https://testnet-rpc.monad.xyz

forge script --legacy forge-scripts/deploy.sol \
    --broadcast \
    --private-key $private_key