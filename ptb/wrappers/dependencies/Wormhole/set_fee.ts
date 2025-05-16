import {
    DecreeReceipt
} from "./governance_message";
import {
    State
} from "./state";
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
let MODULE_NAME: string = "set_fee";

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

/* ============================== SetFee =============================== */

export class SetFee implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::SetFee`;

    amount: u64_import;

    constructor(amount: u64_import) {
        this.amount = amount;
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
        return SetFee.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return SetFee.from_bcs_vector(args)
    }

    get_bcs() {
        return SetFee.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::SetFee`
    }

    from(arg: SetFee) {
        this.amount = arg.amount;
    }

    static from_bcs(arg: {
        amount: u64_import
    }): SetFee {
        return new SetFee(arg.amount)
    }

    static from_bcs_vector(args: {
        amount: u64_import
    } []): SetFee[] {
        return args.map(function(arg) {
            return new SetFee(arg.amount)
        })
    }

    static get bcs() {
        return bcs_import.struct("SetFee", {
            amount: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new SetFee(val.amount),
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

export function set_fee(tx: Transaction, arg0: State | TransactionArgument, arg1: DecreeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(DecreeReceipt.bcs.serialize((arg1 as DecreeReceipt)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_fee`,
        arguments: args,
    })
}

export const set_fee = {
    GovernanceWitness,
    SetFee,
    deserialize,
    authorize_governance,
    set_fee
}