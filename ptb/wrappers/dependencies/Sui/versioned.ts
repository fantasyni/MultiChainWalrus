import {
    ID,
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
let MODULE_NAME: string = "versioned";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Versioned =============================== */

export class Versioned implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Versioned`;

    id: UID;
    version ? : u64_import;

    constructor(id: UID, version ? : u64_import) {
        this.id = id;
        this.version = version;
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
        return Versioned.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Versioned.from_bcs_vector(args)
    }

    get_bcs() {
        return Versioned.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Versioned(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Versioned(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Versioned`
    }

    from(arg: Versioned) {
        this.id = arg.id;
        this.version = arg.version;
    }

    static from_bcs(arg: {
        id: UID,
        version: u64_import
    }): Versioned {
        return new Versioned(arg.id, arg.version)
    }

    static from_bcs_vector(args: {
        id: UID,
        version: u64_import
    } []): Versioned[] {
        return args.map(function(arg) {
            return new Versioned(arg.id, arg.version)
        })
    }

    static get bcs() {
        return bcs_import.struct("Versioned", {
            id: UID.bcs,
            version: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Versioned(val.id, val.version),
        });
    };
}

/* ============================== VersionChangeCap =============================== */

export class VersionChangeCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::VersionChangeCap`;

    versioned_id: ID;
    old_version: u64_import;

    constructor(versioned_id: ID, old_version: u64_import) {
        this.versioned_id = versioned_id;
        this.old_version = old_version;
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
        return VersionChangeCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return VersionChangeCap.from_bcs_vector(args)
    }

    get_bcs() {
        return VersionChangeCap.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::VersionChangeCap`
    }

    from(arg: VersionChangeCap) {
        this.versioned_id = arg.versioned_id;
        this.old_version = arg.old_version;
    }

    static from_bcs(arg: {
        versioned_id: ID,
        old_version: u64_import
    }): VersionChangeCap {
        return new VersionChangeCap(arg.versioned_id, arg.old_version)
    }

    static from_bcs_vector(args: {
        versioned_id: ID,
        old_version: u64_import
    } []): VersionChangeCap[] {
        return args.map(function(arg) {
            return new VersionChangeCap(arg.versioned_id, arg.old_version)
        })
    }

    static get bcs() {
        return bcs_import.struct("VersionChangeCap", {
            versioned_id: ID.bcs,
            old_version: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new VersionChangeCap(val.versioned_id, val.old_version),
        });
    };
}

export function version(tx: Transaction, arg0: Versioned | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Versioned).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::version`,
        arguments: args,
    })
}

function create < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: u64_import | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import))), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy(tx: Transaction, type_args: string[], arg0: Versioned | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Versioned).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy`,
        typeArguments: type_args,
        arguments: args,
    })
}

function load_value(tx: Transaction, type_args: string[], arg0: Versioned | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Versioned).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::load_value`,
        typeArguments: type_args,
        arguments: args,
    })
}

function load_value_mut(tx: Transaction, type_args: string[], arg0: Versioned | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Versioned).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::load_value_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove_value_for_upgrade(tx: Transaction, type_args: string[], arg0: Versioned | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Versioned).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove_value_for_upgrade`,
        typeArguments: type_args,
        arguments: args,
    })
}

function upgrade < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Versioned | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: T0 | TransactionArgument, arg3: VersionChangeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Versioned).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T0).serialize((arg2 as T0).into_value())), isTransactionArgument(arg3) ? arg3 : tx.pure((arg3 as VersionChangeCap).serialize((arg3 as VersionChangeCap).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::upgrade`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const versioned = {
    Versioned,
    VersionChangeCap,
    version,
    create,
    destroy,
    load_value,
    load_value_mut,
    remove_value_for_upgrade,
    upgrade
}