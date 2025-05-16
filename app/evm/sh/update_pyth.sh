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
export PYTH_ADDRESS=0x2880aB155794e7179c9eE2e38200202908C17B43

forge script --legacy forge-scripts/update_pyth.sol \
    --broadcast \
    --private-key $private_key