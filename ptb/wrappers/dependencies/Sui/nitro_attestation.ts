import {
    Option
} from "../MoveStdlib/option";
import {
    Clock
} from "./clock";
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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "nitro_attestation";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== PCREntry =============================== */

export class PCREntry implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::PCREntry`;

    index: number;
    value: number[];

    constructor(index: number, value: number[]) {
        this.index = index;
        this.value = value;
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
        return PCREntry.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return PCREntry.from_bcs_vector(args)
    }

    get_bcs() {
        return PCREntry.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::PCREntry`
    }

    from(arg: PCREntry) {
        this.index = arg.index;
        this.value = arg.value;
    }

    static from_bcs(arg: {
        index: number,
        value: number[]
    }): PCREntry {
        return new PCREntry(arg.index, arg.value)
    }

    static from_bcs_vector(args: {
        index: number,
        value: number[]
    } []): PCREntry[] {
        return args.map(function(arg) {
            return new PCREntry(arg.index, arg.value)
        })
    }

    static get bcs() {
        return bcs_import.struct("PCREntry", {
            index: bcs_import.u8(),
            value: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new PCREntry(val.index, val.value),
        });
    };
}

/* ============================== NitroAttestationDocument =============================== */

export class NitroAttestationDocument implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::NitroAttestationDocument`;

    module_id: number[];
    timestamp: u64_import;
    digest: number[];
    pcrs: PCREntry[];
    public_key: Option < number[] > ;
    user_data: Option < number[] > ;
    nonce: Option < number[] > ;

    constructor(module_id: number[], timestamp: u64_import, digest: number[], pcrs: PCREntry[], public_key: Option < number[] > , user_data: Option < number[] > , nonce: Option < number[] > ) {
        this.module_id = module_id;
        this.timestamp = timestamp;
        this.digest = digest;
        this.pcrs = pcrs;
        this.public_key = public_key;
        this.user_data = user_data;
        this.nonce = nonce;
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
        return NitroAttestationDocument.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return NitroAttestationDocument.from_bcs_vector(args)
    }

    get_bcs() {
        return NitroAttestationDocument.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::NitroAttestationDocument`
    }

    from(arg: NitroAttestationDocument) {
        this.module_id = arg.module_id;
        this.timestamp = arg.timestamp;
        this.digest = arg.digest;
        this.pcrs = arg.pcrs;
        this.public_key = arg.public_key;
        this.user_data = arg.user_data;
        this.nonce = arg.nonce;
    }

    static from_bcs(arg: {
        module_id: number[],
        timestamp: u64_import,
        digest: number[],
        pcrs: PCREntry[],
        public_key: Option < number[] > ,
        user_data: Option < number[] > ,
        nonce: Option < number[] >
    }): NitroAttestationDocument {
        return new NitroAttestationDocument(arg.module_id, arg.timestamp, arg.digest, arg.pcrs, arg.public_key, arg.user_data, arg.nonce)
    }

    static from_bcs_vector(args: {
        module_id: number[],
        timestamp: u64_import,
        digest: number[],
        pcrs: PCREntry[],
        public_key: Option < number[] > ,
        user_data: Option < number[] > ,
        nonce: Option < number[] >
    } []): NitroAttestationDocument[] {
        return args.map(function(arg) {
            return new NitroAttestationDocument(arg.module_id, arg.timestamp, arg.digest, arg.pcrs, arg.public_key, arg.user_data, arg.nonce)
        })
    }

    static get bcs() {
        return bcs_import.struct("NitroAttestationDocument", {
            module_id: bcs_import.vector(bcs_import.u8()),
            timestamp: bcs_import.u64(),
            digest: bcs_import.vector(bcs_import.u8()),
            pcrs: bcs_import.vector(PCREntry.bcs),
            public_key: Option.bcs(bcs_import.vector(bcs_import.u8())),
            user_data: Option.bcs(bcs_import.vector(bcs_import.u8())),
            nonce: Option.bcs(bcs_import.vector(bcs_import.u8())),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new NitroAttestationDocument(val.module_id, val.timestamp, val.digest, val.pcrs, val.public_key, val.user_data, val.nonce),
        });
    };
}

export function digest(tx: Transaction, arg0: NitroAttestationDocument | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(NitroAttestationDocument.bcs.serialize((arg0 as NitroAttestationDocument)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::digest`,
        arguments: args,
    })
}

export function value(tx: Transaction, arg0: PCREntry | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(PCREntry.bcs.serialize((arg0 as PCREntry)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::value`,
        arguments: args,
    })
}

export function index(tx: Transaction, arg0: PCREntry | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(PCREntry.bcs.serialize((arg0 as PCREntry)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::index`,
        arguments: args,
    })
}

export function timestamp(tx: Transaction, arg0: NitroAttestationDocument | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(NitroAttestationDocument.bcs.serialize((arg0 as NitroAttestationDocument)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::timestamp`,
        arguments: args,
    })
}

export function nonce(tx: Transaction, arg0: NitroAttestationDocument | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(NitroAttestationDocument.bcs.serialize((arg0 as NitroAttestationDocument)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::nonce`,
        arguments: args,
    })
}

export function load_nitro_attestation(tx: Transaction, arg0: number[] | TransactionArgument, arg1: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::load_nitro_attestation`,
        arguments: args,
    })
}

export function module_id(tx: Transaction, arg0: NitroAttestationDocument | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(NitroAttestationDocument.bcs.serialize((arg0 as NitroAttestationDocument)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::module_id`,
        arguments: args,
    })
}

export function pcrs(tx: Transaction, arg0: NitroAttestationDocument | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(NitroAttestationDocument.bcs.serialize((arg0 as NitroAttestationDocument)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pcrs`,
        arguments: args,
    })
}

export function public_key(tx: Transaction, arg0: NitroAttestationDocument | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(NitroAttestationDocument.bcs.serialize((arg0 as NitroAttestationDocument)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::public_key`,
        arguments: args,
    })
}

export function user_data(tx: Transaction, arg0: NitroAttestationDocument | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(NitroAttestationDocument.bcs.serialize((arg0 as NitroAttestationDocument)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::user_data`,
        arguments: args,
    })
}

export const nitro_attestation = {
    PCREntry,
    NitroAttestationDocument,
    digest,
    value,
    index,
    timestamp,
    nonce,
    load_nitro_attestation,
    module_id,
    pcrs,
    public_key,
    user_data
}