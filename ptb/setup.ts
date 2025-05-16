import { set_config, new_sui_client, sign_execute_transaction } from "@deepmove/sui";
import { Transaction } from "@mysten/sui/transactions";
import { AdminCap, setup } from "./wrappers/dependencies/MultiChainWalrus/setup";
import { State } from "./wrappers/dependencies/MultiChainWalrus/state";
import { HexString } from "aptos";
import { redeem_walrus_message } from "./wrappers/dependencies/MultiChainWalrus/multichain_walrus";
import { parse_and_verify } from "./wrappers/dependencies/Wormhole/vaa";

import {
    deserialize,
} from "@wormhole-foundation/sdk";

import axios from "axios";
import { fromBase64 } from "@mysten/bcs";
import { bcs } from "@mysten/sui/bcs";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

set_config({
    network: "testnet",
    packages: {
        MultiChainWalrus: "0x8759091c5fd8de144c2cfa02b12b827e415c037e6629cad93af6251552e81c15"
    },
    objects: {
        state: "0xcff32113cc945f9847ccc04d99be33ce4fd3afb2e53e08a4b6feb46241842d95",
        adminCap: "0x27814b5bd6b5b8953367a61402e02ff56390f8f8a440e3b745f921b7a459c637"
    }
});

export interface ApiVaa {
    sequence: number;
    id: string;
    version: number;
    emitterChain: number;
    emitterAddr: string;
    emitterNativeAddr: string;
    guardianSetIndex: number;
    vaa: string;
    timestamp: string;
    updatedAt: string;
    indexedAt: string;
    txHash: string;
}

const rpcUrl = "https://api.testnet.wormholescan.io";
async function get_vaa(txid: string) {
    const url = `${rpcUrl}/api/v1/vaas?txHash=${txid}`;
    try {
        const response = await axios.get<{ data: ApiVaa[] }>(url);
        if (response.data.data.length > 0) return response.data.data[0]!;
    } catch (error) {
        if (!error) return null;
        if (typeof error === "object") {
            // A 404 error means the VAA is not yet available
            // since its not available yet, we return null signaling it can be tried again
            if (axios.isAxiosError(error) && error.response?.status === 404) return null;
            if ("status" in error && error.status === 404) return null;
        }
        throw error;
    }
    return null;
}

async function create_state() {
    const client = new_sui_client();

    if (!client) {
        console.error("sui client null");
        return;
    }

    const tx = new Transaction();

    setup.create_state(tx);

    const result = await sign_execute_transaction(client, tx);

    console.log(result)
}

async function set_transceiver_peer() {
    const client = new_sui_client();

    if (!client) {
        console.error("sui client null");
        return;
    }

    const tx = new Transaction();

    let peer_address = "0x39467cF8A6dA53b611A917e669ea8a40C33FfaaC";
    let address_bytes = new HexString(peer_address).toUint8Array();

    let op_chainid = 10005;
    let eth_chainid = 10002;
    setup.set_transceiver_peer(tx, AdminCap.from_key("adminCap"), State.from_key("state"), eth_chainid, Array.from(address_bytes));

    const result = await sign_execute_transaction(client, tx);

    console.log(result)
}

async function redeem() {
    const client = new_sui_client();

    if (!client) {
        console.error("sui client null");
        return;
    }

    const tx = new Transaction();

    const vaa = await get_vaa("0x8ed11f84d89bf17732d7e52dbbd284dd53b4d99b210e43ca8a22291f8427cf60");

    if (vaa) {
        const vaa_bytes = fromBase64(vaa.vaa);

        let parsed_vaa = deserialize("Uint8Array", vaa_bytes)

        let vaa_bcs = bcs.vector(bcs.u8()).serialize(vaa_bytes);

        let [verifiedVAA] = parse_and_verify(tx, tx.object("0x31358d198147da50db32eda2562951d53973a0c0ad5ed738e9b17d88b213d790"), tx.pure(vaa_bcs), tx.object(SUI_CLOCK_OBJECT_ID))

        console.log(parsed_vaa)
        redeem_walrus_message(tx, State.from_key("state"), verifiedVAA)

        const result = await sign_execute_transaction(client, tx);

        console.log(result)
    }
}

async function go() {
    // create_state();
    set_transceiver_peer();
//     redeem()
}

go()