import {
    Balance
} from "../Sui/balance";
import {
    Coin
} from "../Sui/coin";
import {
    StructClass,
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
let MODULE_NAME: string = "fee_collector";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== FeeCollector =============================== */

export class FeeCollector implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::FeeCollector`;

    fee_amount: u64_import;
    balance: Balance;

    constructor(fee_amount: u64_import, balance: Balance) {
        this.fee_amount = fee_amount;
        this.balance = balance;
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
        return FeeCollector.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return FeeCollector.from_bcs_vector(args)
    }

    get_bcs() {
        return FeeCollector.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::FeeCollector`
    }

    from(arg: FeeCollector) {
        this.fee_amount = arg.fee_amount;
        this.balance = arg.balance;
    }

    static from_bcs(arg: {
        fee_amount: u64_import,
        balance: Balance
    }): FeeCollector {
        return new FeeCollector(arg.fee_amount, arg.balance)
    }

    static from_bcs_vector(args: {
        fee_amount: u64_import,
        balance: Balance
    } []): FeeCollector[] {
        return args.map(function(arg) {
            return new FeeCollector(arg.fee_amount, arg.balance)
        })
    }

    static get bcs() {
        return bcs_import.struct("FeeCollector", {
            fee_amount: bcs_import.u64(),
            balance: Balance.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new FeeCollector(val.fee_amount, val.balance),
        });
    };
}

export function new_(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function fee_amount(tx: Transaction, arg0: FeeCollector | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FeeCollector.bcs.serialize((arg0 as FeeCollector)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::fee_amount`,
        arguments: args,
    })
}

export function balance_value(tx: Transaction, arg0: FeeCollector | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FeeCollector.bcs.serialize((arg0 as FeeCollector)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::balance_value`,
        arguments: args,
    })
}

export function deposit_balance(tx: Transaction, arg0: FeeCollector | TransactionArgument, arg1: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FeeCollector.bcs.serialize((arg0 as FeeCollector))), isTransactionArgument(arg1) ? arg1 : tx.pure(Balance.bcs.serialize((arg1 as Balance)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deposit_balance`,
        arguments: args,
    })
}

export function deposit(tx: Transaction, arg0: FeeCollector | TransactionArgument, arg1: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FeeCollector.bcs.serialize((arg0 as FeeCollector))), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deposit`,
        arguments: args,
    })
}

export function withdraw_balance(tx: Transaction, arg0: FeeCollector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FeeCollector.bcs.serialize((arg0 as FeeCollector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::withdraw_balance`,
        arguments: args,
    })
}

export function withdraw(tx: Transaction, arg0: FeeCollector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FeeCollector.bcs.serialize((arg0 as FeeCollector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::withdraw`,
        arguments: args,
    })
}

export function change_fee(tx: Transaction, arg0: FeeCollector | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(FeeCollector.bcs.serialize((arg0 as FeeCollector))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::change_fee`,
        arguments: args,
    })
}

export const fee_collector = {
    FeeCollector,
    new_,
    fee_amount,
    balance_value,
    deposit_balance,
    deposit,
    withdraw_balance,
    withdraw,
    change_fee
}