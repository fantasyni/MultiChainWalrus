import {
    Cursor
} from "./cursor";
import {
    StructClass,
    U8,
    get_package_address,
    has_arr,
    into_arr_bcs_vector,
    into_arr_value,
    isTransactionArgument,
    u64 as u64_import
} from "@deepmove/sui";
import {
    bcs as bcs_import
} from "@mysten/sui/bcs";
import {
    Transaction,
    TransactionArgument
} from "@mysten/sui/transactions";

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "bytes";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

export function push_u8(tx: Transaction, arg0: number[] | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_u8`,
        arguments: args,
    })
}

export function push_u16_be(tx: Transaction, arg0: number[] | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_u16_be`,
        arguments: args,
    })
}

export function push_u32_be(tx: Transaction, arg0: number[] | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u32().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_u32_be`,
        arguments: args,
    })
}

export function push_u64_be(tx: Transaction, arg0: number[] | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_u64_be`,
        arguments: args,
    })
}

export function push_u128_be(tx: Transaction, arg0: number[] | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u128().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_u128_be`,
        arguments: args,
    })
}

export function push_u256_be(tx: Transaction, arg0: number[] | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u256().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_u256_be`,
        arguments: args,
    })
}

export function take_u8(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_u8`,
        arguments: args,
    })
}

export function take_u16_be(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_u16_be`,
        arguments: args,
    })
}

export function take_u32_be(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_u32_be`,
        arguments: args,
    })
}

export function take_u64_be(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_u64_be`,
        arguments: args,
    })
}

export function take_u128_be(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_u128_be`,
        arguments: args,
    })
}

export function take_u256_be(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_u256_be`,
        arguments: args,
    })
}

export function take_bytes(tx: Transaction, arg0: Cursor < number > | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > ))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_bytes`,
        arguments: args,
    })
}

function push_reverse < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: U8[] | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(has_arr(arg0) ? into_arr_bcs_vector((arg0 as U8[])).serialize(into_arr_value((arg0 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_reverse`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const bytes = {
    push_u8,
    push_u16_be,
    push_u32_be,
    push_u64_be,
    push_u128_be,
    push_u256_be,
    take_u8,
    take_u16_be,
    take_u32_be,
    take_u64_be,
    take_u128_be,
    take_u256_be,
    take_bytes,
    push_reverse
}