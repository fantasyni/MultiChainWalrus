import {
    Clock
} from "../Sui/clock";
import {
    DecreeReceipt
} from "./governance_message";
import {
    Guardian
} from "./guardian";
import {
    LatestOnly,
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
let MODULE_NAME: string = "update_guardian_set";

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

/* ============================== GuardianSetAdded =============================== */

export class GuardianSetAdded implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::GuardianSetAdded`;

    new_index: number;

    constructor(new_index: number) {
        this.new_index = new_index;
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
        return GuardianSetAdded.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return GuardianSetAdded.from_bcs_vector(args)
    }

    get_bcs() {
        return GuardianSetAdded.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::GuardianSetAdded`
    }

    from(arg: GuardianSetAdded) {
        this.new_index = arg.new_index;
    }

    static from_bcs(arg: {
        new_index: number
    }): GuardianSetAdded {
        return new GuardianSetAdded(arg.new_index)
    }

    static from_bcs_vector(args: {
        new_index: number
    } []): GuardianSetAdded[] {
        return args.map(function(arg) {
            return new GuardianSetAdded(arg.new_index)
        })
    }

    static get bcs() {
        return bcs_import.struct("GuardianSetAdded", {
            new_index: bcs_import.u32(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new GuardianSetAdded(val.new_index),
        });
    };
}

/* ============================== UpdateGuardianSet =============================== */

export class UpdateGuardianSet implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UpdateGuardianSet`;

    new_index: number;
    guardians: Guardian[];

    constructor(new_index: number, guardians: Guardian[]) {
        this.new_index = new_index;
        this.guardians = guardians;
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
        return UpdateGuardianSet.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UpdateGuardianSet.from_bcs_vector(args)
    }

    get_bcs() {
        return UpdateGuardianSet.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UpdateGuardianSet`
    }

    from(arg: UpdateGuardianSet) {
        this.new_index = arg.new_index;
        this.guardians = arg.guardians;
    }

    static from_bcs(arg: {
        new_index: number,
        guardians: Guardian[]
    }): UpdateGuardianSet {
        return new UpdateGuardianSet(arg.new_index, arg.guardians)
    }

    static from_bcs_vector(args: {
        new_index: number,
        guardians: Guardian[]
    } []): UpdateGuardianSet[] {
        return args.map(function(arg) {
            return new UpdateGuardianSet(arg.new_index, arg.guardians)
        })
    }

    static get bcs() {
        return bcs_import.struct("UpdateGuardianSet", {
            new_index: bcs_import.u32(),
            guardians: bcs_import.vector(Guardian.bcs),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UpdateGuardianSet(val.new_index, val.guardians),
        });
    };
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

export function update_guardian_set(tx: Transaction, arg0: State | TransactionArgument, arg1: DecreeReceipt | TransactionArgument, arg2: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(DecreeReceipt.bcs.serialize((arg1 as DecreeReceipt))), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_guardian_set`,
        arguments: args,
    })
}

export function handle_update_guardian_set(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: number[] | TransactionArgument, arg3: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[]))), isTransactionArgument(arg3) ? arg3 : tx.object((arg3 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::handle_update_guardian_set`,
        arguments: args,
    })
}

export const update_guardian_set = {
    GovernanceWitness,
    GuardianSetAdded,
    UpdateGuardianSet,
    deserialize,
    authorize_governance,
    update_guardian_set,
    handle_update_guardian_set
}