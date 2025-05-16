import {
    StructClass,
    get_package_address,
    u64 as u64_import
} from "@deepmove/sui";
import {
    bcs as bcs_import
} from "@mysten/sui/bcs";
import {
    Transaction
} from "@mysten/sui/transactions";
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "tx_context";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== TxContext =============================== */

export class TxContext implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TxContext`;

    sender: string;
    tx_hash: number[];
    epoch: u64_import;
    epoch_timestamp_ms: u64_import;
    ids_created: u64_import;

    constructor(sender: string, tx_hash: number[], epoch: u64_import, epoch_timestamp_ms: u64_import, ids_created: u64_import) {
        this.sender = sender;
        this.tx_hash = tx_hash;
        this.epoch = epoch;
        this.epoch_timestamp_ms = epoch_timestamp_ms;
        this.ids_created = ids_created;
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
        return TxContext.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TxContext.from_bcs_vector(args)
    }

    get_bcs() {
        return TxContext.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TxContext`
    }

    from(arg: TxContext) {
        this.sender = arg.sender;
        this.tx_hash = arg.tx_hash;
        this.epoch = arg.epoch;
        this.epoch_timestamp_ms = arg.epoch_timestamp_ms;
        this.ids_created = arg.ids_created;
    }

    static from_bcs(arg: {
        sender: string,
        tx_hash: number[],
        epoch: u64_import,
        epoch_timestamp_ms: u64_import,
        ids_created: u64_import
    }): TxContext {
        return new TxContext(arg.sender, arg.tx_hash, arg.epoch, arg.epoch_timestamp_ms, arg.ids_created)
    }

    static from_bcs_vector(args: {
        sender: string,
        tx_hash: number[],
        epoch: u64_import,
        epoch_timestamp_ms: u64_import,
        ids_created: u64_import
    } []): TxContext[] {
        return args.map(function(arg) {
            return new TxContext(arg.sender, arg.tx_hash, arg.epoch, arg.epoch_timestamp_ms, arg.ids_created)
        })
    }

    static get bcs() {
        return bcs_import.struct("TxContext", {
            sender: bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            }),
            tx_hash: bcs_import.vector(bcs_import.u8()),
            epoch: bcs_import.u64(),
            epoch_timestamp_ms: bcs_import.u64(),
            ids_created: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TxContext(val.sender, val.tx_hash, val.epoch, val.epoch_timestamp_ms, val.ids_created),
        });
    };
}

export function sender(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sender`,
        arguments: args,
    })
}

export function digest(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::digest`,
        arguments: args,
    })
}

export function epoch(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::epoch`,
        arguments: args,
    })
}

export function epoch_timestamp_ms(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::epoch_timestamp_ms`,
        arguments: args,
    })
}

export function sponsor(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sponsor`,
        arguments: args,
    })
}

export function fresh_object_address(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::fresh_object_address`,
        arguments: args,
    })
}

export function ids_created(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::ids_created`,
        arguments: args,
    })
}

export function option_sponsor(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::option_sponsor`,
        arguments: args,
    })
}

export const tx_context = {
    TxContext,
    sender,
    digest,
    epoch,
    epoch_timestamp_ms,
    sponsor,
    fresh_object_address,
    ids_created,
    option_sponsor
}