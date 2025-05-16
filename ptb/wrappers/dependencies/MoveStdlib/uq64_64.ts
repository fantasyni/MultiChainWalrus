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
let MODULE_NAME: string = "uq64_64";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== UQ64_64 =============================== */

export class UQ64_64 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UQ64_64`;

    pos0: u64_import;

    constructor(pos0: u64_import) {
        this.pos0 = pos0;
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
        return UQ64_64.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UQ64_64.from_bcs_vector(args)
    }

    get_bcs() {
        return UQ64_64.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UQ64_64`
    }

    from(arg: UQ64_64) {
        this.pos0 = arg.pos0;
    }

    static from_bcs(arg: {
        pos0: u64_import
    }): UQ64_64 {
        return new UQ64_64(arg.pos0)
    }

    static from_bcs_vector(args: {
        pos0: u64_import
    } []): UQ64_64[] {
        return args.map(function(arg) {
            return new UQ64_64(arg.pos0)
        })
    }

    static get bcs() {
        return bcs_import.struct("UQ64_64", {
            pos0: bcs_import.u128(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UQ64_64(val.pos0),
        });
    };
}

export function add(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add`,
        arguments: args,
    })
}

export function from_quotient(tx: Transaction, arg0: u64_import | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u128().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u128().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_quotient`,
        arguments: args,
    })
}

export function from_int(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_int`,
        arguments: args,
    })
}

export function sub(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sub`,
        arguments: args,
    })
}

export function mul(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::mul`,
        arguments: args,
    })
}

export function div(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::div`,
        arguments: args,
    })
}

export function to_int(tx: Transaction, arg0: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_int`,
        arguments: args,
    })
}

export function int_mul(tx: Transaction, arg0: u64_import | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u128().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::int_mul`,
        arguments: args,
    })
}

export function int_div(tx: Transaction, arg0: u64_import | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u128().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::int_div`,
        arguments: args,
    })
}

export function le(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::le`,
        arguments: args,
    })
}

export function lt(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::lt`,
        arguments: args,
    })
}

export function ge(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::ge`,
        arguments: args,
    })
}

export function gt(tx: Transaction, arg0: UQ64_64 | TransactionArgument, arg1: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64))), isTransactionArgument(arg1) ? arg1 : tx.pure(UQ64_64.bcs.serialize((arg1 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt`,
        arguments: args,
    })
}

export function to_raw(tx: Transaction, arg0: UQ64_64 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UQ64_64.bcs.serialize((arg0 as UQ64_64)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_raw`,
        arguments: args,
    })
}

export function from_raw(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u128().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_raw`,
        arguments: args,
    })
}

export const uq64_64 = {
    UQ64_64,
    add,
    from_quotient,
    from_int,
    sub,
    mul,
    div,
    to_int,
    int_mul,
    int_div,
    le,
    lt,
    ge,
    gt,
    to_raw,
    from_raw
}