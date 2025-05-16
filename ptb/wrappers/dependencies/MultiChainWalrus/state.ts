import {
    UID
} from "../Sui/object";
import {
    Table
} from "../Sui/table";
import {
    ConsumedVAAs
} from "../Wormhole/consumed_vaas";
import {
    ExternalAddress
} from "../Wormhole/external_address";
import {
    StructClass,
    get_object_address,
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

let PACKAGE_NAME: string = "MultiChainWalrus";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000000";
let MODULE_NAME: string = "state";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== State =============================== */

export class State implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::State`;

    id: UID;
    transceiver_peers ? : Table;
    consumed_vaas ? : ConsumedVAAs;

    constructor(id: UID, transceiver_peers ? : Table, consumed_vaas ? : ConsumedVAAs) {
        this.id = id;
        this.transceiver_peers = transceiver_peers;
        this.consumed_vaas = consumed_vaas;
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
        return State.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return State.from_bcs_vector(args)
    }

    get_bcs() {
        return State.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new State(UID.from_id(id));
    }

    static from_id(id: string) {
        return new State(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::State`
    }

    from(arg: State) {
        this.id = arg.id;
        this.transceiver_peers = arg.transceiver_peers;
        this.consumed_vaas = arg.consumed_vaas;
    }

    static from_bcs(arg: {
        id: UID,
        transceiver_peers: Table,
        consumed_vaas: ConsumedVAAs
    }): State {
        return new State(arg.id, arg.transceiver_peers, arg.consumed_vaas)
    }

    static from_bcs_vector(args: {
        id: UID,
        transceiver_peers: Table,
        consumed_vaas: ConsumedVAAs
    } []): State[] {
        return args.map(function(arg) {
            return new State(arg.id, arg.transceiver_peers, arg.consumed_vaas)
        })
    }

    static get bcs() {
        return bcs_import.struct("State", {
            id: UID.bcs,
            transceiver_peers: Table.bcs,
            consumed_vaas: ConsumedVAAs.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new State(val.id, val.transceiver_peers, val.consumed_vaas),
        });
    };
}

/* ============================== TransceiverPeer =============================== */

export class TransceiverPeer implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransceiverPeer`;

    peer_contract: ExternalAddress;

    constructor(peer_contract: ExternalAddress) {
        this.peer_contract = peer_contract;
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
        return TransceiverPeer.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransceiverPeer.from_bcs_vector(args)
    }

    get_bcs() {
        return TransceiverPeer.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransceiverPeer`
    }

    from(arg: TransceiverPeer) {
        this.peer_contract = arg.peer_contract;
    }

    static from_bcs(arg: {
        peer_contract: ExternalAddress
    }): TransceiverPeer {
        return new TransceiverPeer(arg.peer_contract)
    }

    static from_bcs_vector(args: {
        peer_contract: ExternalAddress
    } []): TransceiverPeer[] {
        return args.map(function(arg) {
            return new TransceiverPeer(arg.peer_contract)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransceiverPeer", {
            peer_contract: ExternalAddress.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransceiverPeer(val.peer_contract),
        });
    };
}

/* ============================== TransceiverPeerUpdate =============================== */

export class TransceiverPeerUpdate implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransceiverPeerUpdate`;

    chian_id: number;
    old_peer_contract: ExternalAddress;
    peer_contract: ExternalAddress;

    constructor(chian_id: number, old_peer_contract: ExternalAddress, peer_contract: ExternalAddress) {
        this.chian_id = chian_id;
        this.old_peer_contract = old_peer_contract;
        this.peer_contract = peer_contract;
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
        return TransceiverPeerUpdate.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransceiverPeerUpdate.from_bcs_vector(args)
    }

    get_bcs() {
        return TransceiverPeerUpdate.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransceiverPeerUpdate`
    }

    from(arg: TransceiverPeerUpdate) {
        this.chian_id = arg.chian_id;
        this.old_peer_contract = arg.old_peer_contract;
        this.peer_contract = arg.peer_contract;
    }

    static from_bcs(arg: {
        chian_id: number,
        old_peer_contract: ExternalAddress,
        peer_contract: ExternalAddress
    }): TransceiverPeerUpdate {
        return new TransceiverPeerUpdate(arg.chian_id, arg.old_peer_contract, arg.peer_contract)
    }

    static from_bcs_vector(args: {
        chian_id: number,
        old_peer_contract: ExternalAddress,
        peer_contract: ExternalAddress
    } []): TransceiverPeerUpdate[] {
        return args.map(function(arg) {
            return new TransceiverPeerUpdate(arg.chian_id, arg.old_peer_contract, arg.peer_contract)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransceiverPeerUpdate", {
            chian_id: bcs_import.u16(),
            old_peer_contract: ExternalAddress.bcs,
            peer_contract: ExternalAddress.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransceiverPeerUpdate(val.chian_id, val.old_peer_contract, val.peer_contract),
        });
    };
}

export function new_(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function borrow_mut_consumed_vaas(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut_consumed_vaas`,
        arguments: args,
    })
}

export function state_id(tx: Transaction, arg0: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::state_id`,
        arguments: args,
    })
}

export function get_transceiver_peer_address(tx: Transaction, arg0: State | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_transceiver_peer_address`,
        arguments: args,
    })
}

export function check_transceiver_peer(tx: Transaction, arg0: State | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::check_transceiver_peer`,
        arguments: args,
    })
}

export function set_transceiver_peer(tx: Transaction, arg0: State | TransactionArgument, arg1: number | TransactionArgument, arg2: ExternalAddress | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(ExternalAddress.bcs.serialize((arg2 as ExternalAddress)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_transceiver_peer`,
        arguments: args,
    })
}

export const state = {
    State,
    TransceiverPeer,
    TransceiverPeerUpdate,
    new_,
    borrow_mut_consumed_vaas,
    state_id,
    get_transceiver_peer_address,
    check_transceiver_peer,
    set_transceiver_peer
}