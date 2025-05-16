import {
    ID
} from "../Sui/object";
import {
    Bytes32
} from "./bytes32";
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
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "external_address";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== ExternalAddress =============================== */

export class ExternalAddress implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ExternalAddress`;

    value: Bytes32;

    constructor(value: Bytes32) {
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
        return ExternalAddress.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ExternalAddress.from_bcs_vector(args)
    }

    get_bcs() {
        return ExternalAddress.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ExternalAddress`
    }

    from(arg: ExternalAddress) {
        this.value = arg.value;
    }

    static from_bcs(arg: {
        value: Bytes32
    }): ExternalAddress {
        return new ExternalAddress(arg.value)
    }

    static from_bcs_vector(args: {
        value: Bytes32
    } []): ExternalAddress[] {
        return args.map(function(arg) {
            return new ExternalAddress(arg.value)
        })
    }

    static get bcs() {
        return bcs_import.struct("ExternalAddress", {
            value: Bytes32.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ExternalAddress(val.value),
        });
    };
}

export function new_(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function to_bytes(tx: Transaction, arg0: ExternalAddress | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ExternalAddress.bcs.serialize((arg0 as ExternalAddress)))
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

export function is_nonzero(tx: Transaction, arg0: ExternalAddress | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ExternalAddress.bcs.serialize((arg0 as ExternalAddress)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_nonzero`,
        arguments: args,
    })
}

export function to_address(tx: Transaction, arg0: ExternalAddress | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ExternalAddress.bcs.serialize((arg0 as ExternalAddress)))
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

export function new_nonzero(tx: Transaction, arg0: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_nonzero`,
        arguments: args,
    })
}

export function to_bytes32(tx: Transaction, arg0: ExternalAddress | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ExternalAddress.bcs.serialize((arg0 as ExternalAddress)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_bytes32`,
        arguments: args,
    })
}

export function take_nonzero(tx: Transaction, arg0: Cursor < number > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Cursor.bcs(bcs_import.u8()).serialize((arg0 as Cursor < number > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_nonzero`,
        arguments: args,
    })
}

export function from_id(tx: Transaction, arg0: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ID.bcs.serialize((arg0 as ID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_id`,
        arguments: args,
    })
}

export const external_address = {
    ExternalAddress,
    new_,
    to_bytes,
    take_bytes,
    default_,
    is_nonzero,
    to_address,
    from_address,
    new_nonzero,
    to_bytes32,
    take_nonzero,
    from_id
}