import {
    Clock
} from "../Sui/clock";
import {
    Coin
} from "../Sui/coin";
import {
    ID
} from "../Sui/object";
import {
    EmitterCap
} from "./emitter";
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
let MODULE_NAME: string = "publish_message";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== WormholeMessage =============================== */

export class WormholeMessage implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::WormholeMessage`;

    sender: ID;
    sequence: u64_import;
    nonce: number;
    payload: number[];
    consistency_level: number;
    timestamp: u64_import;

    constructor(sender: ID, sequence: u64_import, nonce: number, payload: number[], consistency_level: number, timestamp: u64_import) {
        this.sender = sender;
        this.sequence = sequence;
        this.nonce = nonce;
        this.payload = payload;
        this.consistency_level = consistency_level;
        this.timestamp = timestamp;
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
        return WormholeMessage.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return WormholeMessage.from_bcs_vector(args)
    }

    get_bcs() {
        return WormholeMessage.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::WormholeMessage`
    }

    from(arg: WormholeMessage) {
        this.sender = arg.sender;
        this.sequence = arg.sequence;
        this.nonce = arg.nonce;
        this.payload = arg.payload;
        this.consistency_level = arg.consistency_level;
        this.timestamp = arg.timestamp;
    }

    static from_bcs(arg: {
        sender: ID,
        sequence: u64_import,
        nonce: number,
        payload: number[],
        consistency_level: number,
        timestamp: u64_import
    }): WormholeMessage {
        return new WormholeMessage(arg.sender, arg.sequence, arg.nonce, arg.payload, arg.consistency_level, arg.timestamp)
    }

    static from_bcs_vector(args: {
        sender: ID,
        sequence: u64_import,
        nonce: number,
        payload: number[],
        consistency_level: number,
        timestamp: u64_import
    } []): WormholeMessage[] {
        return args.map(function(arg) {
            return new WormholeMessage(arg.sender, arg.sequence, arg.nonce, arg.payload, arg.consistency_level, arg.timestamp)
        })
    }

    static get bcs() {
        return bcs_import.struct("WormholeMessage", {
            sender: ID.bcs,
            sequence: bcs_import.u64(),
            nonce: bcs_import.u32(),
            payload: bcs_import.vector(bcs_import.u8()),
            consistency_level: bcs_import.u8(),
            timestamp: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new WormholeMessage(val.sender, val.sequence, val.nonce, val.payload, val.consistency_level, val.timestamp),
        });
    };
}

/* ============================== MessageTicket =============================== */

export class MessageTicket implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::MessageTicket`;

    sender: ID;
    sequence: u64_import;
    nonce: number;
    payload: number[];

    constructor(sender: ID, sequence: u64_import, nonce: number, payload: number[]) {
        this.sender = sender;
        this.sequence = sequence;
        this.nonce = nonce;
        this.payload = payload;
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
        return MessageTicket.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return MessageTicket.from_bcs_vector(args)
    }

    get_bcs() {
        return MessageTicket.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::MessageTicket`
    }

    from(arg: MessageTicket) {
        this.sender = arg.sender;
        this.sequence = arg.sequence;
        this.nonce = arg.nonce;
        this.payload = arg.payload;
    }

    static from_bcs(arg: {
        sender: ID,
        sequence: u64_import,
        nonce: number,
        payload: number[]
    }): MessageTicket {
        return new MessageTicket(arg.sender, arg.sequence, arg.nonce, arg.payload)
    }

    static from_bcs_vector(args: {
        sender: ID,
        sequence: u64_import,
        nonce: number,
        payload: number[]
    } []): MessageTicket[] {
        return args.map(function(arg) {
            return new MessageTicket(arg.sender, arg.sequence, arg.nonce, arg.payload)
        })
    }

    static get bcs() {
        return bcs_import.struct("MessageTicket", {
            sender: ID.bcs,
            sequence: bcs_import.u64(),
            nonce: bcs_import.u32(),
            payload: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new MessageTicket(val.sender, val.sequence, val.nonce, val.payload),
        });
    };
}

export function publish_message(tx: Transaction, arg0: State | TransactionArgument, arg1: Coin | TransactionArgument, arg2: MessageTicket | TransactionArgument, arg3: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Coin).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(MessageTicket.bcs.serialize((arg2 as MessageTicket))), isTransactionArgument(arg3) ? arg3 : tx.object((arg3 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::publish_message`,
        arguments: args,
    })
}

export function prepare_message(tx: Transaction, arg0: EmitterCap | TransactionArgument, arg1: number | TransactionArgument, arg2: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as EmitterCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u32().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::prepare_message`,
        arguments: args,
    })
}

export const publish_message = {
    WormholeMessage,
    MessageTicket,
    publish_message,
    prepare_message
}