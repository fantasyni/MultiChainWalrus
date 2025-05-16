import {
    UID
} from "./object";
import {
    StructClass,
    get_object_address,
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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "object_bag";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== ObjectBag =============================== */

export class ObjectBag implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ObjectBag`;

    id: UID;
    size ? : u64_import;

    constructor(id: UID, size ? : u64_import) {
        this.id = id;
        this.size = size;
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
        return ObjectBag.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ObjectBag.from_bcs_vector(args)
    }

    get_bcs() {
        return ObjectBag.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new ObjectBag(UID.from_id(id));
    }

    static from_id(id: string) {
        return new ObjectBag(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ObjectBag`
    }

    from(arg: ObjectBag) {
        this.id = arg.id;
        this.size = arg.size;
    }

    static from_bcs(arg: {
        id: UID,
        size: u64_import
    }): ObjectBag {
        return new ObjectBag(arg.id, arg.size)
    }

    static from_bcs_vector(args: {
        id: UID,
        size: u64_import
    } []): ObjectBag[] {
        return args.map(function(arg) {
            return new ObjectBag(arg.id, arg.size)
        })
    }

    static get bcs() {
        return bcs_import.struct("ObjectBag", {
            id: UID.bcs,
            size: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ObjectBag(val.id, val.size),
        });
    };
}

export function length(tx: Transaction, arg0: ObjectBag | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::length`,
        arguments: args,
    })
}

function borrow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ObjectBag | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ObjectBag | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function destroy_empty(tx: Transaction, arg0: ObjectBag | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_empty`,
        arguments: args,
    })
}

export function is_empty(tx: Transaction, arg0: ObjectBag | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_empty`,
        arguments: args,
    })
}

function contains < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ObjectBag | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::contains`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ObjectBag | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function new_(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

function add < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: ObjectBag | TransactionArgument, arg1: T0 | TransactionArgument, arg2: T1 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function contains_with_type < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ObjectBag | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::contains_with_type`,
        typeArguments: type_args,
        arguments: args,
    })
}

function value_id < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ObjectBag | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as ObjectBag).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::value_id`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const object_bag = {
    ObjectBag,
    length,
    borrow,
    borrow_mut,
    destroy_empty,
    is_empty,
    contains,
    remove,
    new_,
    add,
    contains_with_type,
    value_id
}