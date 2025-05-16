import {
    Balance
} from "../Sui/balance";
import {
    Clock
} from "../Sui/clock";
import {
    UID
} from "../Sui/object";
import {
    UpgradeCap,
    UpgradeReceipt
} from "../Sui/package";
import {
    Table
} from "../Sui/table";
import {
    Bytes32
} from "./bytes32";
import {
    ConsumedVAAs
} from "./consumed_vaas";
import {
    ExternalAddress
} from "./external_address";
import {
    FeeCollector
} from "./fee_collector";
import {
    Guardian
} from "./guardian";
import {
    GuardianSet
} from "./guardian_set";
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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "state";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== LatestOnly =============================== */

export class LatestOnly implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::LatestOnly`;

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
        return LatestOnly.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return LatestOnly.from_bcs_vector(args)
    }

    get_bcs() {
        return LatestOnly.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::LatestOnly`
    }

    from(arg: LatestOnly) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): LatestOnly {
        return new LatestOnly(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): LatestOnly[] {
        return args.map(function(arg) {
            return new LatestOnly(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("LatestOnly", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new LatestOnly(val.dummy_field),
        });
    };
}

/* ============================== State =============================== */

export class State implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::State`;

    id: UID;
    governance_chain ? : number;
    governance_contract ? : ExternalAddress;
    guardian_set_index ? : number;
    guardian_sets ? : Table;
    guardian_set_seconds_to_live ? : number;
    consumed_vaas ? : ConsumedVAAs;
    fee_collector ? : FeeCollector;
    upgrade_cap ? : UpgradeCap;

    constructor(id: UID, governance_chain ? : number, governance_contract ? : ExternalAddress, guardian_set_index ? : number, guardian_sets ? : Table, guardian_set_seconds_to_live ? : number, consumed_vaas ? : ConsumedVAAs, fee_collector ? : FeeCollector, upgrade_cap ? : UpgradeCap) {
        this.id = id;
        this.governance_chain = governance_chain;
        this.governance_contract = governance_contract;
        this.guardian_set_index = guardian_set_index;
        this.guardian_sets = guardian_sets;
        this.guardian_set_seconds_to_live = guardian_set_seconds_to_live;
        this.consumed_vaas = consumed_vaas;
        this.fee_collector = fee_collector;
        this.upgrade_cap = upgrade_cap;
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
        return State.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return State.from_bcs_vector(args)
    }

    get_bcs() {
        return State.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new State(UID.from_id(id));
    }

    static from_id(id: string) {
        return new State(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::State`
    }

    from(arg: State) {
        this.id = arg.id;
        this.governance_chain = arg.governance_chain;
        this.governance_contract = arg.governance_contract;
        this.guardian_set_index = arg.guardian_set_index;
        this.guardian_sets = arg.guardian_sets;
        this.guardian_set_seconds_to_live = arg.guardian_set_seconds_to_live;
        this.consumed_vaas = arg.consumed_vaas;
        this.fee_collector = arg.fee_collector;
        this.upgrade_cap = arg.upgrade_cap;
    }

    static from_bcs(arg: {
        id: UID,
        governance_chain: number,
        governance_contract: ExternalAddress,
        guardian_set_index: number,
        guardian_sets: Table,
        guardian_set_seconds_to_live: number,
        consumed_vaas: ConsumedVAAs,
        fee_collector: FeeCollector,
        upgrade_cap: UpgradeCap
    }): State {
        return new State(arg.id, arg.governance_chain, arg.governance_contract, arg.guardian_set_index, arg.guardian_sets, arg.guardian_set_seconds_to_live, arg.consumed_vaas, arg.fee_collector, arg.upgrade_cap)
    }

    static from_bcs_vector(args: {
        id: UID,
        governance_chain: number,
        governance_contract: ExternalAddress,
        guardian_set_index: number,
        guardian_sets: Table,
        guardian_set_seconds_to_live: number,
        consumed_vaas: ConsumedVAAs,
        fee_collector: FeeCollector,
        upgrade_cap: UpgradeCap
    } []): State[] {
        return args.map(function(arg) {
            return new State(arg.id, arg.governance_chain, arg.governance_contract, arg.guardian_set_index, arg.guardian_sets, arg.guardian_set_seconds_to_live, arg.consumed_vaas, arg.fee_collector, arg.upgrade_cap)
        })
    }

    static get bcs() {
        return bcs_import.struct("State", {
            id: UID.bcs,
            governance_chain: bcs_import.u16(),
            governance_contract: ExternalAddress.bcs,
            guardian_set_index: bcs_import.u32(),
            guardian_sets: Table.bcs,
            guardian_set_seconds_to_live: bcs_import.u32(),
            consumed_vaas: ConsumedVAAs.bcs,
            fee_collector: FeeCollector.bcs,
            upgrade_cap: UpgradeCap.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new State(val.id, val.governance_chain, val.governance_contract, val.guardian_set_index, val.guardian_sets, val.guardian_set_seconds_to_live, val.consumed_vaas, val.fee_collector, val.upgrade_cap),
        });
    };
}

export function new_(tx: Transaction, arg0: UpgradeCap | TransactionArgument, arg1: number | TransactionArgument, arg2: ExternalAddress | TransactionArgument, arg3: number | TransactionArgument, arg4: Guardian[] | TransactionArgument, arg5: number | TransactionArgument, arg6: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as UpgradeCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(ExternalAddress.bcs.serialize((arg2 as ExternalAddress))), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.u32().serialize((arg3 as number))), isTransactionArgument(arg4) ? arg4 : tx.pure(bcs_import.vector(Guardian.bcs).serialize((arg4 as Guardian[]))), isTransactionArgument(arg5) ? arg5 : tx.pure(bcs_import.u32().serialize((arg5 as number))), isTransactionArgument(arg6) ? arg6 : tx.pure(bcs_import.u64().serialize((arg6 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function authorize_upgrade(tx: Transaction, arg0: State | TransactionArgument, arg1: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(Bytes32.bcs.serialize((arg1 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authorize_upgrade`,
        arguments: args,
    })
}

export function commit_upgrade(tx: Transaction, arg0: State | TransactionArgument, arg1: UpgradeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(UpgradeReceipt.bcs.serialize((arg1 as UpgradeReceipt)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::commit_upgrade`,
        arguments: args,
    })
}

export function current_package(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::current_package`,
        arguments: args,
    })
}

export function migrate_version(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::migrate_version`,
        arguments: args,
    })
}

export function chain_id(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::chain_id`,
        arguments: args,
    })
}

export function governance_module(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::governance_module`,
        arguments: args,
    })
}

export function governance_chain(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::governance_chain`,
        arguments: args,
    })
}

export function governance_contract(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::governance_contract`,
        arguments: args,
    })
}

export function guardian_set_index(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::guardian_set_index`,
        arguments: args,
    })
}

export function guardian_set_seconds_to_live(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::guardian_set_seconds_to_live`,
        arguments: args,
    })
}

export function guardian_set_at(tx: Transaction, arg0: State | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u32().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::guardian_set_at`,
        arguments: args,
    })
}

export function message_fee(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::message_fee`,
        arguments: args,
    })
}

export function assert_latest_only(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::assert_latest_only`,
        arguments: args,
    })
}

export function deposit_fee(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(Balance.bcs.serialize((arg2 as Balance)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deposit_fee`,
        arguments: args,
    })
}

export function withdraw_fee(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u64().serialize((arg2 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::withdraw_fee`,
        arguments: args,
    })
}

export function borrow_mut_consumed_vaas(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut_consumed_vaas`,
        arguments: args,
    })
}

export function borrow_mut_consumed_vaas_unchecked(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut_consumed_vaas_unchecked`,
        arguments: args,
    })
}

export function expire_guardian_set(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::expire_guardian_set`,
        arguments: args,
    })
}

export function add_new_guardian_set(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: GuardianSet | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(GuardianSet.bcs.serialize((arg2 as GuardianSet)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_new_guardian_set`,
        arguments: args,
    })
}

export function set_message_fee(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u64().serialize((arg2 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_message_fee`,
        arguments: args,
    })
}

export function assert_authorized_digest(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(Bytes32.bcs.serialize((arg2 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::assert_authorized_digest`,
        arguments: args,
    })
}

export function migrate__v__0_2_0(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::migrate__v__0_2_0`,
        arguments: args,
    })
}

export const state = {
    LatestOnly,
    State,
    new_,
    authorize_upgrade,
    commit_upgrade,
    current_package,
    migrate_version,
    chain_id,
    governance_module,
    governance_chain,
    governance_contract,
    guardian_set_index,
    guardian_set_seconds_to_live,
    guardian_set_at,
    message_fee,
    assert_latest_only,
    deposit_fee,
    withdraw_fee,
    borrow_mut_consumed_vaas,
    borrow_mut_consumed_vaas_unchecked,
    expire_guardian_set,
    add_new_guardian_set,
    set_message_fee,
    assert_authorized_digest,
    migrate__v__0_2_0
}