import {
    Bytes20
} from "./bytes20";
import {
    GuardianSignature
} from "./guardian_signature";
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
let MODULE_NAME: string = "guardian";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Guardian =============================== */

export class Guardian implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Guardian`;

    pubkey: Bytes20;

    constructor(pubkey: Bytes20) {
        this.pubkey = pubkey;
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
        return Guardian.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Guardian.from_bcs_vector(args)
    }

    get_bcs() {
        return Guardian.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Guardian`
    }

    from(arg: Guardian) {
        this.pubkey = arg.pubkey;
    }

    static from_bcs(arg: {
        pubkey: Bytes20
    }): Guardian {
        return new Guardian(arg.pubkey)
    }

    static from_bcs_vector(args: {
        pubkey: Bytes20
    } []): Guardian[] {
        return args.map(function(arg) {
            return new Guardian(arg.pubkey)
        })
    }

    static get bcs() {
        return bcs_import.struct("Guardian", {
            pubkey: Bytes20.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Guardian(val.pubkey),
        });
    };
}

export function new_(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function as_bytes(tx: Transaction, arg0: Guardian | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Guardian.bcs.serialize((arg0 as Guardian)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::as_bytes`,
        arguments: args,
    })
}

export function pubkey(tx: Transaction, arg0: Guardian | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Guardian.bcs.serialize((arg0 as Guardian)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pubkey`,
        arguments: args,
    })
}

export function verify(tx: Transaction, arg0: Guardian | TransactionArgument, arg1: GuardianSignature | TransactionArgument, arg2: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Guardian.bcs.serialize((arg0 as Guardian))), isTransactionArgument(arg1) ? arg1 : tx.pure(GuardianSignature.bcs.serialize((arg1 as GuardianSignature))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::verify`,
        arguments: args,
    })
}

export function ecrecover(tx: Transaction, arg0: number[] | TransactionArgument, arg1: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::ecrecover`,
        arguments: args,
    })
}

export const guardian = {
    Guardian,
    new_,
    as_bytes,
    pubkey,
    verify,
    ecrecover
}