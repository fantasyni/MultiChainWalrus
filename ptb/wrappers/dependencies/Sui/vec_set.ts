import {
    StructClass,
    TypeArgument,
    get_package_address,
    has_arr,
    into_arr_bcs_vector,
    into_arr_value,
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
let MODULE_NAME: string = "vec_set";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== VecSet =============================== */

export class VecSet < T0 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::VecSet`;

    contents: T0[];

    T0_bcs: any;

    constructor(contents: T0[]) {
        this.contents = contents;
    }

    into_value() {
        return {
            contents: into_arr_value(this.contents)
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.contents) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.contents) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.contents) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.contents) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.contents) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return VecSet.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return VecSet.from_bcs_vector(args)
    }

    get_bcs() {
        return VecSet.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::VecSet`
    }

    from(arg: VecSet < T0 > ) {
        this.contents = arg.contents;
    }

    static from_bcs < T0 extends TypeArgument > (arg: {
        contents: T0[]
    }): VecSet < T0 > {
        return new VecSet(arg.contents)
    }

    static from_bcs_vector < T0 extends TypeArgument > (args: {
        contents: T0[]
    } []): VecSet < T0 > [] {
        return args.map(function(arg) {
            return new VecSet(arg.contents)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0 > (T0: BcsType < T0, input0 > ) =>
            bcs_import.struct(`VecSet<${T0.name}>`, {
                contents: bcs_import.vector(T0),
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new VecSet(val.contents),
            });
    };
}

function empty(tx: Transaction, type_args: string[]) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function singleton < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::singleton`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_empty < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function contains < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::contains`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function insert < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::insert`,
        typeArguments: type_args,
        arguments: args,
    })
}

function size < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::size`,
        typeArguments: type_args,
        arguments: args,
    })
}

function into_keys < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::into_keys`,
        typeArguments: type_args,
        arguments: args,
    })
}

function from_keys < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(has_arr(arg0) ? into_arr_bcs_vector((arg0 as T0[])).serialize(into_arr_value((arg0 as T0[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_keys`,
        typeArguments: type_args,
        arguments: args,
    })
}

function keys < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::keys`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_idx_opt < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_idx_opt`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_idx < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: VecSet < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as VecSet < T0 > ).serialize((arg0 as VecSet < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_idx`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const vec_set = {
    VecSet,
    empty,
    singleton,
    is_empty,
    contains,
    remove,
    insert,
    size,
    into_keys,
    from_keys,
    keys,
    get_idx_opt,
    get_idx
}