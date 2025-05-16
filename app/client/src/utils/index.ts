import { Contract } from "../constants";

export function get_contract_address(chainId: number): string {
    if (chainId == Contract.Op_Sepolia_ChainId) {
        return Contract.OP_Sepolia_ADDRESS;
    }

    if (chainId == Contract.Sepolia_ChainId) {
        return Contract.Sepolia_ADDRESS;
    }

    return "";
}