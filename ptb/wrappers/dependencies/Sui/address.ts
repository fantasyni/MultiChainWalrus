import {
    get_package_address,
    isTransactionArgument
} from "@deepmove/sui";
import {
    bcs as bcs_import
} from "@mysten/sui/bcs";
import {
    Transaction,
    TransactionArgument
} from "@mysten/sui/transactions";
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "address";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

export function length(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::length`,
        arguments: args,
    })
}

export function to_bytes(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_bytes`,
        arguments: args,
    })
}

export function to_ascii_string(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_ascii_string`,
        arguments: args,
    })
}

export function to_string(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_string`,
        arguments: args,
    })
}

export function from_ascii_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_ascii_bytes`,
        arguments: args,
    })
}

export function hex_char_value(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::hex_char_value`,
        arguments: args,
    })
}

export function max(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::max`,
        arguments: args,
    })
}

export const address = {
    length,
    to_bytes,
    to_ascii_string,
    to_string,
    from_ascii_bytes,
    hex_char_value,
    max
}