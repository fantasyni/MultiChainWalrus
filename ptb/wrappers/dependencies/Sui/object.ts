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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "object";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== ID =============================== */

export class ID implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ID`;

    bytes: string;

    constructor(bytes: string) {
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
        return ID.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ID.from_bcs_vector(args)
    }

    get_bcs() {
        return ID.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ID`
    }

    from(arg: ID) {
        this.bytes = arg.bytes;
    }

    static from_bcs(arg: {
        bytes: string
    }): ID {
        return new ID(arg.bytes)
    }

    static from_bcs_vector(args: {
        bytes: string
    } []): ID[] {
        return args.map(function(arg) {
            return new ID(arg.bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("ID", {
            bytes: bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            }),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ID(val.bytes),
        });
    };
}

/* ============================== UID =============================== */

export class UID implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UID`;

    id: ID;

    constructor(id: ID) {
        this.id = id;
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
        return UID.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UID.from_bcs_vector(args)
    }

    get_bcs() {
        return UID.bcs
    }

    get_value() {
        return this
    }

    static from_id(id: string) {
        return new UID(new ID(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UID`
    }

    from(arg: UID) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: ID
    }): UID {
        return new UID(arg.id)
    }

    static from_bcs_vector(args: {
        id: ID
    } []): UID[] {
        return args.map(function(arg) {
            return new UID(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("UID", {
            id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UID(val.id),
        });
    };
}

export function new_(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function id_to_bytes(tx: Transaction, arg0: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ID.bcs.serialize((arg0 as ID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id_to_bytes`,
        arguments: args,
    })
}

export function id_to_address(tx: Transaction, arg0: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ID.bcs.serialize((arg0 as ID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id_to_address`,
        arguments: args,
    })
}

export function id_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id_from_bytes`,
        arguments: args,
    })
}

export function id_from_address(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id_from_address`,
        arguments: args,
    })
}

export function sui_system_state(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sui_system_state`,
        arguments: args,
    })
}

export function clock(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::clock`,
        arguments: args,
    })
}

export function authenticator_state(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authenticator_state`,
        arguments: args,
    })
}

export function randomness_state(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::randomness_state`,
        arguments: args,
    })
}

export function sui_deny_list_object_id(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sui_deny_list_object_id`,
        arguments: args,
    })
}

export function bridge(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::bridge`,
        arguments: args,
    })
}

export function uid_as_inner(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_as_inner`,
        arguments: args,
    })
}

export function uid_to_inner(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_to_inner`,
        arguments: args,
    })
}

export function uid_to_bytes(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_to_bytes`,
        arguments: args,
    })
}

export function uid_to_address(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_to_address`,
        arguments: args,
    })
}

export function delete_(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::delete`,
        arguments: args,
    })
}

function id < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_id < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_id`,
        typeArguments: type_args,
        arguments: args,
    })
}

function id_bytes < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id_bytes`,
        typeArguments: type_args,
        arguments: args,
    })
}

function id_address < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id_address`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function new_uid_from_hash(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_uid_from_hash`,
        arguments: args,
    })
}

export const object = {
    ID,
    UID,
    new_,
    id_to_bytes,
    id_to_address,
    id_from_bytes,
    id_from_address,
    sui_system_state,
    clock,
    authenticator_state,
    randomness_state,
    sui_deny_list_object_id,
    bridge,
    uid_as_inner,
    uid_to_inner,
    uid_to_bytes,
    uid_to_address,
    delete_,
    id,
    borrow_id,
    id_bytes,
    id_address,
    new_uid_from_hash
}