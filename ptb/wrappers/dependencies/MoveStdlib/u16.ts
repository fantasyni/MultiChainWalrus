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

let PACKAGE_NAME: string = "MoveStdlib";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000001";
let MODULE_NAME: string = "u16";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

export function to_string(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_string`,
        arguments: args,
    })
}

export function max(tx: Transaction, arg0: number | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::max`,
        arguments: args,
    })
}

export function bitwise_not(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::bitwise_not`,
        arguments: args,
    })
}

export function min(tx: Transaction, arg0: number | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::min`,
        arguments: args,
    })
}

export function diff(tx: Transaction, arg0: number | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::diff`,
        arguments: args,
    })
}

export function divide_and_round_up(tx: Transaction, arg0: number | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::divide_and_round_up`,
        arguments: args,
    })
}

export function pow(tx: Transaction, arg0: number | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pow`,
        arguments: args,
    })
}

export function sqrt(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sqrt`,
        arguments: args,
    })
}

export function try_as_u8(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u16().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::try_as_u8`,
        arguments: args,
    })
}

export const u16 = {
    to_string,
    max,
    bitwise_not,
    min,
    diff,
    divide_and_round_up,
    pow,
    sqrt,
    try_as_u8
}