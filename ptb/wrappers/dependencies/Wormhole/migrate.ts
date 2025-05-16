import {
    Clock
} from "../Sui/clock";
import {
    ID
} from "../Sui/object";
import {
    State
} from "./state";
import {
    StructClass,
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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "migrate";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== MigrateComplete =============================== */

export class MigrateComplete implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::MigrateComplete`;

    package_: ID;

    constructor(package_: ID) {
        this.package_ = package_;
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
        return MigrateComplete.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return MigrateComplete.from_bcs_vector(args)
    }

    get_bcs() {
        return MigrateComplete.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::MigrateComplete`
    }

    from(arg: MigrateComplete) {
        this.package_ = arg.package_;
    }

    static from_bcs(arg: {
        package_: ID
    }): MigrateComplete {
        return new MigrateComplete(arg.package_)
    }

    static from_bcs_vector(args: {
        package_: ID
    } []): MigrateComplete[] {
        return args.map(function(arg) {
            return new MigrateComplete(arg.package_)
        })
    }

    static get bcs() {
        return bcs_import.struct("MigrateComplete", {
            package_: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new MigrateComplete(val.package_),
        });
    };
}

export function migrate(tx: Transaction, arg0: State | TransactionArgument, arg1: number[] | TransactionArgument, arg2: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[]))), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::migrate`,
        arguments: args,
    })
}

export function handle_migrate(tx: Transaction, arg0: State | TransactionArgument, arg1: number[] | TransactionArgument, arg2: Clock | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[]))), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Clock).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::handle_migrate`,
        arguments: args,
    })
}

export const migrate = {
    MigrateComplete,
    migrate,
    handle_migrate
}