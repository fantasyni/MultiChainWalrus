import {
    StructClass,
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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "bcs";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== BCS =============================== */

export class BCS implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::BCS`;

    bytes: number[];

    constructor(bytes: number[]) {
        this.bytes = bytes;
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
        return BCS.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return BCS.from_bcs_vector(args)
    }

    get_bcs() {
        return BCS.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::BCS`
    }

    from(arg: BCS) {
        this.bytes = arg.bytes;
    }

    static from_bcs(arg: {
        bytes: number[]
    }): BCS {
        return new BCS(arg.bytes)
    }

    static from_bcs_vector(args: {
        bytes: number[]
    } []): BCS[] {
        return args.map(function(arg) {
            return new BCS(arg.bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("BCS", {
            bytes: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new BCS(val.bytes),
        });
    };
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

function to_bytes < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_bytes`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function into_remainder_bytes(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::into_remainder_bytes`,
        arguments: args,
    })
}

export function peel_address(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_address`,
        arguments: args,
    })
}

export function peel_bool(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_bool`,
        arguments: args,
    })
}

export function peel_u8(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_u8`,
        arguments: args,
    })
}

export function peel_u16(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_u16`,
        arguments: args,
    })
}

export function peel_u32(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_u32`,
        arguments: args,
    })
}

export function peel_u64(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_u64`,
        arguments: args,
    })
}

export function peel_u128(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_u128`,
        arguments: args,
    })
}

export function peel_u256(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_u256`,
        arguments: args,
    })
}

export function peel_vec_length(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_length`,
        arguments: args,
    })
}

export function peel_vec_address(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_address`,
        arguments: args,
    })
}

export function peel_vec_bool(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_bool`,
        arguments: args,
    })
}

export function peel_vec_u8(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_u8`,
        arguments: args,
    })
}

export function peel_vec_vec_u8(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_vec_u8`,
        arguments: args,
    })
}

export function peel_vec_u16(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_u16`,
        arguments: args,
    })
}

export function peel_vec_u32(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_u32`,
        arguments: args,
    })
}

export function peel_vec_u64(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_u64`,
        arguments: args,
    })
}

export function peel_vec_u128(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_u128`,
        arguments: args,
    })
}

export function peel_vec_u256(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_vec_u256`,
        arguments: args,
    })
}

export function peel_enum_tag(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_enum_tag`,
        arguments: args,
    })
}

export function peel_option_address(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_address`,
        arguments: args,
    })
}

export function peel_option_bool(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_bool`,
        arguments: args,
    })
}

export function peel_option_u8(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_u8`,
        arguments: args,
    })
}

export function peel_option_u16(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_u16`,
        arguments: args,
    })
}

export function peel_option_u32(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_u32`,
        arguments: args,
    })
}

export function peel_option_u64(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_u64`,
        arguments: args,
    })
}

export function peel_option_u128(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_u128`,
        arguments: args,
    })
}

export function peel_option_u256(tx: Transaction, arg0: BCS | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BCS.bcs.serialize((arg0 as BCS)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::peel_option_u256`,
        arguments: args,
    })
}

export const bcs = {
    BCS,
    new_,
    to_bytes,
    into_remainder_bytes,
    peel_address,
    peel_bool,
    peel_u8,
    peel_u16,
    peel_u32,
    peel_u64,
    peel_u128,
    peel_u256,
    peel_vec_length,
    peel_vec_address,
    peel_vec_bool,
    peel_vec_u8,
    peel_vec_vec_u8,
    peel_vec_u16,
    peel_vec_u32,
    peel_vec_u64,
    peel_vec_u128,
    peel_vec_u256,
    peel_enum_tag,
    peel_option_address,
    peel_option_bool,
    peel_option_u8,
    peel_option_u16,
    peel_option_u32,
    peel_option_u64,
    peel_option_u128,
    peel_option_u256
}