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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "url";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Url =============================== */

export class Url implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Url`;

    url: string;

    constructor(url: string) {
        this.url = url;
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
        return Url.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Url.from_bcs_vector(args)
    }

    get_bcs() {
        return Url.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Url`
    }

    from(arg: Url) {
        this.url = arg.url;
    }

    static from_bcs(arg: {
        url: string
    }): Url {
        return new Url(arg.url)
    }

    static from_bcs_vector(args: {
        url: string
    } []): Url[] {
        return args.map(function(arg) {
            return new Url(arg.url)
        })
    }

    static get bcs() {
        return bcs_import.struct("Url", {
            url: bcs_import.string(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Url(val.url),
        });
    };
}

export function new_unsafe(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_unsafe`,
        arguments: args,
    })
}

export function new_unsafe_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_unsafe_from_bytes`,
        arguments: args,
    })
}

export function inner_url(tx: Transaction, arg0: Url | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Url.bcs.serialize((arg0 as Url)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::inner_url`,
        arguments: args,
    })
}

export function update(tx: Transaction, arg0: Url | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Url.bcs.serialize((arg0 as Url))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.string().serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update`,
        arguments: args,
    })
}

export const url = {
    Url,
    new_unsafe,
    new_unsafe_from_bytes,
    inner_url,
    update
}