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

let PACKAGE_NAME: string = "MoveStdlib";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000001";
let MODULE_NAME: string = "bit_vector";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== BitVector =============================== */

export class BitVector implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::BitVector`;

    length: u64_import;
    bit_field: boolean[];

    constructor(length: u64_import, bit_field: boolean[]) {
        this.length = length;
        this.bit_field = bit_field;
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
        return BitVector.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return BitVector.from_bcs_vector(args)
    }

    get_bcs() {
        return BitVector.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::BitVector`
    }

    from(arg: BitVector) {
        this.length = arg.length;
        this.bit_field = arg.bit_field;
    }

    static from_bcs(arg: {
        length: u64_import,
        bit_field: boolean[]
    }): BitVector {
        return new BitVector(arg.length, arg.bit_field)
    }

    static from_bcs_vector(args: {
        length: u64_import,
        bit_field: boolean[]
    } []): BitVector[] {
        return args.map(function(arg) {
            return new BitVector(arg.length, arg.bit_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("BitVector", {
            length: bcs_import.u64(),
            bit_field: bcs_import.vector(bcs_import.bool()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new BitVector(val.length, val.bit_field),
        });
    };
}

export function length(tx: Transaction, arg0: BitVector | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BitVector.bcs.serialize((arg0 as BitVector)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::length`,
        arguments: args,
    })
}

export function new_(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function set(tx: Transaction, arg0: BitVector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BitVector.bcs.serialize((arg0 as BitVector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set`,
        arguments: args,
    })
}

export function unset(tx: Transaction, arg0: BitVector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BitVector.bcs.serialize((arg0 as BitVector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::unset`,
        arguments: args,
    })
}

export function shift_left(tx: Transaction, arg0: BitVector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BitVector.bcs.serialize((arg0 as BitVector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::shift_left`,
        arguments: args,
    })
}

export function is_index_set(tx: Transaction, arg0: BitVector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BitVector.bcs.serialize((arg0 as BitVector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_index_set`,
        arguments: args,
    })
}

export function longest_set_sequence_starting_at(tx: Transaction, arg0: BitVector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(BitVector.bcs.serialize((arg0 as BitVector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::longest_set_sequence_starting_at`,
        arguments: args,
    })
}

export const bit_vector = {
    BitVector,
    length,
    new_,
    set,
    unset,
    shift_left,
    is_index_set,
    longest_set_sequence_starting_at
}