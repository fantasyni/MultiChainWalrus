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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "cursor";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Cursor =============================== */

export class Cursor < T0 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Cursor`;

    data: T0[];

    T0_bcs: any;

    constructor(data: T0[]) {
        this.data = data;
    }

    into_value() {
        return {
            data: into_arr_value(this.data)
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.data) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.data) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.data) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.data) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.data) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return Cursor.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Cursor.from_bcs_vector(args)
    }

    get_bcs() {
        return Cursor.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Cursor`
    }

    from(arg: Cursor < T0 > ) {
        this.data = arg.data;
    }

    static from_bcs < T0 extends TypeArgument > (arg: {
        data: T0[]
    }): Cursor < T0 > {
        return new Cursor(arg.data)
    }

    static from_bcs_vector < T0 extends TypeArgument > (args: {
        data: T0[]
    } []): Cursor < T0 > [] {
        return args.map(function(arg) {
            return new Cursor(arg.data)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0 > (T0: BcsType < T0, input0 > ) =>
            bcs_import.struct(`Cursor<${T0.name}>`, {
                data: bcs_import.vector(T0),
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new Cursor(val.data),
            });
    };
}

function destroy_empty < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Cursor < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Cursor < T0 > ).serialize((arg0 as Cursor < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_empty < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Cursor < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Cursor < T0 > ).serialize((arg0 as Cursor < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_ < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(has_arr(arg0) ? into_arr_bcs_vector((arg0 as T0[])).serialize(into_arr_value((arg0 as T0[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        typeArguments: type_args,
        arguments: args,
    })
}

function data < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Cursor < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Cursor < T0 > ).serialize((arg0 as Cursor < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::data`,
        typeArguments: type_args,
        arguments: args,
    })
}

function take_rest < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Cursor < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Cursor < T0 > ).serialize((arg0 as Cursor < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_rest`,
        typeArguments: type_args,
        arguments: args,
    })
}

function poke < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Cursor < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Cursor < T0 > ).serialize((arg0 as Cursor < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::poke`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const cursor = {
    Cursor,
    destroy_empty,
    is_empty,
    new_,
    data,
    take_rest,
    poke
}