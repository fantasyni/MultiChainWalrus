import {
    Bytes32
} from "./bytes32";
import {
    Set
} from "./set";
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
let MODULE_NAME: string = "consumed_vaas";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== ConsumedVAAs =============================== */

export class ConsumedVAAs implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ConsumedVAAs`;

    hashes: Set;

    constructor(hashes: Set) {
        this.hashes = hashes;
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
        return ConsumedVAAs.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ConsumedVAAs.from_bcs_vector(args)
    }

    get_bcs() {
        return ConsumedVAAs.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ConsumedVAAs`
    }

    from(arg: ConsumedVAAs) {
        this.hashes = arg.hashes;
    }

    static from_bcs(arg: {
        hashes: Set
    }): ConsumedVAAs {
        return new ConsumedVAAs(arg.hashes)
    }

    static from_bcs_vector(args: {
        hashes: Set
    } []): ConsumedVAAs[] {
        return args.map(function(arg) {
            return new ConsumedVAAs(arg.hashes)
        })
    }

    static get bcs() {
        return bcs_import.struct("ConsumedVAAs", {
            hashes: Set.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ConsumedVAAs(val.hashes),
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

export function consume(tx: Transaction, arg0: ConsumedVAAs | TransactionArgument, arg1: Bytes32 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(ConsumedVAAs.bcs.serialize((arg0 as ConsumedVAAs))), isTransactionArgument(arg1) ? arg1 : tx.pure(Bytes32.bcs.serialize((arg1 as Bytes32)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::consume`,
        arguments: args,
    })
}

export const consumed_vaas = {
    ConsumedVAAs,
    new_,
    consume
}