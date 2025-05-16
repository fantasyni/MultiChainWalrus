import {
    Bag
} from "./bag";
import {
    Kiosk,
    KioskOwnerCap
} from "./kiosk";
import {
    TransferPolicy
} from "./transfer_policy";
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
let MODULE_NAME: string = "kiosk_extension";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Extension =============================== */

export class Extension implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Extension`;

    storage: Bag;
    permissions: u64_import;
    is_enabled: boolean;

    constructor(storage: Bag, permissions: u64_import, is_enabled: boolean) {
        this.storage = storage;
        this.permissions = permissions;
        this.is_enabled = is_enabled;
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
        return Extension.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Extension.from_bcs_vector(args)
    }

    get_bcs() {
        return Extension.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Extension`
    }

    from(arg: Extension) {
        this.storage = arg.storage;
        this.permissions = arg.permissions;
        this.is_enabled = arg.is_enabled;
    }

    static from_bcs(arg: {
        storage: Bag,
        permissions: u64_import,
        is_enabled: boolean
    }): Extension {
        return new Extension(arg.storage, arg.permissions, arg.is_enabled)
    }

    static from_bcs_vector(args: {
        storage: Bag,
        permissions: u64_import,
        is_enabled: boolean
    } []): Extension[] {
        return args.map(function(arg) {
            return new Extension(arg.storage, arg.permissions, arg.is_enabled)
        })
    }

    static get bcs() {
        return bcs_import.struct("Extension", {
            storage: Bag.bcs,
            permissions: bcs_import.u128(),
            is_enabled: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Extension(val.storage, val.permissions, val.is_enabled),
        });
    };
}

/* ============================== ExtensionKey =============================== */

export class ExtensionKey implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ExtensionKey`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
    }

    into_value() {
        return {
            dummy_field: (this.dummy_field as unknown as StructClass).into_value ? (this.dummy_field as unknown as StructClass).into_value() : this.dummy_field
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
        return ExtensionKey.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ExtensionKey.from_bcs_vector(args)
    }

    get_bcs() {
        return ExtensionKey.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ExtensionKey`
    }

    from(arg: ExtensionKey) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): ExtensionKey {
        return new ExtensionKey(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): ExtensionKey[] {
        return args.map(function(arg) {
            return new ExtensionKey(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("ExtensionKey", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ExtensionKey(val.dummy_field),
        });
    };
}

function remove(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: Kiosk | TransactionArgument, arg2: KioskOwnerCap | TransactionArgument, arg3: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Kiosk).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as KioskOwnerCap).$id()), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.u128().serialize((arg3 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function place < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: Kiosk | TransactionArgument, arg2: T1 | TransactionArgument, arg3: TransferPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Kiosk).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value())), isTransactionArgument(arg3) ? arg3 : tx.object((arg3 as TransferPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::place`,
        typeArguments: type_args,
        arguments: args,
    })
}

function lock < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: Kiosk | TransactionArgument, arg2: T1 | TransactionArgument, arg3: TransferPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Kiosk).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value())), isTransactionArgument(arg3) ? arg3 : tx.object((arg3 as TransferPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::lock`,
        typeArguments: type_args,
        arguments: args,
    })
}

function disable(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::disable`,
        typeArguments: type_args,
        arguments: args,
    })
}

function enable(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::enable`,
        typeArguments: type_args,
        arguments: args,
    })
}

function storage < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::storage`,
        typeArguments: type_args,
        arguments: args,
    })
}

function storage_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::storage_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_installed(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_installed`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_enabled(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_enabled`,
        typeArguments: type_args,
        arguments: args,
    })
}

function can_place(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::can_place`,
        typeArguments: type_args,
        arguments: args,
    })
}

function can_lock(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::can_lock`,
        typeArguments: type_args,
        arguments: args,
    })
}

function extension(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::extension`,
        typeArguments: type_args,
        arguments: args,
    })
}

function extension_mut(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::extension_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const kiosk_extension = {
    Extension,
    ExtensionKey,
    remove,
    add,
    place,
    lock,
    disable,
    enable,
    storage,
    storage_mut,
    is_installed,
    is_enabled,
    can_place,
    can_lock,
    extension,
    extension_mut
}