import {
    Clock
} from "../Sui/clock";
import {
    Bytes32
} from "./bytes32";
import {
    ConsumedVAAs
} from "./consumed_vaas";
import {
    ExternalAddress
} from "./external_address";
import {
    GuardianSet
} from "./guardian_set";
import {
    GuardianSignature
} from "./guardian_signature";
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
let MODULE_NAME: string = "vaa";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== VAA =============================== */

export class VAA implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::VAA`;

    guardian_set_index: number;
    timestamp: number;
    nonce: number;
    emitter_chain: number;
    emitter_address: ExternalAddress;
    sequence: u64_import;
    consistency_level: number;
    payload: number[];
    digest: Bytes32;

    constructor(guardian_set_index: number, timestamp: number, nonce: number, emitter_chain: number, emitter_address: ExternalAddress, sequence: u64_import, consistency_level: number, payload: number[], digest: Bytes32) {
        this.guardian_set_index = guardian_set_index;
        this.timestamp = timestamp;
        this.nonce = nonce;
        this.emitter_chain = emitter_chain;
        this.emitter_address = emitter_address;
        this.sequence = sequence;
        this.consistency_level = consistency_level;
        this.payload = payload;
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
        return VAA.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return VAA.from_bcs_vector(args)
    }

    get_bcs() {
        return VAA.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::VAA`
    }

    from(arg: VAA) {
        this.guardian_set_index = arg.guardian_set_index;
        this.timestamp = arg.timestamp;
        this.nonce = arg.nonce;
        this.emitter_chain = arg.emitter_chain;
        this.emitter_address = arg.emitter_address;
        this.sequence = arg.sequence;
        this.consistency_level = arg.consistency_level;
        this.payload = arg.payload;
        this.digest = arg.digest;
    }

    static from_bcs(arg: {
        guardian_set_index: number,
        timestamp: number,
        nonce: number,
        emitter_chain: number,
        emitter_address: ExternalAddress,
        sequence: u64_import,
        consistency_level: number,
        payload: number[],
        digest: Bytes32
    }): VAA {
        return new VAA(arg.guardian_set_index, arg.timestamp, arg.nonce, arg.emitter_chain, arg.emitter_address, arg.sequence, arg.consistency_level, arg.payload, arg.digest)
    }

    static from_bcs_vector(args: {
        guardian_set_index: number,
        timestamp: number,
        nonce: number,
        emitter_chain: number,
        emitter_address: ExternalAddress,
        sequence: u64_import,
        consistency_level: number,
        payload: number[],
        digest: Bytes32
    } []): VAA[] {
        return args.map(function(arg) {
            return new VAA(arg.guardian_set_index, arg.timestamp, arg.nonce, arg.emitter_chain, arg.emitter_address, arg.sequence, arg.consistency_level, arg.payload, arg.digest)
        })
    }

    static get bcs() {
        return bcs_import.struct("VAA", {
            guardian_set_index: bcs_import.u32(),
            timestamp: bcs_import.u32(),
            nonce: bcs_import.u32(),
            emitter_chain: bcs_import.u16(),
            emitter_address: ExternalAddress.bcs,
            sequence: bcs_import.u64(),
            consistency_level: bcs_import.u8(),
            payload: bcs_import.vector(bcs_import.u8()),
            digest: Bytes32.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new VAA(val.guardian_set_index, val.timestamp, val.nonce, val.emitter_chain, val.emitter_address, val.sequence, val.consistency_level, val.payload, val.digest),
        });
    };
}

export function digest(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::digest`,
        arguments: args,
    })
}

export function consume(tx: Transaction, arg0: ConsumedVAAs | TransactionArgument, arg1: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ConsumedVAAs.bcs.serialize((arg0 as ConsumedVAAs))), isTransactionArgument(arg1) ? arg1 : tx.pure(VAA.bcs.serialize((arg1 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::consume`,
        arguments: args,
    })
}

export function guardian_set_index(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::guardian_set_index`,
        arguments: args,
    })
}

export function timestamp(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::timestamp`,
        arguments: args,
    })
}

export function nonce(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::nonce`,
        arguments: args,
    })
}

export function batch_id(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::batch_id`,
        arguments: args,
    })
}

export function payload(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::payload`,
        arguments: args,
    })
}

export function emitter_chain(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::emitter_chain`,
        arguments: args,
    })
}

export function emitter_address(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::emitter_address`,
        arguments: args,
    })
}

export function emitter_info(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::emitter_info`,
        arguments: args,
    })
}

export function sequence(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sequence`,
        arguments: args,
    })
}

export function consistency_level(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::consistency_level`,
        arguments: args,
    })
}

export function finality(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::finality`,
        arguments: args,
    })
}

export function take_payload(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_payload`,
        arguments: args,
    })
}

export function take_emitter_info_and_payload(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_emitter_info_and_payload`,
        arguments: args,
    })
}

export function parse_and_verify(tx: Transaction, arg0: State | TransactionArgument, arg1: number[] | TransactionArgument, arg2: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[]))), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::parse_and_verify`,
        arguments: args,
    })
}

export function compute_message_hash(tx: Transaction, arg0: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(VAA.bcs.serialize((arg0 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::compute_message_hash`,
        arguments: args,
    })
}

export function parse(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::parse`,
        arguments: args,
    })
}

export function double_keccak256(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::double_keccak256`,
        arguments: args,
    })
}

export function verify_signatures(tx: Transaction, arg0: GuardianSet | TransactionArgument, arg1: GuardianSignature[] | TransactionArgument, arg2: number[] | TransactionArgument, arg3: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(GuardianSet.bcs.serialize((arg0 as GuardianSet))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(GuardianSignature.bcs).serialize((arg1 as GuardianSignature[]))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[]))), isTransactionArgument(arg3) ? arg3 : tx.object((arg3 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::verify_signatures`,
        arguments: args,
    })
}

export const vaa = {
    VAA,
    digest,
    consume,
    guardian_set_index,
    timestamp,
    nonce,
    batch_id,
    payload,
    emitter_chain,
    emitter_address,
    emitter_info,
    sequence,
    consistency_level,
    finality,
    take_payload,
    take_emitter_info_and_payload,
    parse_and_verify,
    compute_message_hash,
    parse,
    double_keccak256,
    verify_signatures
}