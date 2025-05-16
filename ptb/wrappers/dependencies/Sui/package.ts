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
let MODULE_NAME: string = "package";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Publisher =============================== */

export class Publisher implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Publisher`;

    id: UID;
    package_ ? : string;
    module_name ? : string;

    constructor(id: UID, package_ ? : string, module_name ? : string) {
        this.id = id;
        this.package_ = package_;
        this.module_name = module_name;
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
        return Publisher.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Publisher.from_bcs_vector(args)
    }

    get_bcs() {
        return Publisher.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Publisher(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Publisher(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Publisher`
    }

    from(arg: Publisher) {
        this.id = arg.id;
        this.package_ = arg.package_;
        this.module_name = arg.module_name;
    }

    static from_bcs(arg: {
        id: UID,
        package_: string,
        module_name: string
    }): Publisher {
        return new Publisher(arg.id, arg.package_, arg.module_name)
    }

    static from_bcs_vector(args: {
        id: UID,
        package_: string,
        module_name: string
    } []): Publisher[] {
        return args.map(function(arg) {
            return new Publisher(arg.id, arg.package_, arg.module_name)
        })
    }

    static get bcs() {
        return bcs_import.struct("Publisher", {
            id: UID.bcs,
            package_: bcs_import.string(),
            module_name: bcs_import.string(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Publisher(val.id, val.package_, val.module_name),
        });
    };
}

/* ============================== UpgradeCap =============================== */

export class UpgradeCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UpgradeCap`;

    id: UID;
    package_ ? : ID;
    version ? : u64_import;
    policy ? : number;

    constructor(id: UID, package_ ? : ID, version ? : u64_import, policy ? : number) {
        this.id = id;
        this.package_ = package_;
        this.version = version;
        this.policy = policy;
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
        return UpgradeCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UpgradeCap.from_bcs_vector(args)
    }

    get_bcs() {
        return UpgradeCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new UpgradeCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new UpgradeCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UpgradeCap`
    }

    from(arg: UpgradeCap) {
        this.id = arg.id;
        this.package_ = arg.package_;
        this.version = arg.version;
        this.policy = arg.policy;
    }

    static from_bcs(arg: {
        id: UID,
        package_: ID,
        version: u64_import,
        policy: number
    }): UpgradeCap {
        return new UpgradeCap(arg.id, arg.package_, arg.version, arg.policy)
    }

    static from_bcs_vector(args: {
        id: UID,
        package_: ID,
        version: u64_import,
        policy: number
    } []): UpgradeCap[] {
        return args.map(function(arg) {
            return new UpgradeCap(arg.id, arg.package_, arg.version, arg.policy)
        })
    }

    static get bcs() {
        return bcs_import.struct("UpgradeCap", {
            id: UID.bcs,
            package_: ID.bcs,
            version: bcs_import.u64(),
            policy: bcs_import.u8(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UpgradeCap(val.id, val.package_, val.version, val.policy),
        });
    };
}

/* ============================== UpgradeTicket =============================== */

export class UpgradeTicket implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UpgradeTicket`;

    cap: ID;
    package_: ID;
    policy: number;
    digest: number[];

    constructor(cap: ID, package_: ID, policy: number, digest: number[]) {
        this.cap = cap;
        this.package_ = package_;
        this.policy = policy;
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
        return UpgradeTicket.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UpgradeTicket.from_bcs_vector(args)
    }

    get_bcs() {
        return UpgradeTicket.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UpgradeTicket`
    }

    from(arg: UpgradeTicket) {
        this.cap = arg.cap;
        this.package_ = arg.package_;
        this.policy = arg.policy;
        this.digest = arg.digest;
    }

    static from_bcs(arg: {
        cap: ID,
        package_: ID,
        policy: number,
        digest: number[]
    }): UpgradeTicket {
        return new UpgradeTicket(arg.cap, arg.package_, arg.policy, arg.digest)
    }

    static from_bcs_vector(args: {
        cap: ID,
        package_: ID,
        policy: number,
        digest: number[]
    } []): UpgradeTicket[] {
        return args.map(function(arg) {
            return new UpgradeTicket(arg.cap, arg.package_, arg.policy, arg.digest)
        })
    }

    static get bcs() {
        return bcs_import.struct("UpgradeTicket", {
            cap: ID.bcs,
            package_: ID.bcs,
            policy: bcs_import.u8(),
            digest: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UpgradeTicket(val.cap, val.package_, val.policy, val.digest),
        });
    };
}

/* ============================== UpgradeReceipt =============================== */

export class UpgradeReceipt implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UpgradeReceipt`;

    cap: ID;
    package_: ID;

    constructor(cap: ID, package_: ID) {
        this.cap = cap;
        this.package_ = package_;
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
        return UpgradeReceipt.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UpgradeReceipt.from_bcs_vector(args)
    }

    get_bcs() {
        return UpgradeReceipt.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UpgradeReceipt`
    }

    from(arg: UpgradeReceipt) {
        this.cap = arg.cap;
        this.package_ = arg.package_;
    }

    static from_bcs(arg: {
        cap: ID,
        package_: ID
    }): UpgradeReceipt {
        return new UpgradeReceipt(arg.cap, arg.package_)
    }

    static from_bcs_vector(args: {
        cap: ID,
        package_: ID
    } []): UpgradeReceipt[] {
        return args.map(function(arg) {
            return new UpgradeReceipt(arg.cap, arg.package_)
        })
    }

    static get bcs() {
        return bcs_import.struct("UpgradeReceipt", {
            cap: ID.bcs,
            package_: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UpgradeReceipt(val.cap, val.package_),
        });
    };
}

export function version(tx: Transaction, arg0: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::version`,
        arguments: args,
    })
}

function claim < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::claim`,
        typeArguments: type_args,
        arguments: args,
    })
}

function claim_and_keep < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::claim_and_keep`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function burn_publisher(tx: Transaction, arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::burn_publisher`,
        arguments: args,
    })
}

function from_package(tx: Transaction, type_args: string[], arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_package`,
        typeArguments: type_args,
        arguments: args,
    })
}

function from_module(tx: Transaction, type_args: string[], arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_module`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function published_module(tx: Transaction, arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::published_module`,
        arguments: args,
    })
}

export function published_package(tx: Transaction, arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::published_package`,
        arguments: args,
    })
}

export function upgrade_package(tx: Transaction, arg0: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::upgrade_package`,
        arguments: args,
    })
}

export function upgrade_policy(tx: Transaction, arg0: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::upgrade_policy`,
        arguments: args,
    })
}

export function ticket_package(tx: Transaction, arg0: UpgradeTicket | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UpgradeTicket.bcs.serialize((arg0 as UpgradeTicket)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::ticket_package`,
        arguments: args,
    })
}

export function ticket_policy(tx: Transaction, arg0: UpgradeTicket | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UpgradeTicket.bcs.serialize((arg0 as UpgradeTicket)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::ticket_policy`,
        arguments: args,
    })
}

export function receipt_cap(tx: Transaction, arg0: UpgradeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UpgradeReceipt.bcs.serialize((arg0 as UpgradeReceipt)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::receipt_cap`,
        arguments: args,
    })
}

export function receipt_package(tx: Transaction, arg0: UpgradeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UpgradeReceipt.bcs.serialize((arg0 as UpgradeReceipt)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::receipt_package`,
        arguments: args,
    })
}

export function ticket_digest(tx: Transaction, arg0: UpgradeTicket | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(UpgradeTicket.bcs.serialize((arg0 as UpgradeTicket)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::ticket_digest`,
        arguments: args,
    })
}

export function compatible_policy(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::compatible_policy`,
        arguments: args,
    })
}

export function additive_policy(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::additive_policy`,
        arguments: args,
    })
}

export function dep_only_policy(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::dep_only_policy`,
        arguments: args,
    })
}

export function only_additive_upgrades(tx: Transaction, arg0: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::only_additive_upgrades`,
        arguments: args,
    })
}

export function only_dep_upgrades(tx: Transaction, arg0: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::only_dep_upgrades`,
        arguments: args,
    })
}

export function make_immutable(tx: Transaction, arg0: UpgradeCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::make_immutable`,
        arguments: args,
    })
}

export function authorize_upgrade(tx: Transaction, arg0: UpgradeCap | TransactionArgument, arg1: number | TransactionArgument, arg2: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authorize_upgrade`,
        arguments: args,
    })
}

export function commit_upgrade(tx: Transaction, arg0: UpgradeCap | TransactionArgument, arg1: UpgradeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(UpgradeReceipt.bcs.serialize((arg1 as UpgradeReceipt)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::commit_upgrade`,
        arguments: args,
    })
}

export function restrict(tx: Transaction, arg0: UpgradeCap | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::restrict`,
        arguments: args,
    })
}

export const package = {
    Publisher,
    UpgradeCap,
    UpgradeTicket,
    UpgradeReceipt,
    version,
    claim,
    claim_and_keep,
    burn_publisher,
    from_package,
    from_module,
    published_module,
    published_package,
    upgrade_package,
    upgrade_policy,
    ticket_package,
    ticket_policy,
    receipt_cap,
    receipt_package,
    ticket_digest,
    compatible_policy,
    additive_policy,
    dep_only_policy,
    only_additive_upgrades,
    only_dep_upgrades,
    make_immutable,
    authorize_upgrade,
    commit_upgrade,
    restrict
}