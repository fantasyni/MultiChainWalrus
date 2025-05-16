import {
    ID,
    UID
} from "../Sui/object";
import {
    UpgradeCap,
    UpgradeReceipt
} from "../Sui/package";
import {
    Bytes32
} from "./bytes32";
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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "package_utils";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== CurrentVersion =============================== */

export class CurrentVersion implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::CurrentVersion`;

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
        return CurrentVersion.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return CurrentVersion.from_bcs_vector(args)
    }

    get_bcs() {
        return CurrentVersion.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::CurrentVersion`
    }

    from(arg: CurrentVersion) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): CurrentVersion {
        return new CurrentVersion(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): CurrentVersion[] {
        return args.map(function(arg) {
            return new CurrentVersion(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("CurrentVersion", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new CurrentVersion(val.dummy_field),
        });
    };
}

/* ============================== CurrentPackage =============================== */

export class CurrentPackage implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::CurrentPackage`;

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
        return CurrentPackage.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return CurrentPackage.from_bcs_vector(args)
    }

    get_bcs() {
        return CurrentPackage.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::CurrentPackage`
    }

    from(arg: CurrentPackage) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): CurrentPackage {
        return new CurrentPackage(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): CurrentPackage[] {
        return args.map(function(arg) {
            return new CurrentPackage(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("CurrentPackage", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new CurrentPackage(val.dummy_field),
        });
    };
}

/* ============================== PendingPackage =============================== */

export class PendingPackage implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::PendingPackage`;

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
        return PendingPackage.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return PendingPackage.from_bcs_vector(args)
    }

    get_bcs() {
        return PendingPackage.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::PendingPackage`
    }

    from(arg: PendingPackage) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): PendingPackage {
        return new PendingPackage(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): PendingPackage[] {
        return args.map(function(arg) {
            return new PendingPackage(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("PendingPackage", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new PendingPackage(val.dummy_field),
        });
    };
}

/* ============================== PackageInfo =============================== */

export class PackageInfo implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::PackageInfo`;

    package_: ID;
    digest: Bytes32;

    constructor(package_: ID, digest: Bytes32) {
        this.package_ = package_;
        this.digest = digest;
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
        return PackageInfo.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return PackageInfo.from_bcs_vector(args)
    }

    get_bcs() {
        return PackageInfo.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::PackageInfo`
    }

    from(arg: PackageInfo) {
        this.package_ = arg.package_;
        this.digest = arg.digest;
    }

    static from_bcs(arg: {
        package_: ID,
        digest: Bytes32
    }): PackageInfo {
        return new PackageInfo(arg.package_, arg.digest)
    }

    static from_bcs_vector(args: {
        package_: ID,
        digest: Bytes32
    } []): PackageInfo[] {
        return args.map(function(arg) {
            return new PackageInfo(arg.package_, arg.digest)
        })
    }

    static get bcs() {
        return bcs_import.struct("PackageInfo", {
            package_: ID.bcs,
            digest: Bytes32.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new PackageInfo(val.package_, val.digest),
        });
    };
}

export function authorize_upgrade(tx: Transaction, arg0: UID | TransactionArgument, arg1: UpgradeCap | TransactionArgument, arg2: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as UpgradeCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(Bytes32.bcs.serialize((arg2 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authorize_upgrade`,
        arguments: args,
    })
}

export function commit_upgrade(tx: Transaction, arg0: UID | TransactionArgument, arg1: UpgradeCap | TransactionArgument, arg2: UpgradeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as UpgradeCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(UpgradeReceipt.bcs.serialize((arg2 as UpgradeReceipt)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::commit_upgrade`,
        arguments: args,
    })
}

export function current_package(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::current_package`,
        arguments: args,
    })
}

export function current_digest(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::current_digest`,
        arguments: args,
    })
}

export function committed_package(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::committed_package`,
        arguments: args,
    })
}

export function authorized_digest(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authorized_digest`,
        arguments: args,
    })
}

function assert_package_upgrade_cap(tx: Transaction, type_args: string[], arg0: UpgradeCap | TransactionArgument, arg1: number | TransactionArgument, arg2: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u64().serialize((arg2 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::assert_package_upgrade_cap`,
        typeArguments: type_args,
        arguments: args,
    })
}

function assert_version < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::assert_version`,
        typeArguments: type_args,
        arguments: args,
    })
}

function type_of_version < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::type_of_version`,
        typeArguments: type_args,
        arguments: args,
    })
}

function init_package_info < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument, arg2: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::init_package_info`,
        typeArguments: type_args,
        arguments: args,
    })
}

function migrate_version < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument, arg2: T1 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::migrate_version`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function set_commited_package(tx: Transaction, arg0: UID | TransactionArgument, arg1: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_commited_package`,
        arguments: args,
    })
}

export function set_authorized_digest(tx: Transaction, arg0: UID | TransactionArgument, arg1: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID))), isTransactionArgument(arg1) ? arg1 : tx.pure(Bytes32.bcs.serialize((arg1 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_authorized_digest`,
        arguments: args,
    })
}

export function update_package_info_from_pending(tx: Transaction, arg0: UID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UID.bcs.serialize((arg0 as UID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_package_info_from_pending`,
        arguments: args,
    })
}

function update_version_type < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: UID | TransactionArgument, arg1: T0 | TransactionArgument, arg2: T1 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as UID).serialize((arg0 as UID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_version_type`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const package_utils = {
    CurrentVersion,
    CurrentPackage,
    PendingPackage,
    PackageInfo,
    authorize_upgrade,
    commit_upgrade,
    current_package,
    current_digest,
    committed_package,
    authorized_digest,
    assert_package_upgrade_cap,
    assert_version,
    type_of_version,
    init_package_info,
    migrate_version,
    set_commited_package,
    set_authorized_digest,
    update_package_info_from_pending,
    update_version_type
}