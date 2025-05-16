import {
    Option
} from "../MoveStdlib/option";
import {
    ID
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
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "borrow";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Referent =============================== */

export class Referent < T0 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Referent`;

    id: string;
    value: Option < T0 > ;

    T0_bcs: any;

    constructor(id: string, value: Option < T0 > ) {
        this.id = id;
        this.value = value;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            value: (this.value as unknown as StructClass).into_value ? (this.value as unknown as StructClass).into_value() : this.value
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.value) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return Referent.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Referent.from_bcs_vector(args)
    }

    get_bcs() {
        return Referent.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Referent`
    }

    from(arg: Referent < T0 > ) {
        this.id = arg.id;
        this.value = arg.value;
    }

    static from_bcs < T0 extends TypeArgument > (arg: {
        id: string,
        value: Option < T0 >
    }): Referent < T0 > {
        return new Referent(arg.id, arg.value)
    }

    static from_bcs_vector < T0 extends TypeArgument > (args: {
        id: string,
        value: Option < T0 >
    } []): Referent < T0 > [] {
        return args.map(function(arg) {
            return new Referent(arg.id, arg.value)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0 > (T0: BcsType < T0, input0 > ) =>
            bcs_import.struct(`Referent<${T0.name}>`, {
                id: bcs_import.bytes(32).transform({
                    input: (val: string) => fromHEX(val),
                    output: (val: Uint8Array) => toHEX(val),
                }),
                value: Option.bcs(T0),
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new Referent(val.id, val.value),
            });
    };
}

/* ============================== Borrow =============================== */

export class Borrow implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Borrow`;

    ref: string;
    obj: ID;

    constructor(ref: string, obj: ID) {
        this.ref = ref;
        this.obj = obj;
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
        return Borrow.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Borrow.from_bcs_vector(args)
    }

    get_bcs() {
        return Borrow.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Borrow`
    }

    from(arg: Borrow) {
        this.ref = arg.ref;
        this.obj = arg.obj;
    }

    static from_bcs(arg: {
        ref: string,
        obj: ID
    }): Borrow {
        return new Borrow(arg.ref, arg.obj)
    }

    static from_bcs_vector(args: {
        ref: string,
        obj: ID
    } []): Borrow[] {
        return args.map(function(arg) {
            return new Borrow(arg.ref, arg.obj)
        })
    }

    static get bcs() {
        return bcs_import.struct("Borrow", {
            ref: bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            }),
            obj: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Borrow(val.ref, val.obj),
        });
    };
}

function borrow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Referent < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Referent < T0 > ).serialize((arg0 as Referent < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_ < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        typeArguments: type_args,
        arguments: args,
    })
}

function put_back < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Referent < T0 > | TransactionArgument, arg1: T0 | TransactionArgument, arg2: Borrow | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Referent < T0 > ).serialize((arg0 as Referent < T0 > ).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Borrow).serialize((arg2 as Borrow).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::put_back`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Referent < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Referent < T0 > ).serialize((arg0 as Referent < T0 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const borrow = {
    Referent,
    Borrow,
    borrow,
    new_,
    put_back,
    destroy
}