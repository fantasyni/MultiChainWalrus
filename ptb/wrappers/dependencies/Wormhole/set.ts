import {
    Table
} from "../Sui/table";
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
let MODULE_NAME: string = "set";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Empty =============================== */

export class Empty implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Empty`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
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
        return Empty.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Empty.from_bcs_vector(args)
    }

    get_bcs() {
        return Empty.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Empty`
    }

    from(arg: Empty) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): Empty {
        return new Empty(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): Empty[] {
        return args.map(function(arg) {
            return new Empty(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("Empty", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Empty(val.dummy_field),
        });
    };
}

/* ============================== Set =============================== */

export class Set implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Set`;

    items: Table;

    constructor(items: Table) {
        this.items = items;
    }

    into_value() {
        return {
            items: (this.items as unknown as StructClass).into_value ? (this.items as unknown as StructClass).into_value() : this.items
        }
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
        return Set.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Set.from_bcs_vector(args)
    }

    get_bcs() {
        return Set.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Set`
    }

    from(arg: Set) {
        this.items = arg.items;
    }

    static from_bcs(arg: {
        items: Table
    }): Set {
        return new Set(arg.items)
    }

    static from_bcs_vector(args: {
        items: Table
    } []): Set[] {
        return args.map(function(arg) {
            return new Set(arg.items)
        })
    }

    static get bcs() {
        return bcs_import.struct("Set", {
            items: Table.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Set(val.items),
        });
    };
}

function contains < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Set | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Set).serialize((arg0 as Set).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::contains`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Set | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Set).serialize((arg0 as Set).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_(tx: Transaction, type_args: string[]) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Set | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Set).serialize((arg0 as Set).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const set = {
    Empty,
    Set,
    contains,
    remove,
    new_,
    add
}