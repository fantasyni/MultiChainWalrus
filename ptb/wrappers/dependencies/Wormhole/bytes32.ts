import {
    Cursor
} from "./cursor";
import {
    StructClass,
    get_package_address,
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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "bytes32";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Bytes32 =============================== */

export class Bytes32 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Bytes32`;

    data: number[];

    constructor(data: number[]) {
        this.data = data;
    }

    into_value() {
        return this.get_value()
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs().parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs().serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()
    }

    return_bcs() {
        return this.get_bcs()
    }

    from_bcs(arg: any) {
        return Bytes32.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Bytes32.from_bcs_vector(args)
    }

    get_bcs() {
        return Bytes32.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Bytes32`
    }

    from(arg: Bytes32) {
        this.data = arg.data;
    }

    static from_bcs(arg: {
        data: number[]
    }): Bytes32 {
        return new Bytes32(arg.data)
    }

    static from_bcs_vector(args: {
        data: number[]
    } []): Bytes32[] {
        return args.map(function(arg) {
            return new Bytes32(arg.data)
        })
    }

    static get bcs() {
        return bcs_import.struct("Bytes32", {
            data: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Bytes32(val.data),
        });
    };
}

export function length(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::length`,
        arguments: args,
    })
}

export function new_(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function data(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::data`,
        arguments: args,
    })
}

export function to_bytes(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_bytes`,
        arguments: args,
    })
}

export function take_bytes(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_bytes`,
        arguments: args,
    })
}

export function default_(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::default`,
        arguments: args,
    })
}

export function from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_bytes`,
        arguments: args,
    })
}

export function is_nonzero(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_nonzero`,
        arguments: args,
    })
}

export function is_valid(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_valid`,
        arguments: args,
    })
}

export function trim_nonzero_left(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::trim_nonzero_left`,
        arguments: args,
    })
}

export function from_u256_be(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u256().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_u256_be`,
        arguments: args,
    })
}

export function to_u256_be(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_u256_be`,
        arguments: args,
    })
}

export function from_u64_be(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_u64_be`,
        arguments: args,
    })
}

export function to_u64_be(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_u64_be`,
        arguments: args,
    })
}

export function to_address(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_address`,
        arguments: args,
    })
}

export function from_address(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_address`,
        arguments: args,
    })
}

export function from_utf8(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_utf8`,
        arguments: args,
    })
}

export function to_utf8(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_utf8`,
        arguments: args,
    })
}

export function pad_left(tx: Transaction, arg0: number[] | TransactionArgument, arg1: boolean | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bool().serialize((arg1 as boolean)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pad_left`,
        arguments: args,
    })
}

export const bytes32 = {
    Bytes32,
    length,
    new_,
    data,
    to_bytes,
    take_bytes,
    default_,
    from_bytes,
    is_nonzero,
    is_valid,
    trim_nonzero_left,
    from_u256_be,
    to_u256_be,
    from_u64_be,
    to_u64_be,
    to_address,
    from_address,
    from_utf8,
    to_utf8,
    pad_left
}