import {
    UID
} from "../Sui/object";
import {
    UpgradeCap
} from "../Sui/package";
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
let MODULE_NAME: string = "setup";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== DeployerCap =============================== */

export class DeployerCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::DeployerCap`;

    id: UID;

    constructor(id: UID) {
        this.id = id;
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
        return DeployerCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return DeployerCap.from_bcs_vector(args)
    }

    get_bcs() {
        return DeployerCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new DeployerCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new DeployerCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::DeployerCap`
    }

    from(arg: DeployerCap) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: UID
    }): DeployerCap {
        return new DeployerCap(arg.id)
    }

    static from_bcs_vector(args: {
        id: UID
    } []): DeployerCap[] {
        return args.map(function(arg) {
            return new DeployerCap(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("DeployerCap", {
            id: UID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new DeployerCap(val.id),
        });
    };
}

export function init(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::init`,
        arguments: args,
    })
}

export function complete(tx: Transaction, arg0: DeployerCap | TransactionArgument, arg1: UpgradeCap | TransactionArgument, arg2: number | TransactionArgument, arg3: number[] | TransactionArgument, arg4: number | TransactionArgument, arg5: number[][] | TransactionArgument, arg6: number | TransactionArgument, arg7: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DeployerCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as UpgradeCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u16().serialize((arg2 as number))), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg3 as number[]))), isTransactionArgument(arg4) ? arg4 : tx.pure(bcs_import.u32().serialize((arg4 as number))), isTransactionArgument(arg5) ? arg5 : tx.pure(bcs_import.vector(bcs_import.vector(bcs_import.u8())).serialize((arg5 as number[][]))), isTransactionArgument(arg6) ? arg6 : tx.pure(bcs_import.u32().serialize((arg6 as number))), isTransactionArgument(arg7) ? arg7 : tx.pure(bcs_import.u64().serialize((arg7 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::complete`,
        arguments: args,
    })
}

export const setup = {
    DeployerCap,
    init,
    complete
}