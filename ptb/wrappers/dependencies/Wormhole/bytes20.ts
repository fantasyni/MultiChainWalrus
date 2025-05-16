import {
    Cursor
} from "./cursor";
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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "bytes20";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Bytes20 =============================== */

export class Bytes20 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Bytes20`;

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
        return Bytes20.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Bytes20.from_bcs_vector(args)
    }

    get_bcs() {
        return Bytes20.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Bytes20`
    }

    from(arg: Bytes20) {
        this.data = arg.data;
    }

    static from_bcs(arg: {
        data: number[]
    }): Bytes20 {
        return new Bytes20(arg.data)
    }

    static from_bcs_vector(args: {
        data: number[]
    } []): Bytes20[] {
        return args.map(function(arg) {
            return new Bytes20(arg.data)
        })
    }

    static get bcs() {
        return bcs_import.struct("Bytes20", {
            data: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Bytes20(val.data),
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

export function data(tx: Transaction, arg0: Bytes20 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes20.bcs.serialize((arg0 as Bytes20)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::data`,
        arguments: args,
    })
}

export function to_bytes(tx: Transaction, arg0: Bytes20 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes20.bcs.serialize((arg0 as Bytes20)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_bytes`,
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

export function take(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take`,
        arguments: args,
    })
}

export function is_nonzero(tx: Transaction, arg0: Bytes20 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes20.bcs.serialize((arg0 as Bytes20)))
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

export function pad_left(tx: Transaction, arg0: number[] | TransactionArgument, arg1: boolean | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bool().serialize((arg1 as boolean)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pad_left`,
        arguments: args,
    })
}

export const bytes20 = {
    Bytes20,
    length,
    new_,
    data,
    to_bytes,
    default_,
    from_bytes,
    take,
    is_nonzero,
    is_valid,
    trim_nonzero_left,
    pad_left
}