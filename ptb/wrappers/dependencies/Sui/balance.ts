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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "balance";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Supply =============================== */

export class Supply implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Supply`;

    value: u64_import;

    constructor(value: u64_import) {
        this.value = value;
    }

    into_value() {
        return {
            value: (this.value as unknown as StructClass).into_value ? (this.value as unknown as StructClass).into_value() : this.value
        }
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
        return Supply.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Supply.from_bcs_vector(args)
    }

    get_bcs() {
        return Supply.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Supply`
    }

    from(arg: Supply) {
        this.value = arg.value;
    }

    static from_bcs(arg: {
        value: u64_import
    }): Supply {
        return new Supply(arg.value)
    }

    static from_bcs_vector(args: {
        value: u64_import
    } []): Supply[] {
        return args.map(function(arg) {
            return new Supply(arg.value)
        })
    }

    static get bcs() {
        return bcs_import.struct("Supply", {
            value: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Supply(val.value),
        });
    };
}

/* ============================== Balance =============================== */

export class Balance implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Balance`;

    value: u64_import;

    constructor(value: u64_import) {
        this.value = value;
    }

    into_value() {
        return {
            value: (this.value as unknown as StructClass).into_value ? (this.value as unknown as StructClass).into_value() : this.value
        }
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
        return Balance.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Balance.from_bcs_vector(args)
    }

    get_bcs() {
        return Balance.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Balance`
    }

    from(arg: Balance) {
        this.value = arg.value;
    }

    static from_bcs(arg: {
        value: u64_import
    }): Balance {
        return new Balance(arg.value)
    }

    static from_bcs_vector(args: {
        value: u64_import
    } []): Balance[] {
        return args.map(function(arg) {
            return new Balance(arg.value)
        })
    }

    static get bcs() {
        return bcs_import.struct("Balance", {
            value: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Balance(val.value),
        });
    };
}

function value < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::value`,
        typeArguments: type_args,
        arguments: args,
    })
}

function supply_value < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Supply | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Supply).serialize((arg0 as Supply).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::supply_value`,
        typeArguments: type_args,
        arguments: args,
    })
}

function create_supply < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_supply`,
        typeArguments: type_args,
        arguments: args,
    })
}

function increase_supply < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Supply | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Supply).serialize((arg0 as Supply).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::increase_supply`,
        typeArguments: type_args,
        arguments: args,
    })
}

function decrease_supply < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Supply | TransactionArgument, arg1: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Supply).serialize((arg0 as Supply).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Balance).serialize((arg1 as Balance).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::decrease_supply`,
        typeArguments: type_args,
        arguments: args,
    })
}

function zero(tx: Transaction, type_args: string[]) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::zero`,
        typeArguments: type_args,
        arguments: args,
    })
}

function join < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument, arg1: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as Balance).serialize((arg1 as Balance).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::join`,
        typeArguments: type_args,
        arguments: args,
    })
}

function split < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::split`,
        typeArguments: type_args,
        arguments: args,
    })
}

function withdraw_all < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::withdraw_all`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_zero < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_zero`,
        typeArguments: type_args,
        arguments: args,
    })
}

function create_staking_rewards(tx: Transaction, type_args: string[], arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_staking_rewards`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_storage_rebates < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_storage_rebates`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_supply < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Supply | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Supply).serialize((arg0 as Supply).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_supply`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const balance = {
    Supply,
    Balance,
    value,
    supply_value,
    create_supply,
    increase_supply,
    decrease_supply,
    zero,
    join,
    split,
    withdraw_all,
    destroy_zero,
    create_staking_rewards,
    destroy_storage_rebates,
    destroy_supply
}