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
let MODULE_NAME: string = "fixed_point32";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== FixedPoint32 =============================== */

export class FixedPoint32 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::FixedPoint32`;

    value: u64_import;

    constructor(value: u64_import) {
        this.value = value;
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
        return FixedPoint32.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return FixedPoint32.from_bcs_vector(args)
    }

    get_bcs() {
        return FixedPoint32.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::FixedPoint32`
    }

    from(arg: FixedPoint32) {
        this.value = arg.value;
    }

    static from_bcs(arg: {
        value: u64_import
    }): FixedPoint32 {
        return new FixedPoint32(arg.value)
    }

    static from_bcs_vector(args: {
        value: u64_import
    } []): FixedPoint32[] {
        return args.map(function(arg) {
            return new FixedPoint32(arg.value)
        })
    }

    static get bcs() {
        return bcs_import.struct("FixedPoint32", {
            value: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new FixedPoint32(val.value),
        });
    };
}

export function multiply_u64(tx: Transaction, arg0: u64_import | TransactionArgument, arg1: FixedPoint32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure(FixedPoint32.bcs.serialize((arg1 as FixedPoint32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::multiply_u64`,
        arguments: args,
    })
}

export function divide_u64(tx: Transaction, arg0: u64_import | TransactionArgument, arg1: FixedPoint32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure(FixedPoint32.bcs.serialize((arg1 as FixedPoint32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::divide_u64`,
        arguments: args,
    })
}

export function create_from_rational(tx: Transaction, arg0: u64_import | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_from_rational`,
        arguments: args,
    })
}

export function create_from_raw_value(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_from_raw_value`,
        arguments: args,
    })
}

export function get_raw_value(tx: Transaction, arg0: FixedPoint32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FixedPoint32.bcs.serialize((arg0 as FixedPoint32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_raw_value`,
        arguments: args,
    })
}

export function is_zero(tx: Transaction, arg0: FixedPoint32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FixedPoint32.bcs.serialize((arg0 as FixedPoint32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_zero`,
        arguments: args,
    })
}

export const fixed_point32 = {
    FixedPoint32,
    multiply_u64,
    divide_u64,
    create_from_rational,
    create_from_raw_value,
    get_raw_value,
    is_zero
}