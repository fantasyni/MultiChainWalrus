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
let MODULE_NAME: string = "setup";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== AdminCap =============================== */

export class AdminCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::AdminCap`;

    id: UID;
    state_id ? : ID;

    constructor(id: UID, state_id ? : ID) {
        this.id = id;
        this.state_id = state_id;
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
        return AdminCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return AdminCap.from_bcs_vector(args)
    }

    get_bcs() {
        return AdminCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new AdminCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new AdminCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::AdminCap`
    }

    from(arg: AdminCap) {
        this.id = arg.id;
        this.state_id = arg.state_id;
    }

    static from_bcs(arg: {
        id: UID,
        state_id: ID
    }): AdminCap {
        return new AdminCap(arg.id, arg.state_id)
    }

    static from_bcs_vector(args: {
        id: UID,
        state_id: ID
    } []): AdminCap[] {
        return args.map(function(arg) {
            return new AdminCap(arg.id, arg.state_id)
        })
    }

    static get bcs() {
        return bcs_import.struct("AdminCap", {
            id: UID.bcs,
            state_id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new AdminCap(val.id, val.state_id),
        });
    };
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

export function set_transceiver_peer(tx: Transaction, arg0: AdminCap | TransactionArgument, arg1: State | TransactionArgument, arg2: number | TransactionArgument, arg3: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as AdminCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u16().serialize((arg2 as number))), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg3 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_transceiver_peer`,
        arguments: args,
    })
}

export function create_state(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_state`,
        arguments: args,
    })
}

export function assert_admin_cap(tx: Transaction, arg0: AdminCap | TransactionArgument, arg1: State | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as AdminCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as State).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::assert_admin_cap`,
        arguments: args,
    })
}

export const setup = {
    AdminCap,
    check_transceiver_peer,
    set_transceiver_peer,
    create_state,
    assert_admin_cap
}