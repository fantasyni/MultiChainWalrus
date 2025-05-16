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
import {
    fromHEX,
    toHEX
} from "@mysten/sui/utils";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "zklogin_verified_id";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== VerifiedID =============================== */

export class VerifiedID implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::VerifiedID`;

    id: UID;
    owner ? : string;
    key_claim_name ? : string;
    key_claim_value ? : string;
    issuer ? : string;
    audience ? : string;

    constructor(id: UID, owner ? : string, key_claim_name ? : string, key_claim_value ? : string, issuer ? : string, audience ? : string) {
        this.id = id;
        this.owner = owner;
        this.key_claim_name = key_claim_name;
        this.key_claim_value = key_claim_value;
        this.issuer = issuer;
        this.audience = audience;
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
        return VerifiedID.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return VerifiedID.from_bcs_vector(args)
    }

    get_bcs() {
        return VerifiedID.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new VerifiedID(UID.from_id(id));
    }

    static from_id(id: string) {
        return new VerifiedID(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::VerifiedID`
    }

    from(arg: VerifiedID) {
        this.id = arg.id;
        this.owner = arg.owner;
        this.key_claim_name = arg.key_claim_name;
        this.key_claim_value = arg.key_claim_value;
        this.issuer = arg.issuer;
        this.audience = arg.audience;
    }

    static from_bcs(arg: {
        id: UID,
        owner: string,
        key_claim_name: string,
        key_claim_value: string,
        issuer: string,
        audience: string
    }): VerifiedID {
        return new VerifiedID(arg.id, arg.owner, arg.key_claim_name, arg.key_claim_value, arg.issuer, arg.audience)
    }

    static from_bcs_vector(args: {
        id: UID,
        owner: string,
        key_claim_name: string,
        key_claim_value: string,
        issuer: string,
        audience: string
    } []): VerifiedID[] {
        return args.map(function(arg) {
            return new VerifiedID(arg.id, arg.owner, arg.key_claim_name, arg.key_claim_value, arg.issuer, arg.audience)
        })
    }

    static get bcs() {
        return bcs_import.struct("VerifiedID", {
            id: UID.bcs,
            owner: bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            }),
            key_claim_name: bcs_import.string(),
            key_claim_value: bcs_import.string(),
            issuer: bcs_import.string(),
            audience: bcs_import.string(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new VerifiedID(val.id, val.owner, val.key_claim_name, val.key_claim_value, val.issuer, val.audience),
        });
    };
}

export function delete_(tx: Transaction, arg0: VerifiedID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as VerifiedID).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::delete`,
        arguments: args,
    })
}

export function owner(tx: Transaction, arg0: VerifiedID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as VerifiedID).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::owner`,
        arguments: args,
    })
}

export function key_claim_name(tx: Transaction, arg0: VerifiedID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as VerifiedID).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::key_claim_name`,
        arguments: args,
    })
}

export function key_claim_value(tx: Transaction, arg0: VerifiedID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as VerifiedID).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::key_claim_value`,
        arguments: args,
    })
}

export function issuer(tx: Transaction, arg0: VerifiedID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as VerifiedID).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::issuer`,
        arguments: args,
    })
}

export function audience(tx: Transaction, arg0: VerifiedID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as VerifiedID).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::audience`,
        arguments: args,
    })
}

export function verify_zklogin_id(tx: Transaction, arg0: string | TransactionArgument, arg1: string | TransactionArgument, arg2: string | TransactionArgument, arg3: string | TransactionArgument, arg4: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.string().serialize((arg1 as string))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.string().serialize((arg2 as string))), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.string().serialize((arg3 as string))), isTransactionArgument(arg4) ? arg4 : tx.pure(bcs_import.u256().serialize((arg4 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::verify_zklogin_id`,
        arguments: args,
    })
}

export function check_zklogin_id(tx: Transaction, arg0: string | TransactionArgument, arg1: string | TransactionArgument, arg2: string | TransactionArgument, arg3: string | TransactionArgument, arg4: string | TransactionArgument, arg5: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg0 as string))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.string().serialize((arg1 as string))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.string().serialize((arg2 as string))), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.string().serialize((arg3 as string))), isTransactionArgument(arg4) ? arg4 : tx.pure(bcs_import.string().serialize((arg4 as string))), isTransactionArgument(arg5) ? arg5 : tx.pure(bcs_import.u256().serialize((arg5 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::check_zklogin_id`,
        arguments: args,
    })
}

export const zklogin_verified_id = {
    VerifiedID,
    delete_,
    owner,
    key_claim_name,
    key_claim_value,
    issuer,
    audience,
    verify_zklogin_id,
    check_zklogin_id
}