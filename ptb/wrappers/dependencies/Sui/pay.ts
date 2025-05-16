import {
    Coin
} from "./coin";
import {
    StructClass,
    U64,
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
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "pay";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

function join < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::join`,
        typeArguments: type_args,
        arguments: args,
    })
}

function split < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::split`,
        typeArguments: type_args,
        arguments: args,
    })
}

function keep < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::keep`,
        typeArguments: type_args,
        arguments: args,
    })
}

function split_vec < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: U64[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as U64[])).serialize(into_arr_value((arg1 as U64[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::split_vec`,
        typeArguments: type_args,
        arguments: args,
    })
}

function split_and_transfer < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::split_and_transfer`,
        typeArguments: type_args,
        arguments: args,
    })
}

function divide_and_keep < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::divide_and_keep`,
        typeArguments: type_args,
        arguments: args,
    })
}

function join_vec < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: Coin[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as Coin[])).serialize(into_arr_value((arg1 as Coin[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::join_vec`,
        typeArguments: type_args,
        arguments: args,
    })
}

function join_vec_and_transfer < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin[] | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(has_arr(arg0) ? into_arr_bcs_vector((arg0 as Coin[])).serialize(into_arr_value((arg0 as Coin[]))) : new Uint8Array([0])), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::join_vec_and_transfer`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const pay = {
    join,
    split,
    keep,
    split_vec,
    split_and_transfer,
    divide_and_keep,
    join_vec,
    join_vec_and_transfer
}