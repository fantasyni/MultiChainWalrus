import {
    Bytes32
} from "./bytes32";
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
let MODULE_NAME: string = "guardian_signature";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== GuardianSignature =============================== */

export class GuardianSignature implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::GuardianSignature`;

    r: Bytes32;
    s: Bytes32;
    recovery_id: number;
    index: number;

    constructor(r: Bytes32, s: Bytes32, recovery_id: number, index: number) {
        this.r = r;
        this.s = s;
        this.recovery_id = recovery_id;
        this.index = index;
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
        return GuardianSignature.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return GuardianSignature.from_bcs_vector(args)
    }

    get_bcs() {
        return GuardianSignature.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::GuardianSignature`
    }

    from(arg: GuardianSignature) {
        this.r = arg.r;
        this.s = arg.s;
        this.recovery_id = arg.recovery_id;
        this.index = arg.index;
    }

    static from_bcs(arg: {
        r: Bytes32,
        s: Bytes32,
        recovery_id: number,
        index: number
    }): GuardianSignature {
        return new GuardianSignature(arg.r, arg.s, arg.recovery_id, arg.index)
    }

    static from_bcs_vector(args: {
        r: Bytes32,
        s: Bytes32,
        recovery_id: number,
        index: number
    } []): GuardianSignature[] {
        return args.map(function(arg) {
            return new GuardianSignature(arg.r, arg.s, arg.recovery_id, arg.index)
        })
    }

    static get bcs() {
        return bcs_import.struct("GuardianSignature", {
            r: Bytes32.bcs,
            s: Bytes32.bcs,
            recovery_id: bcs_import.u8(),
            index: bcs_import.u8(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new GuardianSignature(val.r, val.s, val.recovery_id, val.index),
        });
    };
}

export function new_(tx: Transaction, arg0: Bytes32 | TransactionArgument, arg1: Bytes32 | TransactionArgument, arg2: number | TransactionArgument, arg3: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Bytes32.bcs.serialize((arg0 as Bytes32))), isTransactionArgument(arg1) ? arg1 : tx.pure(Bytes32.bcs.serialize((arg1 as Bytes32))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u8().serialize((arg2 as number))), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.u8().serialize((arg3 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function r(tx: Transaction, arg0: GuardianSignature | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSignature.bcs.serialize((arg0 as GuardianSignature)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::r`,
        arguments: args,
    })
}

export function s(tx: Transaction, arg0: GuardianSignature | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSignature.bcs.serialize((arg0 as GuardianSignature)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::s`,
        arguments: args,
    })
}

export function recovery_id(tx: Transaction, arg0: GuardianSignature | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSignature.bcs.serialize((arg0 as GuardianSignature)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::recovery_id`,
        arguments: args,
    })
}

export function index(tx: Transaction, arg0: GuardianSignature | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSignature.bcs.serialize((arg0 as GuardianSignature)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::index`,
        arguments: args,
    })
}

export function index_as_u64(tx: Transaction, arg0: GuardianSignature | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSignature.bcs.serialize((arg0 as GuardianSignature)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::index_as_u64`,
        arguments: args,
    })
}

export function to_rsv(tx: Transaction, arg0: GuardianSignature | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSignature.bcs.serialize((arg0 as GuardianSignature)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_rsv`,
        arguments: args,
    })
}

export const guardian_signature = {
    GuardianSignature,
    new_,
    r,
    s,
    recovery_id,
    index,
    index_as_u64,
    to_rsv
}