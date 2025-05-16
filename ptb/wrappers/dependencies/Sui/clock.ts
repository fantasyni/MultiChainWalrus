import {
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
let MODULE_NAME: string = "clock";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Clock =============================== */

export class Clock implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Clock`;

    id: UID;
    timestamp_ms ? : u64_import;

    constructor(id: UID, timestamp_ms ? : u64_import) {
        this.id = id;
        this.timestamp_ms = timestamp_ms;
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
        return Clock.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Clock.from_bcs_vector(args)
    }

    get_bcs() {
        return Clock.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Clock(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Clock(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Clock`
    }

    from(arg: Clock) {
        this.id = arg.id;
        this.timestamp_ms = arg.timestamp_ms;
    }

    static from_bcs(arg: {
        id: UID,
        timestamp_ms: u64_import
    }): Clock {
        return new Clock(arg.id, arg.timestamp_ms)
    }

    static from_bcs_vector(args: {
        id: UID,
        timestamp_ms: u64_import
    } []): Clock[] {
        return args.map(function(arg) {
            return new Clock(arg.id, arg.timestamp_ms)
        })
    }

    static get bcs() {
        return bcs_import.struct("Clock", {
            id: UID.bcs,
            timestamp_ms: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Clock(val.id, val.timestamp_ms),
        });
    };
}

export function timestamp_ms(tx: Transaction, arg0: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::timestamp_ms`,
        arguments: args,
    })
}

export function create(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create`,
        arguments: args,
    })
}

export function consensus_commit_prologue(tx: Transaction, arg0: Clock | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Clock).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::consensus_commit_prologue`,
        arguments: args,
    })
}

export const clock = {
    Clock,
    timestamp_ms,
    create,
    consensus_commit_prologue
}