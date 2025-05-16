import {
    StructClass,
    TypeArgument,
    get_package_address,
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

let PACKAGE_NAME: string = "MoveStdlib";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000001";
let MODULE_NAME: string = "option";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Option =============================== */

export class Option < T0 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Option`;

    vec: T0[];

    T0_bcs: any;

    constructor(vec: T0[]) {
        this.vec = vec;
    }

    into_value() {
        return {
            vec: into_arr_value(this.vec)
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.vec) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.vec) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.vec) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.vec) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.vec) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return Option.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Option.from_bcs_vector(args)
    }

    get_bcs() {
        return Option.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Option`
    }

    from(arg: Option < T0 > ) {
        this.vec = arg.vec;
    }

    static from_bcs < T0 extends TypeArgument > (arg: {
        vec: T0[]
    }): Option < T0 > {
        return new Option(arg.vec)
    }

    static from_bcs_vector < T0 extends TypeArgument > (args: {
        vec: T0[]
    } []): Option < T0 > [] {
        return args.map(function(arg) {
            return new Option(arg.vec)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0 > (T0: BcsType < T0, input0 > ) =>
            bcs_import.struct(`Option<${T0.name}>`, {
                vec: bcs_import.vector(T0),
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new Option(val.vec),
            });
    };
}

function borrow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function swap < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::swap`,
        typeArguments: type_args,
        arguments: args,
    })
}

function contains < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::contains`,
        typeArguments: type_args,
        arguments: args,
    })
}

function none(tx: Transaction, type_args: string[]) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::none`,
        typeArguments: type_args,
        arguments: args,
    })
}

function some < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::some`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_none < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_none`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_some < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_some`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_with_default < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_with_default`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_with_default < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_with_default`,
        typeArguments: type_args,
        arguments: args,
    })
}

function fill < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::fill`,
        typeArguments: type_args,
        arguments: args,
    })
}

function extract < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::extract`,
        typeArguments: type_args,
        arguments: args,
    })
}

function swap_or_fill < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::swap_or_fill`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_with_default < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_with_default`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_some < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_some`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_none < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_none`,
        typeArguments: type_args,
        arguments: args,
    })
}

function to_vec < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Option < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Option < T0 > ).serialize((arg0 as Option < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_vec`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const option = {
    Option,
    borrow,
    borrow_mut,
    swap,
    contains,
    none,
    some,
    is_none,
    is_some,
    borrow_with_default,
    get_with_default,
    fill,
    extract,
    swap_or_fill,
    destroy_with_default,
    destroy_some,
    destroy_none,
    to_vec
}