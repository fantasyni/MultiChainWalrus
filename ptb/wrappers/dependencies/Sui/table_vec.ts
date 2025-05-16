import {
    Table
} from "./table";
import {
    StructClass,
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
let MODULE_NAME: string = "table_vec";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== TableVec =============================== */

export class TableVec implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TableVec`;

    contents: Table;

    constructor(contents: Table) {
        this.contents = contents;
    }

    into_value() {
        return {
            contents: (this.contents as unknown as StructClass).into_value ? (this.contents as unknown as StructClass).into_value() : this.contents
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
        return TableVec.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TableVec.from_bcs_vector(args)
    }

    get_bcs() {
        return TableVec.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TableVec`
    }

    from(arg: TableVec) {
        this.contents = arg.contents;
    }

    static from_bcs(arg: {
        contents: Table
    }): TableVec {
        return new TableVec(arg.contents)
    }

    static from_bcs_vector(args: {
        contents: Table
    } []): TableVec[] {
        return args.map(function(arg) {
            return new TableVec(arg.contents)
        })
    }

    static get bcs() {
        return bcs_import.struct("TableVec", {
            contents: Table.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TableVec(val.contents),
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

function length < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::length`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function push_back < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_back`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function pop_back < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pop_back`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_empty < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function swap < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u64().serialize((arg2 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::swap`,
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

function is_empty < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function swap_remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::swap_remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function drop < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TableVec | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TableVec).serialize((arg0 as TableVec).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::drop`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const table_vec = {
    TableVec,
    empty,
    length,
    borrow,
    push_back,
    borrow_mut,
    pop_back,
    destroy_empty,
    swap,
    singleton,
    is_empty,
    swap_remove,
    drop
}