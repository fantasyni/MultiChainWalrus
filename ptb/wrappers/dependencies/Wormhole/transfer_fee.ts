import {
    DecreeReceipt
} from "./governance_message";
import {
    LatestOnly,
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
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "transfer_fee";

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

/* ============================== TransferFee =============================== */

export class TransferFee implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransferFee`;

    amount: u64_import;
    recipient: string;

    constructor(amount: u64_import, recipient: string) {
        this.amount = amount;
        this.recipient = recipient;
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
        return TransferFee.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransferFee.from_bcs_vector(args)
    }

    get_bcs() {
        return TransferFee.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransferFee`
    }

    from(arg: TransferFee) {
        this.amount = arg.amount;
        this.recipient = arg.recipient;
    }

    static from_bcs(arg: {
        amount: u64_import,
        recipient: string
    }): TransferFee {
        return new TransferFee(arg.amount, arg.recipient)
    }

    static from_bcs_vector(args: {
        amount: u64_import,
        recipient: string
    } []): TransferFee[] {
        return args.map(function(arg) {
            return new TransferFee(arg.amount, arg.recipient)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransferFee", {
            amount: bcs_import.u64(),
            recipient: bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            }),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransferFee(val.amount, val.recipient),
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

export function transfer_fee(tx: Transaction, arg0: State | TransactionArgument, arg1: DecreeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(DecreeReceipt.bcs.serialize((arg1 as DecreeReceipt)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::transfer_fee`,
        arguments: args,
    })
}

export function handle_transfer_fee(tx: Transaction, arg0: LatestOnly | TransactionArgument, arg1: State | TransactionArgument, arg2: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(LatestOnly.bcs.serialize((arg0 as LatestOnly))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::handle_transfer_fee`,
        arguments: args,
    })
}

export const transfer_fee = {
    GovernanceWitness,
    TransferFee,
    deserialize,
    authorize_governance,
    transfer_fee,
    handle_transfer_fee
}