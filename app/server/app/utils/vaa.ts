import axios from "axios";

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
export async function get_vaa(txid: string) {
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