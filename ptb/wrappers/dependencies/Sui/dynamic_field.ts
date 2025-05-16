import {
    UID
} from "./object";
import {
    StructClass,
    TypeArgument,
    get_object_address,
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
let MODULE_NAME: string = "dynamic_field";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Field =============================== */

export class Field < T0 extends TypeArgument, T1 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Field`;

    id: UID;
    name ? : T0;
    value ? : T1;

    T0_bcs: any;
    T1_bcs: any;

    constructor(id: UID, name ? : T0, value ? : T1) {
        this.id = id;
        this.name = name;
        this.value = value;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            name: (this.name as StructClass).into_value ? (this.name as StructClass).into_value() : this.name,
            value: (this.value as StructClass).into_value ? (this.value as StructClass).into_value() : this.value
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.name) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.name) as StructClass).get_bcs(), (to_arr_value(this.value) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return Field.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Field.from_bcs_vector(args)
    }

    get_bcs() {
        return Field.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Field(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Field(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Field`
    }

    from(arg: Field < T0, T1 > ) {
        this.id = arg.id;
        this.name = arg.name;
        this.value = arg.value;
    }

    static from_bcs < T0 extends TypeArgument,
    T1 extends TypeArgument > (arg: {
        id: UID,
        name: T0,
        value: T1
    }): Field < T0,
    T1 > {
        return new Field(arg.id, arg.name, arg.value)
    }

    static from_bcs_vector < T0 extends TypeArgument,
    T1 extends TypeArgument > (args: {
        id: UID,
        name: T0,
        value: T1
    } []): Field < T0,
    T1 > [] {
        return args.map(function(arg) {
            return new Field(arg.id, arg.name, arg.value)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0, T1 extends TypeArgument, input1 > (T0: BcsType < T0, input0 > , T1: BcsType < T1, input1 > ) =>
            bcs_import.struct(`Field<${T0.name}, ${T1.name}>`, {
                id: UID.bcs,
                name: T0,
                value: T1,
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new Field(val.id, val.name, val.value),
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

function remove_if_exists < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove_if_exists`,
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

function field_info < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::field_info`,
        typeArguments: type_args,
        arguments: args,
    })
}

function field_info_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::field_info_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const dynamic_field = {
    Field,
    borrow,
    borrow_mut,
    remove,
    add,
    exists__,
    remove_if_exists,
    exists_with_type,
    field_info,
    field_info_mut
}