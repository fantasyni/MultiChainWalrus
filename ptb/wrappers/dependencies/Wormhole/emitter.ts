import {
    ID,
    UID
} from "../Sui/object";
import {
    State
} from "./state";
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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "emitter";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== EmitterCreated =============================== */

export class EmitterCreated implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::EmitterCreated`;

    emitter_cap: ID;

    constructor(emitter_cap: ID) {
        this.emitter_cap = emitter_cap;
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
        return EmitterCreated.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return EmitterCreated.from_bcs_vector(args)
    }

    get_bcs() {
        return EmitterCreated.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::EmitterCreated`
    }

    from(arg: EmitterCreated) {
        this.emitter_cap = arg.emitter_cap;
    }

    static from_bcs(arg: {
        emitter_cap: ID
    }): EmitterCreated {
        return new EmitterCreated(arg.emitter_cap)
    }

    static from_bcs_vector(args: {
        emitter_cap: ID
    } []): EmitterCreated[] {
        return args.map(function(arg) {
            return new EmitterCreated(arg.emitter_cap)
        })
    }

    static get bcs() {
        return bcs_import.struct("EmitterCreated", {
            emitter_cap: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new EmitterCreated(val.emitter_cap),
        });
    };
}

/* ============================== EmitterDestroyed =============================== */

export class EmitterDestroyed implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::EmitterDestroyed`;

    emitter_cap: ID;

    constructor(emitter_cap: ID) {
        this.emitter_cap = emitter_cap;
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
        return EmitterDestroyed.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return EmitterDestroyed.from_bcs_vector(args)
    }

    get_bcs() {
        return EmitterDestroyed.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::EmitterDestroyed`
    }

    from(arg: EmitterDestroyed) {
        this.emitter_cap = arg.emitter_cap;
    }

    static from_bcs(arg: {
        emitter_cap: ID
    }): EmitterDestroyed {
        return new EmitterDestroyed(arg.emitter_cap)
    }

    static from_bcs_vector(args: {
        emitter_cap: ID
    } []): EmitterDestroyed[] {
        return args.map(function(arg) {
            return new EmitterDestroyed(arg.emitter_cap)
        })
    }

    static get bcs() {
        return bcs_import.struct("EmitterDestroyed", {
            emitter_cap: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new EmitterDestroyed(val.emitter_cap),
        });
    };
}

/* ============================== EmitterCap =============================== */

export class EmitterCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::EmitterCap`;

    id: UID;
    sequence ? : u64_import;

    constructor(id: UID, sequence ? : u64_import) {
        this.id = id;
        this.sequence = sequence;
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
        return EmitterCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return EmitterCap.from_bcs_vector(args)
    }

    get_bcs() {
        return EmitterCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new EmitterCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new EmitterCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::EmitterCap`
    }

    from(arg: EmitterCap) {
        this.id = arg.id;
        this.sequence = arg.sequence;
    }

    static from_bcs(arg: {
        id: UID,
        sequence: u64_import
    }): EmitterCap {
        return new EmitterCap(arg.id, arg.sequence)
    }

    static from_bcs_vector(args: {
        id: UID,
        sequence: u64_import
    } []): EmitterCap[] {
        return args.map(function(arg) {
            return new EmitterCap(arg.id, arg.sequence)
        })
    }

    static get bcs() {
        return bcs_import.struct("EmitterCap", {
            id: UID.bcs,
            sequence: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new EmitterCap(val.id, val.sequence),
        });
    };
}

export function new_(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function sequence(tx: Transaction, arg0: EmitterCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as EmitterCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sequence`,
        arguments: args,
    })
}

export function destroy(tx: Transaction, arg0: State | TransactionArgument, arg1: EmitterCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as EmitterCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy`,
        arguments: args,
    })
}

export function use_sequence(tx: Transaction, arg0: EmitterCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as EmitterCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::use_sequence`,
        arguments: args,
    })
}

export const emitter = {
    EmitterCreated,
    EmitterDestroyed,
    EmitterCap,
    new_,
    sequence,
    destroy,
    use_sequence
}