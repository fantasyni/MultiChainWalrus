import {
    Clock
} from "../Sui/clock";
import {
    Guardian
} from "./guardian";
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
let MODULE_NAME: string = "guardian_set";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== GuardianSet =============================== */

export class GuardianSet implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::GuardianSet`;

    index: number;
    guardians: Guardian[];
    expiration_timestamp_ms: u64_import;

    constructor(index: number, guardians: Guardian[], expiration_timestamp_ms: u64_import) {
        this.index = index;
        this.guardians = guardians;
        this.expiration_timestamp_ms = expiration_timestamp_ms;
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
        return GuardianSet.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return GuardianSet.from_bcs_vector(args)
    }

    get_bcs() {
        return GuardianSet.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::GuardianSet`
    }

    from(arg: GuardianSet) {
        this.index = arg.index;
        this.guardians = arg.guardians;
        this.expiration_timestamp_ms = arg.expiration_timestamp_ms;
    }

    static from_bcs(arg: {
        index: number,
        guardians: Guardian[],
        expiration_timestamp_ms: u64_import
    }): GuardianSet {
        return new GuardianSet(arg.index, arg.guardians, arg.expiration_timestamp_ms)
    }

    static from_bcs_vector(args: {
        index: number,
        guardians: Guardian[],
        expiration_timestamp_ms: u64_import
    } []): GuardianSet[] {
        return args.map(function(arg) {
            return new GuardianSet(arg.index, arg.guardians, arg.expiration_timestamp_ms)
        })
    }

    static get bcs() {
        return bcs_import.struct("GuardianSet", {
            index: bcs_import.u32(),
            guardians: bcs_import.vector(Guardian.bcs),
            expiration_timestamp_ms: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new GuardianSet(val.index, val.guardians, val.expiration_timestamp_ms),
        });
    };
}

export function new_(tx: Transaction, arg0: number | TransactionArgument, arg1: Guardian[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u32().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(Guardian.bcs).serialize((arg1 as Guardian[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function index(tx: Transaction, arg0: GuardianSet | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::index`,
        arguments: args,
    })
}

export function index_as_u64(tx: Transaction, arg0: GuardianSet | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::index_as_u64`,
        arguments: args,
    })
}

export function guardians(tx: Transaction, arg0: GuardianSet | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::guardians`,
        arguments: args,
    })
}

export function guardian_at(tx: Transaction, arg0: GuardianSet | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::guardian_at`,
        arguments: args,
    })
}

export function expiration_timestamp_ms(tx: Transaction, arg0: GuardianSet | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::expiration_timestamp_ms`,
        arguments: args,
    })
}

export function is_active(tx: Transaction, arg0: GuardianSet | TransactionArgument, arg1: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_active`,
        arguments: args,
    })
}

export function num_guardians(tx: Transaction, arg0: GuardianSet | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::num_guardians`,
        arguments: args,
    })
}

export function quorum(tx: Transaction, arg0: GuardianSet | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::quorum`,
        arguments: args,
    })
}

export function set_expiration(tx: Transaction, arg0: GuardianSet | TransactionArgument, arg1: number | TransactionArgument, arg2: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u32().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_expiration`,
        arguments: args,
    })
}

export const guardian_set = {
    GuardianSet,
    new_,
    index,
    index_as_u64,
    guardians,
    guardian_at,
    expiration_timestamp_ms,
    is_active,
    num_guardians,
    quorum,
    set_expiration
}