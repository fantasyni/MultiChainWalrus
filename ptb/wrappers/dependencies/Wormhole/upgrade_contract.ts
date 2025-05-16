import {
    ID
} from "../Sui/object";
import {
    UpgradeReceipt
} from "../Sui/package";
import {
    Bytes32
} from "./bytes32";
import {
    DecreeReceipt
} from "./governance_message";
import {
    State
} from "./state";
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
let MODULE_NAME: string = "upgrade_contract";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== GovernanceWitness =============================== */

export class GovernanceWitness implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::GovernanceWitness`;

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
        return GovernanceWitness.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return GovernanceWitness.from_bcs_vector(args)
    }

    get_bcs() {
        return GovernanceWitness.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::GovernanceWitness`
    }

    from(arg: GovernanceWitness) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): GovernanceWitness {
        return new GovernanceWitness(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): GovernanceWitness[] {
        return args.map(function(arg) {
            return new GovernanceWitness(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("GovernanceWitness", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new GovernanceWitness(val.dummy_field),
        });
    };
}

/* ============================== ContractUpgraded =============================== */

export class ContractUpgraded implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ContractUpgraded`;

    old_contract: ID;
    new_contract: ID;

    constructor(old_contract: ID, new_contract: ID) {
        this.old_contract = old_contract;
        this.new_contract = new_contract;
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
        return ContractUpgraded.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ContractUpgraded.from_bcs_vector(args)
    }

    get_bcs() {
        return ContractUpgraded.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ContractUpgraded`
    }

    from(arg: ContractUpgraded) {
        this.old_contract = arg.old_contract;
        this.new_contract = arg.new_contract;
    }

    static from_bcs(arg: {
        old_contract: ID,
        new_contract: ID
    }): ContractUpgraded {
        return new ContractUpgraded(arg.old_contract, arg.new_contract)
    }

    static from_bcs_vector(args: {
        old_contract: ID,
        new_contract: ID
    } []): ContractUpgraded[] {
        return args.map(function(arg) {
            return new ContractUpgraded(arg.old_contract, arg.new_contract)
        })
    }

    static get bcs() {
        return bcs_import.struct("ContractUpgraded", {
            old_contract: ID.bcs,
            new_contract: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ContractUpgraded(val.old_contract, val.new_contract),
        });
    };
}

/* ============================== UpgradeContract =============================== */

export class UpgradeContract implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UpgradeContract`;

    digest: Bytes32;

    constructor(digest: Bytes32) {
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
        return UpgradeContract.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UpgradeContract.from_bcs_vector(args)
    }

    get_bcs() {
        return UpgradeContract.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UpgradeContract`
    }

    from(arg: UpgradeContract) {
        this.digest = arg.digest;
    }

    static from_bcs(arg: {
        digest: Bytes32
    }): UpgradeContract {
        return new UpgradeContract(arg.digest)
    }

    static from_bcs_vector(args: {
        digest: Bytes32
    } []): UpgradeContract[] {
        return args.map(function(arg) {
            return new UpgradeContract(arg.digest)
        })
    }

    static get bcs() {
        return bcs_import.struct("UpgradeContract", {
            digest: Bytes32.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UpgradeContract(val.digest),
        });
    };
}

export function authorize_upgrade(tx: Transaction, arg0: State | TransactionArgument, arg1: DecreeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(DecreeReceipt.bcs.serialize((arg1 as DecreeReceipt)))
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

export function deserialize(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deserialize`,
        arguments: args,
    })
}

export function authorize_governance(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authorize_governance`,
        arguments: args,
    })
}

export function take_digest(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_digest`,
        arguments: args,
    })
}

export function handle_upgrade_contract(tx: Transaction, arg0: State | TransactionArgument, arg1: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::handle_upgrade_contract`,
        arguments: args,
    })
}

export const upgrade_contract = {
    GovernanceWitness,
    ContractUpgraded,
    UpgradeContract,
    authorize_upgrade,
    commit_upgrade,
    deserialize,
    authorize_governance,
    take_digest,
    handle_upgrade_contract
}