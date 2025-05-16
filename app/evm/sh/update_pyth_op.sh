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
export PYTH_ADDRESS=0x0708325268dF9F66270F1401206434524814508b

export rpc=https://sepolia.optimism.io/

forge script --legacy forge-scripts/update_pyth.sol \
    --rpc-url $rpc \
    --broadcast \
    --private-key $private_key