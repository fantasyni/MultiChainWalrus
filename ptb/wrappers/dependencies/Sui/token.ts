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
    Coin,
    TreasuryCap
} from "./coin";
import {
    ID,
    UID
} from "./object";
import {
    VecMap
} from "./vec_map";
import {
    VecSet
} from "./vec_set";
import {
    Address,
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
let MODULE_NAME: string = "token";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== RuleKey =============================== */

export class RuleKey implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::RuleKey`;

    is_protected: boolean;

    constructor(is_protected: boolean) {
        this.is_protected = is_protected;
    }

    into_value() {
        return {
            is_protected: (this.is_protected as unknown as StructClass).into_value ? (this.is_protected as unknown as StructClass).into_value() : this.is_protected
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
        this.is_protected = arg.is_protected;
    }

    static from_bcs(arg: {
        is_protected: boolean
    }): RuleKey {
        return new RuleKey(arg.is_protected)
    }

    static from_bcs_vector(args: {
        is_protected: boolean
    } []): RuleKey[] {
        return args.map(function(arg) {
            return new RuleKey(arg.is_protected)
        })
    }

    static get bcs() {
        return bcs_import.struct("RuleKey", {
            is_protected: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new RuleKey(val.is_protected),
        });
    };
}

/* ============================== Token =============================== */

export class Token implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Token`;

    id: UID;
    balance ? : Balance;

    constructor(id: UID, balance ? : Balance) {
        this.id = id;
        this.balance = balance;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            balance: (this.balance as unknown as StructClass).into_value ? (this.balance as unknown as StructClass).into_value() : this.balance
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
        return Token.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Token.from_bcs_vector(args)
    }

    get_bcs() {
        return Token.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Token(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Token(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Token`
    }

    from(arg: Token) {
        this.id = arg.id;
        this.balance = arg.balance;
    }

    static from_bcs(arg: {
        id: UID,
        balance: Balance
    }): Token {
        return new Token(arg.id, arg.balance)
    }

    static from_bcs_vector(args: {
        id: UID,
        balance: Balance
    } []): Token[] {
        return args.map(function(arg) {
            return new Token(arg.id, arg.balance)
        })
    }

    static get bcs() {
        return bcs_import.struct("Token", {
            id: UID.bcs,
            balance: Balance.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Token(val.id, val.balance),
        });
    };
}

/* ============================== TokenPolicyCap =============================== */

export class TokenPolicyCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TokenPolicyCap`;

    id: UID;
    for_ ? : ID;

    constructor(id: UID, for_ ? : ID) {
        this.id = id;
        this.for_ = for_;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            for_: (this.for_ as unknown as StructClass).into_value ? (this.for_ as unknown as StructClass).into_value() : this.for_
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
        return TokenPolicyCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TokenPolicyCap.from_bcs_vector(args)
    }

    get_bcs() {
        return TokenPolicyCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new TokenPolicyCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new TokenPolicyCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TokenPolicyCap`
    }

    from(arg: TokenPolicyCap) {
        this.id = arg.id;
        this.for_ = arg.for_;
    }

    static from_bcs(arg: {
        id: UID,
        for_: ID
    }): TokenPolicyCap {
        return new TokenPolicyCap(arg.id, arg.for_)
    }

    static from_bcs_vector(args: {
        id: UID,
        for_: ID
    } []): TokenPolicyCap[] {
        return args.map(function(arg) {
            return new TokenPolicyCap(arg.id, arg.for_)
        })
    }

    static get bcs() {
        return bcs_import.struct("TokenPolicyCap", {
            id: UID.bcs,
            for_: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TokenPolicyCap(val.id, val.for_),
        });
    };
}

/* ============================== TokenPolicy =============================== */

export class TokenPolicy implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TokenPolicy`;

    id: UID;
    spent_balance ? : Balance;
    rules ? : VecMap < string,
    VecSet < TypeName >> ;

    constructor(id: UID, spent_balance ? : Balance, rules ? : VecMap < string, VecSet < TypeName >> ) {
        this.id = id;
        this.spent_balance = spent_balance;
        this.rules = rules;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            spent_balance: (this.spent_balance as unknown as StructClass).into_value ? (this.spent_balance as unknown as StructClass).into_value() : this.spent_balance,
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
        return TokenPolicy.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TokenPolicy.from_bcs_vector(args)
    }

    get_bcs() {
        return TokenPolicy.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new TokenPolicy(UID.from_id(id));
    }

    static from_id(id: string) {
        return new TokenPolicy(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TokenPolicy`
    }

    from(arg: TokenPolicy) {
        this.id = arg.id;
        this.spent_balance = arg.spent_balance;
        this.rules = arg.rules;
    }

    static from_bcs(arg: {
        id: UID,
        spent_balance: Balance,
        rules: VecMap < string,
        VecSet < TypeName >>
    }): TokenPolicy {
        return new TokenPolicy(arg.id, arg.spent_balance, arg.rules)
    }

    static from_bcs_vector(args: {
        id: UID,
        spent_balance: Balance,
        rules: VecMap < string,
        VecSet < TypeName >>
    } []): TokenPolicy[] {
        return args.map(function(arg) {
            return new TokenPolicy(arg.id, arg.spent_balance, arg.rules)
        })
    }

    static get bcs() {
        return bcs_import.struct("TokenPolicy", {
            id: UID.bcs,
            spent_balance: Balance.bcs,
            rules: VecMap.bcs(bcs_import.string(), VecSet.bcs(TypeName.bcs)),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TokenPolicy(val.id, val.spent_balance, val.rules),
        });
    };
}

/* ============================== ActionRequest =============================== */

export class ActionRequest implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ActionRequest`;

    name: string;
    amount: u64_import;
    sender: string;
    recipient: Option < string > ;
    spent_balance: Option < Balance > ;
    approvals: VecSet < TypeName > ;

    constructor(name: string, amount: u64_import, sender: string, recipient: Option < string > , spent_balance: Option < Balance > , approvals: VecSet < TypeName > ) {
        this.name = name;
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.spent_balance = spent_balance;
        this.approvals = approvals;
    }

    into_value() {
        return {
            name: (this.name as unknown as StructClass).into_value ? (this.name as unknown as StructClass).into_value() : this.name,
            amount: (this.amount as unknown as StructClass).into_value ? (this.amount as unknown as StructClass).into_value() : this.amount,
            sender: (this.sender as unknown as StructClass).into_value ? (this.sender as unknown as StructClass).into_value() : this.sender,
            recipient: (this.recipient as unknown as StructClass).into_value ? (this.recipient as unknown as StructClass).into_value() : this.recipient,
            spent_balance: (this.spent_balance as unknown as StructClass).into_value ? (this.spent_balance as unknown as StructClass).into_value() : this.spent_balance,
            approvals: (this.approvals as unknown as StructClass).into_value ? (this.approvals as unknown as StructClass).into_value() : this.approvals
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
        return ActionRequest.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ActionRequest.from_bcs_vector(args)
    }

    get_bcs() {
        return ActionRequest.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ActionRequest`
    }

    from(arg: ActionRequest) {
        this.name = arg.name;
        this.amount = arg.amount;
        this.sender = arg.sender;
        this.recipient = arg.recipient;
        this.spent_balance = arg.spent_balance;
        this.approvals = arg.approvals;
    }

    static from_bcs(arg: {
        name: string,
        amount: u64_import,
        sender: string,
        recipient: Option < string > ,
        spent_balance: Option < Balance > ,
        approvals: VecSet < TypeName >
    }): ActionRequest {
        return new ActionRequest(arg.name, arg.amount, arg.sender, arg.recipient, arg.spent_balance, arg.approvals)
    }

    static from_bcs_vector(args: {
        name: string,
        amount: u64_import,
        sender: string,
        recipient: Option < string > ,
        spent_balance: Option < Balance > ,
        approvals: VecSet < TypeName >
    } []): ActionRequest[] {
        return args.map(function(arg) {
            return new ActionRequest(arg.name, arg.amount, arg.sender, arg.recipient, arg.spent_balance, arg.approvals)
        })
    }

    static get bcs() {
        return bcs_import.struct("ActionRequest", {
            name: bcs_import.string(),
            amount: bcs_import.u64(),
            sender: bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            }),
            recipient: Option.bcs(bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            })),
            spent_balance: Option.bcs(Balance.bcs),
            approvals: VecSet.bcs(TypeName.bcs),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ActionRequest(val.name, val.amount, val.sender, val.recipient, val.spent_balance, val.approvals),
        });
    };
}

/* ============================== TokenPolicyCreated =============================== */

export class TokenPolicyCreated implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TokenPolicyCreated`;

    id: ID;
    is_mutable: boolean;

    constructor(id: ID, is_mutable: boolean) {
        this.id = id;
        this.is_mutable = is_mutable;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            is_mutable: (this.is_mutable as unknown as StructClass).into_value ? (this.is_mutable as unknown as StructClass).into_value() : this.is_mutable
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
        return TokenPolicyCreated.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TokenPolicyCreated.from_bcs_vector(args)
    }

    get_bcs() {
        return TokenPolicyCreated.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TokenPolicyCreated`
    }

    from(arg: TokenPolicyCreated) {
        this.id = arg.id;
        this.is_mutable = arg.is_mutable;
    }

    static from_bcs(arg: {
        id: ID,
        is_mutable: boolean
    }): TokenPolicyCreated {
        return new TokenPolicyCreated(arg.id, arg.is_mutable)
    }

    static from_bcs_vector(args: {
        id: ID,
        is_mutable: boolean
    } []): TokenPolicyCreated[] {
        return args.map(function(arg) {
            return new TokenPolicyCreated(arg.id, arg.is_mutable)
        })
    }

    static get bcs() {
        return bcs_import.struct("TokenPolicyCreated", {
            id: ID.bcs,
            is_mutable: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TokenPolicyCreated(val.id, val.is_mutable),
        });
    };
}

function sender < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ActionRequest).serialize((arg0 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sender`,
        typeArguments: type_args,
        arguments: args,
    })
}

function transfer < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::transfer`,
        typeArguments: type_args,
        arguments: args,
    })
}

function value < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::value`,
        typeArguments: type_args,
        arguments: args,
    })
}

function key(tx: Transaction, type_args: string[]) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::key`,
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

function join < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument, arg1: Token | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Token).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::join`,
        typeArguments: type_args,
        arguments: args,
    })
}

function split < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::split`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_zero < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_zero`,
        typeArguments: type_args,
        arguments: args,
    })
}

function mint < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::mint`,
        typeArguments: type_args,
        arguments: args,
    })
}

function burn < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: Token | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Token).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::burn`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_request < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: string | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: Option < Address > | TransactionArgument, arg3: Option < Balance > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as string).serialize((arg0 as string).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Option < Address > ).serialize((arg2 as Option < Address > ).into_value())), isTransactionArgument(arg3) ? arg3 : tx.pure((arg3 as Option < Balance > ).serialize((arg3 as Option < Balance > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_request`,
        typeArguments: type_args,
        arguments: args,
    })
}

function confirm_request < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as ActionRequest).serialize((arg1 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::confirm_request`,
        typeArguments: type_args,
        arguments: args,
    })
}

function rules < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as string).serialize((arg1 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::rules`,
        typeArguments: type_args,
        arguments: args,
    })
}

function keep < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::keep`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_policy < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_policy`,
        typeArguments: type_args,
        arguments: args,
    })
}

function share_policy < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::share_policy`,
        typeArguments: type_args,
        arguments: args,
    })
}

function spend < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::spend`,
        typeArguments: type_args,
        arguments: args,
    })
}

function to_coin < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Token | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Token).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_coin`,
        typeArguments: type_args,
        arguments: args,
    })
}

function from_coin < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_coin`,
        typeArguments: type_args,
        arguments: args,
    })
}

function confirm_request_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as ActionRequest).serialize((arg1 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::confirm_request_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function confirm_with_policy_cap < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicyCap | TransactionArgument, arg1: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicyCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as ActionRequest).serialize((arg1 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::confirm_with_policy_cap`,
        typeArguments: type_args,
        arguments: args,
    })
}

function confirm_with_treasury_cap < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as ActionRequest).serialize((arg1 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::confirm_with_treasury_cap`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_approval < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as ActionRequest).serialize((arg1 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_approval`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_rule_config < T0 extends StructClass, T1 extends StructClass, T2 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: TokenPolicy | TransactionArgument, arg2: TokenPolicyCap | TransactionArgument, arg3: T2 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicy).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as TokenPolicyCap).$id()), isTransactionArgument(arg3) ? arg3 : tx.pure((arg3 as T2).serialize((arg3 as T2).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_rule_config`,
        typeArguments: type_args,
        arguments: args,
    })
}

function rule_config < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: TokenPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::rule_config`,
        typeArguments: type_args,
        arguments: args,
    })
}

function rule_config_mut < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: T1 | TransactionArgument, arg1: TokenPolicy | TransactionArgument, arg2: TokenPolicyCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T1).serialize((arg0 as T1).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicy).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as TokenPolicyCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::rule_config_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove_rule_config < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: TokenPolicyCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicyCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove_rule_config`,
        typeArguments: type_args,
        arguments: args,
    })
}

function has_rule_config < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::has_rule_config`,
        typeArguments: type_args,
        arguments: args,
    })
}

function has_rule_config_with_type < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::has_rule_config_with_type`,
        typeArguments: type_args,
        arguments: args,
    })
}

function allow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: TokenPolicyCap | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::allow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function disallow < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: TokenPolicyCap | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::disallow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_rule_for_action < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: TokenPolicyCap | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_rule_for_action`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove_rule_for_action < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: TokenPolicyCap | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TokenPolicyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove_rule_for_action`,
        typeArguments: type_args,
        arguments: args,
    })
}

function flush < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: TreasuryCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as TreasuryCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::flush`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_allowed < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as string).serialize((arg1 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_allowed`,
        typeArguments: type_args,
        arguments: args,
    })
}

function spent_balance < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TokenPolicy | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TokenPolicy).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::spent_balance`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function transfer_action(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::transfer_action`,
        arguments: args,
    })
}

export function spend_action(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::spend_action`,
        arguments: args,
    })
}

export function to_coin_action(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_coin_action`,
        arguments: args,
    })
}

export function from_coin_action(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_coin_action`,
        arguments: args,
    })
}

function action < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ActionRequest).serialize((arg0 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::action`,
        typeArguments: type_args,
        arguments: args,
    })
}

function amount < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ActionRequest).serialize((arg0 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::amount`,
        typeArguments: type_args,
        arguments: args,
    })
}

function recipient < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ActionRequest).serialize((arg0 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::recipient`,
        typeArguments: type_args,
        arguments: args,
    })
}

function approvals < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ActionRequest).serialize((arg0 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::approvals`,
        typeArguments: type_args,
        arguments: args,
    })
}

function spent < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ActionRequest | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ActionRequest).serialize((arg0 as ActionRequest).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::spent`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const token = {
    RuleKey,
    Token,
    TokenPolicyCap,
    TokenPolicy,
    ActionRequest,
    TokenPolicyCreated,
    sender,
    transfer,
    value,
    key,
    zero,
    join,
    split,
    destroy_zero,
    mint,
    burn,
    new_request,
    confirm_request,
    rules,
    keep,
    new_policy,
    share_policy,
    spend,
    to_coin,
    from_coin,
    confirm_request_mut,
    confirm_with_policy_cap,
    confirm_with_treasury_cap,
    add_approval,
    add_rule_config,
    rule_config,
    rule_config_mut,
    remove_rule_config,
    has_rule_config,
    has_rule_config_with_type,
    allow,
    disallow,
    add_rule_for_action,
    remove_rule_for_action,
    flush,
    is_allowed,
    spent_balance,
    transfer_action,
    spend_action,
    to_coin_action,
    from_coin_action,
    action,
    amount,
    recipient,
    approvals,
    spent
}