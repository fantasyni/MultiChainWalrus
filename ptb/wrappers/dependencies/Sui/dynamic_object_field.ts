import {
    UID
} from "./object";
import {
    StructClass,
    TypeArgument,
    get_package_address,
    isTransactionArgument,
    to_arr_value
} from "@deepmove/sui";
import {
    BcsType,
    bcs as bcs_import
} from "@mysten/sui/bcs";
import {
    Transaction,
    TransactionArgument
} from "@mysten/sui/transactions";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "dynamic_object_field";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Wrapper =============================== */

export class Wrapper < T0 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Wrapper`;

    name: T0;

    T0_bcs: any;

    constructor(name: T0) {
        this.name = name;
    }

    into_value() {
        return {
            name: (this.name as StructClass).into_value ? (this.name as StructClass).into_value() : this.name
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.name) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return Wrapper.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Wrapper.from_bcs_vector(args)
    }

    get_bcs() {
        return Wrapper.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Wrapper`
    }

    from(arg: Wrapper < T0 > ) {
        this.name = arg.name;
    }

    static from_bcs < T0 extends TypeArgument > (arg: {
        name: T0
    }): Wrapper < T0 > {
        return new Wrapper(arg.name)
    }

    static from_bcs_vector < T0 extends TypeArgument > (args: {
        name: T0
    } []): Wrapper < T0 > [] {
        return args.map(function(arg) {
            return new Wrapper(arg.name)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0 > (T0: BcsType < T0, input0 > ) =>
            bcs_import.struct(`Wrapper<${T0.name}>`, {
                name: T0,
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new Wrapper(val.name),
            });
    };
}

function borrow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function id < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::id`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument, arg2: T1 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function exists__ < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::exists_`,
        typeArguments: type_args,
        arguments: args,
    })
}

function exists_with_type < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::exists_with_type`,
        typeArguments: type_args,
        arguments: args,
    })
}

function internal_add < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument, arg2: T1 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::internal_add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function internal_borrow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::internal_borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function internal_borrow_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::internal_borrow_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function internal_remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::internal_remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function internal_exists_with_type < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::internal_exists_with_type`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const dynamic_object_field = {
    Wrapper,
    borrow,
    borrow_mut,
    remove,
    id,
    add,
    exists__,
    exists_with_type,
    internal_add,
    internal_borrow,
    internal_borrow_mut,
    internal_remove,
    internal_exists_with_type
}