import {
    ID,
    UID
} from "./object";
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
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "transfer";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Receiving =============================== */

export class Receiving implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Receiving`;

    id: ID;
    version: u64_import;

    constructor(id: ID, version: u64_import) {
        this.id = id;
        this.version = version;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            version: (this.version as unknown as StructClass).into_value ? (this.version as unknown as StructClass).into_value() : this.version
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
        return Receiving.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Receiving.from_bcs_vector(args)
    }

    get_bcs() {
        return Receiving.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Receiving`
    }

    from(arg: Receiving) {
        this.id = arg.id;
        this.version = arg.version;
    }

    static from_bcs(arg: {
        id: ID,
        version: u64_import
    }): Receiving {
        return new Receiving(arg.id, arg.version)
    }

    static from_bcs_vector(args: {
        id: ID,
        version: u64_import
    } []): Receiving[] {
        return args.map(function(arg) {
            return new Receiving(arg.id, arg.version)
        })
    }

    static get bcs() {
        return bcs_import.struct("Receiving", {
            id: ID.bcs,
            version: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Receiving(val.id, val.version),
        });
    };
}

function transfer < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::transfer`,
        typeArguments: type_args,
        arguments: args,
    })
}

function public_transfer < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::public_transfer`,
        typeArguments: type_args,
        arguments: args,
    })
}

function freeze_object < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::freeze_object`,
        typeArguments: type_args,
        arguments: args,
    })
}

function public_freeze_object < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::public_freeze_object`,
        typeArguments: type_args,
        arguments: args,
    })
}

function share_object < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::share_object`,
        typeArguments: type_args,
        arguments: args,
    })
}

function public_share_object < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::public_share_object`,
        typeArguments: type_args,
        arguments: args,
    })
}

function receive < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: Receiving | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Receiving).serialize((arg1 as Receiving).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::receive`,
        typeArguments: type_args,
        arguments: args,
    })
}

function public_receive < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: Receiving | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Receiving).serialize((arg1 as Receiving).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::public_receive`,
        typeArguments: type_args,
        arguments: args,
    })
}

function receiving_object_id < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Receiving | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Receiving).serialize((arg0 as Receiving).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::receiving_object_id`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const transfer = {
    Receiving,
    transfer,
    public_transfer,
    freeze_object,
    public_freeze_object,
    share_object,
    public_share_object,
    receive,
    public_receive,
    receiving_object_id
}