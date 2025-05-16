import {
    VAA
} from "../Wormhole/vaa";
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

let PACKAGE_NAME: string = "MultiChainWalrus";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000000";
let MODULE_NAME: string = "multichain_walrus";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== WalrusMessageRedeemed =============================== */

export class WalrusMessageRedeemed implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::WalrusMessageRedeemed`;

    message: string;

    constructor(message: string) {
        this.message = message;
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
        return WalrusMessageRedeemed.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return WalrusMessageRedeemed.from_bcs_vector(args)
    }

    get_bcs() {
        return WalrusMessageRedeemed.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::WalrusMessageRedeemed`
    }

    from(arg: WalrusMessageRedeemed) {
        this.message = arg.message;
    }

    static from_bcs(arg: {
        message: string
    }): WalrusMessageRedeemed {
        return new WalrusMessageRedeemed(arg.message)
    }

    static from_bcs_vector(args: {
        message: string
    } []): WalrusMessageRedeemed[] {
        return args.map(function(arg) {
            return new WalrusMessageRedeemed(arg.message)
        })
    }

    static get bcs() {
        return bcs_import.struct("WalrusMessageRedeemed", {
            message: bcs_import.string(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new WalrusMessageRedeemed(val.message),
        });
    };
}

export function redeem_walrus_message(tx: Transaction, arg0: State | TransactionArgument, arg1: VAA | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(VAA.bcs.serialize((arg1 as VAA)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::redeem_walrus_message`,
        arguments: args,
    })
}

export const multichain_walrus = {
    WalrusMessageRedeemed,
    redeem_walrus_message
}