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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "group_ops";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Element =============================== */

export class Element implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Element`;

    bytes: number[];

    constructor(bytes: number[]) {
        this.bytes = bytes;
    }

    into_value() {
        return {
            bytes: into_arr_value(this.bytes)
        }
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
        return Element.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Element.from_bcs_vector(args)
    }

    get_bcs() {
        return Element.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Element`
    }

    from(arg: Element) {
        this.bytes = arg.bytes;
    }

    static from_bcs(arg: {
        bytes: number[]
    }): Element {
        return new Element(arg.bytes)
    }

    static from_bcs_vector(args: {
        bytes: number[]
    } []): Element[] {
        return args.map(function(arg) {
            return new Element(arg.bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("Element", {
            bytes: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Element(val.bytes),
        });
    };
}

function bytes < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Element).serialize((arg0 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::bytes`,
        typeArguments: type_args,
        arguments: args,
    })
}

function from_bytes(tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: U8[] | TransactionArgument, arg2: boolean | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as U8[])).serialize(into_arr_value((arg1 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bool().serialize((arg2 as boolean)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_bytes`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: Element | TransactionArgument, arg2: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Element).serialize((arg1 as Element).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Element).serialize((arg2 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function sub < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: Element | TransactionArgument, arg2: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Element).serialize((arg1 as Element).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Element).serialize((arg2 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sub`,
        typeArguments: type_args,
        arguments: args,
    })
}

function mul < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: Element | TransactionArgument, arg2: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Element).serialize((arg1 as Element).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Element).serialize((arg2 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::mul`,
        typeArguments: type_args,
        arguments: args,
    })
}

function div < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: Element | TransactionArgument, arg2: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Element).serialize((arg1 as Element).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Element).serialize((arg2 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::div`,
        typeArguments: type_args,
        arguments: args,
    })
}

function equal < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Element).serialize((arg0 as Element).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Element).serialize((arg1 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::equal`,
        typeArguments: type_args,
        arguments: args,
    })
}

function hash_to(tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: U8[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as U8[])).serialize(into_arr_value((arg1 as U8[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::hash_to`,
        typeArguments: type_args,
        arguments: args,
    })
}

function multi_scalar_multiplication < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: Element[] | TransactionArgument, arg2: Element[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as Element[])).serialize(into_arr_value((arg1 as Element[]))) : new Uint8Array([0])), isTransactionArgument(arg2) ? arg2 : tx.pure(has_arr(arg2) ? into_arr_bcs_vector((arg2 as Element[])).serialize(into_arr_value((arg2 as Element[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::multi_scalar_multiplication`,
        typeArguments: type_args,
        arguments: args,
    })
}

function pairing < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: Element | TransactionArgument, arg2: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Element).serialize((arg1 as Element).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Element).serialize((arg2 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pairing`,
        typeArguments: type_args,
        arguments: args,
    })
}

function convert < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: number | TransactionArgument, arg2: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Element).serialize((arg2 as Element).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::convert`,
        typeArguments: type_args,
        arguments: args,
    })
}

function sum < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: number | TransactionArgument, arg1: Element[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as Element[])).serialize(into_arr_value((arg1 as Element[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sum`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function set_as_prefix(tx: Transaction, arg0: u64_import | TransactionArgument, arg1: boolean | TransactionArgument, arg2: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bool().serialize((arg1 as boolean))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_as_prefix`,
        arguments: args,
    })
}

export const group_ops = {
    Element,
    bytes,
    from_bytes,
    add,
    sub,
    mul,
    div,
    equal,
    hash_to,
    multi_scalar_multiplication,
    pairing,
    convert,
    sum,
    set_as_prefix
}