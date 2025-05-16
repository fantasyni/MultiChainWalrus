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
let MODULE_NAME: string = "message_walrus";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== MessageWalrus =============================== */

export class MessageWalrus implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::MessageWalrus`;

    payloadID: number;
    message: number[];

    constructor(payloadID: number, message: number[]) {
        this.payloadID = payloadID;
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
        return MessageWalrus.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return MessageWalrus.from_bcs_vector(args)
    }

    get_bcs() {
        return MessageWalrus.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::MessageWalrus`
    }

    from(arg: MessageWalrus) {
        this.payloadID = arg.payloadID;
        this.message = arg.message;
    }

    static from_bcs(arg: {
        payloadID: number,
        message: number[]
    }): MessageWalrus {
        return new MessageWalrus(arg.payloadID, arg.message)
    }

    static from_bcs_vector(args: {
        payloadID: number,
        message: number[]
    } []): MessageWalrus[] {
        return args.map(function(arg) {
            return new MessageWalrus(arg.payloadID, arg.message)
        })
    }

    static get bcs() {
        return bcs_import.struct("MessageWalrus", {
            payloadID: bcs_import.u8(),
            message: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new MessageWalrus(val.payloadID, val.message),
        });
    };
}

export function into_message(tx: Transaction, arg0: MessageWalrus | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(MessageWalrus.bcs.serialize((arg0 as MessageWalrus)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::into_message`,
        arguments: args,
    })
}

export function encode_message_walrus(tx: Transaction, arg0: MessageWalrus | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(MessageWalrus.bcs.serialize((arg0 as MessageWalrus)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::encode_message_walrus`,
        arguments: args,
    })
}

export function build_and_encode_message_walrus(tx: Transaction, arg0: number | TransactionArgument, arg1: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::build_and_encode_message_walrus`,
        arguments: args,
    })
}

export function parse_message_walrus(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::parse_message_walrus`,
        arguments: args,
    })
}

export const message_walrus = {
    MessageWalrus,
    into_message,
    encode_message_walrus,
    build_and_encode_message_walrus,
    parse_message_walrus
}