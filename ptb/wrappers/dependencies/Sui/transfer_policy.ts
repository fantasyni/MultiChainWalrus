import {
    Option
} from "../MoveStdlib/option";
import {
    TypeName
} from "../MoveStdlib/type_name";
import {
    Balance
} from "./balance";
import {
    Coin
} from "./coin";
import {
    ID,
    UID
} from "./object";
import {
    Publisher
} from "./package";
import {
    VecSet
} from "./vec_set";
import {
    StructClass,
    U64,
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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "transfer_policy";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== TransferRequest =============================== */

export class TransferRequest implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransferRequest`;

    item: ID;
    paid: u64_import;
    from: ID;
    receipts: VecSet < TypeName > ;

    constructor(item: ID, paid: u64_import, from: ID, receipts: VecSet < TypeName > ) {
        this.item = item;
        this.paid = paid;
        this.from = from;
        this.receipts = receipts;
    }

    into_value() {
        return {
            item: (this.item as unknown as StructClass).into_value ? (this.item as unknown as StructClass).into_value() : this.item,
            paid: (this.paid as unknown as StructClass).into_value ? (this.paid as unknown as StructClass).into_value() : this.paid,
            from: (this.from as unknown as StructClass).into_value ? (this.from as unknown as StructClass).into_value() : this.from,
            receipts: (this.receipts as unknown as StructClass).into_value ? (this.receipts as unknown as StructClass).into_value() : this.receipts
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
        return TransferRequest.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransferRequest.from_bcs_vector(args)
    }

    get_bcs() {
        return TransferRequest.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransferRequest`
    }

    from(arg: TransferRequest) {
        this.item = arg.item;
        this.paid = arg.paid;
        this.from = arg.from;
        this.receipts = arg.receipts;
    }

    static from_bcs(arg: {
        item: ID,
        paid: u64_import,
        from: ID,
        receipts: VecSet < TypeName >
    }): TransferRequest {
        return new TransferRequest(arg.item, arg.paid, arg.from, arg.receipts)
    }

    static from_bcs_vector(args: {
        item: ID,
        paid: u64_import,
        from: ID,
        receipts: VecSet < TypeName >
    } []): TransferRequest[] {
        return args.map(function(arg) {
            return new TransferRequest(arg.item, arg.paid, arg.from, arg.receipts)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransferRequest", {
            item: ID.bcs,
            paid: bcs_import.u64(),
            from: ID.bcs,
            receipts: VecSet.bcs(TypeName.bcs),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransferRequest(val.item, val.paid, val.from, val.receipts),
        });
    };
}

/* ============================== TransferPolicy =============================== */

export class TransferPolicy implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransferPolicy`;

    id: UID;
    balance ? : Balance;
    rules ? : VecSet < TypeName > ;

    constructor(id: UID, balance ? : Balance, rules ? : VecSet < TypeName > ) {
        this.id = id;
        this.balance = balance;
        this.rules = rules;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            balance: (this.balance as unknown as StructClass).into_value ? (this.balance as unknown as StructClass).into_value() : this.balance,
            rules: (this.rules as unknown as StructClass).into_value ? (this.rules as unknown as StructClass).into_value() : this.rules
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
        return TransferPolicy.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransferPolicy.from_bcs_vector(args)
    }

    get_bcs() {
        return TransferPolicy.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new TransferPolicy(UID.from_id(id));
    }

    static from_id(id: string) {
        return new TransferPolicy(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransferPolicy`
    }

    from(arg: TransferPolicy) {
        this.id = arg.id;
        this.balance = arg.balance;
        this.rules = arg.rules;
    }

    static from_bcs(arg: {
        id: UID,
        balance: Balance,
        rules: VecSet < TypeName >
    }): TransferPolicy {
        return new TransferPolicy(arg.id, arg.balance, arg.rules)
    }

    static from_bcs_vector(args: {
        id: UID,
        balance: Balance,
        rules: VecSet < TypeName >
    } []): TransferPolicy[] {
        return args.map(function(arg) {
            return new TransferPolicy(arg.id, arg.balance, arg.rules)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransferPolicy", {
            id: UID.bcs,
            balance: Balance.bcs,
            rules: VecSet.bcs(TypeName.bcs),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransferPolicy(val.id, val.balance, val.rules),
        });
    };
}

/* ============================== TransferPolicyCap =============================== */

export class TransferPolicyCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransferPolicyCap`;

    id: UID;
    policy_id ? : ID;

    constructor(id: UID, policy_id ? : ID) {
        this.id = id;
        this.policy_id = policy_id;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            policy_id: (this.policy_id as unknown as StructClass).into_value ? (this.policy_id as unknown as StructClass).into_value() : this.policy_id
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
        return TransferPolicyCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransferPolicyCap.from_bcs_vector(args)
    }

    get_bcs() {
        return TransferPolicyCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new TransferPolicyCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new TransferPolicyCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransferPolicyCap`
    }

    from(arg: TransferPolicyCap) {
        this.id = arg.id;
        this.policy_id = arg.policy_id;
    }

    static from_bcs(arg: {
        id: UID,
        policy_id: ID
    }): TransferPolicyCap {
        return new TransferPolicyCap(arg.id, arg.policy_id)
    }

    static from_bcs_vector(args: {
        id: UID,
        policy_id: ID
    } []): TransferPolicyCap[] {
        return args.map(function(arg) {
            return new TransferPolicyCap(arg.id, arg.policy_id)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransferPolicyCap", {
            id: UID.bcs,
            policy_id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransferPolicyCap(val.id, val.policy_id),
        });
    };
}

/* ============================== TransferPolicyCreated =============================== */

export class TransferPolicyCreated implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransferPolicyCreated`;

    id: ID;

    constructor(id: ID) {
        this.id = id;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id
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
        return TransferPolicyCreated.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransferPolicyCreated.from_bcs_vector(args)
    }

    get_bcs() {
        return TransferPolicyCreated.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransferPolicyCreated`
    }

    from(arg: TransferPolicyCreated) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: ID
    }): TransferPolicyCreated {
        return new TransferPolicyCreated(arg.id)
    }

    static from_bcs_vector(args: {
        id: ID
    } []): TransferPolicyCreated[] {
        return args.map(function(arg) {
            return new TransferPolicyCreated(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransferPolicyCreated", {
            id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransferPolicyCreated(val.id),
        });
    };
}

/* ============================== TransferPolicyDestroyed =============================== */

export class TransferPolicyDestroyed implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TransferPolicyDestroyed`;

    id: ID;

    constructor(id: ID) {
        this.id = id;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id
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
        return TransferPolicyDestroyed.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TransferPolicyDestroyed.from_bcs_vector(args)
    }

    get_bcs() {
        return TransferPolicyDestroyed.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TransferPolicyDestroyed`
    }

    from(arg: TransferPolicyDestroyed) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: ID
    }): TransferPolicyDestroyed {
        return new TransferPolicyDestroyed(arg.id)
    }

    static from_bcs_vector(args: {
        id: ID
    } []): TransferPolicyDestroyed[] {
        return args.map(function(arg) {
            return new TransferPolicyDestroyed(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("TransferPolicyDestroyed", {
            id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TransferPolicyDestroyed(val.id),
        });
    };
}

/* ============================== RuleKey =============================== */

export class RuleKey implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::RuleKey`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
    }

    into_value() {
        return {
            dummy_field: (this.dummy_field as unknown as StructClass).into_value ? (this.dummy_field as unknown as StructClass).into_value() : this.dummy_field
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
        return RuleKey.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return RuleKey.from_bcs_vector(args)
    }

    get_bcs() {
        return RuleKey.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::RuleKey`
    }

    from(arg: RuleKey) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): RuleKey {
        return new RuleKey(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): RuleKey[] {
        return args.map(function(arg) {
            return new RuleKey(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("RuleKey", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new RuleKey(val.dummy_field),
        });
    };
}

function new_(tx: Transaction, type_args: string[], arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        typeArguments: type_args,
        arguments: args,
    })
}

function default_(tx: Transaction, type_args: string[], arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::default`,
        typeArguments: type_args,
        arguments: args,
    })
}

function withdraw < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument, arg1: TransferPolicyCap | TransactionArgument, arg2: Option < U64 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TransferPolicyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Option < U64 > ).serialize((arg2 as Option < U64 > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::withdraw`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_request(tx: Transaction, type_args: string[], arg0: ID | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ID).serialize((arg0 as ID).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_request`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_and_withdraw < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument, arg1: TransferPolicyCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TransferPolicyCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_and_withdraw`,
        typeArguments: type_args,
        arguments: args,
    })
}

function confirm_request < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument, arg1: TransferRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as TransferRequest).serialize((arg1 as TransferRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::confirm_request`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_rule < T0 extends StructClass, T1 extends StructClass, T2 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: TransferPolicy | TransactionArgument, arg2: TransferPolicyCap | TransactionArgument, arg3: T2 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TransferPolicy).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as TransferPolicyCap).$id()), isTransactionArgument(arg3) ? arg3 : tx.pure((arg3 as T2).serialize((arg3 as T2).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_rule`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_rule < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: TransferPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TransferPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_rule`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_to_balance < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: TransferPolicy | TransactionArgument, arg2: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TransferPolicy).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_to_balance`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_receipt < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: TransferRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as TransferRequest).serialize((arg1 as TransferRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_receipt`,
        typeArguments: type_args,
        arguments: args,
    })
}

function has_rule < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::has_rule`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove_rule < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument, arg1: TransferPolicyCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TransferPolicyCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove_rule`,
        typeArguments: type_args,
        arguments: args,
    })
}

function uid < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid`,
        typeArguments: type_args,
        arguments: args,
    })
}

function uid_mut_as_owner < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument, arg1: TransferPolicyCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TransferPolicyCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_mut_as_owner`,
        typeArguments: type_args,
        arguments: args,
    })
}

function rules < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TransferPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::rules`,
        typeArguments: type_args,
        arguments: args,
    })
}

function item < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TransferRequest).serialize((arg0 as TransferRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::item`,
        typeArguments: type_args,
        arguments: args,
    })
}

function paid < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TransferRequest).serialize((arg0 as TransferRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::paid`,
        typeArguments: type_args,
        arguments: args,
    })
}

function from < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TransferRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as TransferRequest).serialize((arg0 as TransferRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const transfer_policy = {
    TransferRequest,
    TransferPolicy,
    TransferPolicyCap,
    TransferPolicyCreated,
    TransferPolicyDestroyed,
    RuleKey,
    new_,
    default_,
    withdraw,
    new_request,
    destroy_and_withdraw,
    confirm_request,
    add_rule,
    get_rule,
    add_to_balance,
    add_receipt,
    has_rule,
    remove_rule,
    uid,
    uid_mut_as_owner,
    rules,
    item,
    paid,
    from
}