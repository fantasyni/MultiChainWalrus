import {
    Option
} from "../MoveStdlib/option";
import {
    Balance,
    Supply
} from "./balance";
import {
    DenyList
} from "./deny_list";
import {
    ID,
    UID
} from "./object";
import {
    Url
} from "./url";
import {
    StructClass,
    U8,
    get_object_address,
    get_package_address,
    has_arr,
    into_arr_bcs_vector,
    into_arr_value,
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
let MODULE_NAME: string = "coin";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Coin =============================== */

export class Coin implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Coin`;

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
        return Coin.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Coin.from_bcs_vector(args)
    }

    get_bcs() {
        return Coin.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Coin(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Coin(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Coin`
    }

    from(arg: Coin) {
        this.id = arg.id;
        this.balance = arg.balance;
    }

    static from_bcs(arg: {
        id: UID,
        balance: Balance
    }): Coin {
        return new Coin(arg.id, arg.balance)
    }

    static from_bcs_vector(args: {
        id: UID,
        balance: Balance
    } []): Coin[] {
        return args.map(function(arg) {
            return new Coin(arg.id, arg.balance)
        })
    }

    static get bcs() {
        return bcs_import.struct("Coin", {
            id: UID.bcs,
            balance: Balance.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Coin(val.id, val.balance),
        });
    };
}

/* ============================== CoinMetadata =============================== */

export class CoinMetadata implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::CoinMetadata`;

    id: UID;
    decimals ? : number;
    name ? : string;
    symbol ? : string;
    description ? : string;
    icon_url ? : Option < Url > ;

    constructor(id: UID, decimals ? : number, name ? : string, symbol ? : string, description ? : string, icon_url ? : Option < Url > ) {
        this.id = id;
        this.decimals = decimals;
        this.name = name;
        this.symbol = symbol;
        this.description = description;
        this.icon_url = icon_url;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            decimals: (this.decimals as unknown as StructClass).into_value ? (this.decimals as unknown as StructClass).into_value() : this.decimals,
            name: (this.name as unknown as StructClass).into_value ? (this.name as unknown as StructClass).into_value() : this.name,
            symbol: (this.symbol as unknown as StructClass).into_value ? (this.symbol as unknown as StructClass).into_value() : this.symbol,
            description: (this.description as unknown as StructClass).into_value ? (this.description as unknown as StructClass).into_value() : this.description,
            icon_url: (this.icon_url as unknown as StructClass).into_value ? (this.icon_url as unknown as StructClass).into_value() : this.icon_url
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
        return CoinMetadata.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return CoinMetadata.from_bcs_vector(args)
    }

    get_bcs() {
        return CoinMetadata.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new CoinMetadata(UID.from_id(id));
    }

    static from_id(id: string) {
        return new CoinMetadata(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::CoinMetadata`
    }

    from(arg: CoinMetadata) {
        this.id = arg.id;
        this.decimals = arg.decimals;
        this.name = arg.name;
        this.symbol = arg.symbol;
        this.description = arg.description;
        this.icon_url = arg.icon_url;
    }

    static from_bcs(arg: {
        id: UID,
        decimals: number,
        name: string,
        symbol: string,
        description: string,
        icon_url: Option < Url >
    }): CoinMetadata {
        return new CoinMetadata(arg.id, arg.decimals, arg.name, arg.symbol, arg.description, arg.icon_url)
    }

    static from_bcs_vector(args: {
        id: UID,
        decimals: number,
        name: string,
        symbol: string,
        description: string,
        icon_url: Option < Url >
    } []): CoinMetadata[] {
        return args.map(function(arg) {
            return new CoinMetadata(arg.id, arg.decimals, arg.name, arg.symbol, arg.description, arg.icon_url)
        })
    }

    static get bcs() {
        return bcs_import.struct("CoinMetadata", {
            id: UID.bcs,
            decimals: bcs_import.u8(),
            name: bcs_import.string(),
            symbol: bcs_import.string(),
            description: bcs_import.string(),
            icon_url: Option.bcs(Url.bcs),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new CoinMetadata(val.id, val.decimals, val.name, val.symbol, val.description, val.icon_url),
        });
    };
}

/* ============================== RegulatedCoinMetadata =============================== */

export class RegulatedCoinMetadata implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::RegulatedCoinMetadata`;

    id: UID;
    coin_metadata_object ? : ID;
    deny_cap_object ? : ID;

    constructor(id: UID, coin_metadata_object ? : ID, deny_cap_object ? : ID) {
        this.id = id;
        this.coin_metadata_object = coin_metadata_object;
        this.deny_cap_object = deny_cap_object;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            coin_metadata_object: (this.coin_metadata_object as unknown as StructClass).into_value ? (this.coin_metadata_object as unknown as StructClass).into_value() : this.coin_metadata_object,
            deny_cap_object: (this.deny_cap_object as unknown as StructClass).into_value ? (this.deny_cap_object as unknown as StructClass).into_value() : this.deny_cap_object
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
        return RegulatedCoinMetadata.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return RegulatedCoinMetadata.from_bcs_vector(args)
    }

    get_bcs() {
        return RegulatedCoinMetadata.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new RegulatedCoinMetadata(UID.from_id(id));
    }

    static from_id(id: string) {
        return new RegulatedCoinMetadata(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::RegulatedCoinMetadata`
    }

    from(arg: RegulatedCoinMetadata) {
        this.id = arg.id;
        this.coin_metadata_object = arg.coin_metadata_object;
        this.deny_cap_object = arg.deny_cap_object;
    }

    static from_bcs(arg: {
        id: UID,
        coin_metadata_object: ID,
        deny_cap_object: ID
    }): RegulatedCoinMetadata {
        return new RegulatedCoinMetadata(arg.id, arg.coin_metadata_object, arg.deny_cap_object)
    }

    static from_bcs_vector(args: {
        id: UID,
        coin_metadata_object: ID,
        deny_cap_object: ID
    } []): RegulatedCoinMetadata[] {
        return args.map(function(arg) {
            return new RegulatedCoinMetadata(arg.id, arg.coin_metadata_object, arg.deny_cap_object)
        })
    }

    static get bcs() {
        return bcs_import.struct("RegulatedCoinMetadata", {
            id: UID.bcs,
            coin_metadata_object: ID.bcs,
            deny_cap_object: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new RegulatedCoinMetadata(val.id, val.coin_metadata_object, val.deny_cap_object),
        });
    };
}

/* ============================== TreasuryCap =============================== */

export class TreasuryCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TreasuryCap`;

    id: UID;
    total_supply ? : Supply;

    constructor(id: UID, total_supply ? : Supply) {
        this.id = id;
        this.total_supply = total_supply;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            total_supply: (this.total_supply as unknown as StructClass).into_value ? (this.total_supply as unknown as StructClass).into_value() : this.total_supply
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
        return TreasuryCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TreasuryCap.from_bcs_vector(args)
    }

    get_bcs() {
        return TreasuryCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new TreasuryCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new TreasuryCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TreasuryCap`
    }

    from(arg: TreasuryCap) {
        this.id = arg.id;
        this.total_supply = arg.total_supply;
    }

    static from_bcs(arg: {
        id: UID,
        total_supply: Supply
    }): TreasuryCap {
        return new TreasuryCap(arg.id, arg.total_supply)
    }

    static from_bcs_vector(args: {
        id: UID,
        total_supply: Supply
    } []): TreasuryCap[] {
        return args.map(function(arg) {
            return new TreasuryCap(arg.id, arg.total_supply)
        })
    }

    static get bcs() {
        return bcs_import.struct("TreasuryCap", {
            id: UID.bcs,
            total_supply: Supply.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TreasuryCap(val.id, val.total_supply),
        });
    };
}

/* ============================== DenyCapV2 =============================== */

export class DenyCapV2 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::DenyCapV2`;

    id: UID;
    allow_global_pause ? : boolean;

    constructor(id: UID, allow_global_pause ? : boolean) {
        this.id = id;
        this.allow_global_pause = allow_global_pause;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            allow_global_pause: (this.allow_global_pause as unknown as StructClass).into_value ? (this.allow_global_pause as unknown as StructClass).into_value() : this.allow_global_pause
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
        return DenyCapV2.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return DenyCapV2.from_bcs_vector(args)
    }

    get_bcs() {
        return DenyCapV2.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new DenyCapV2(UID.from_id(id));
    }

    static from_id(id: string) {
        return new DenyCapV2(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::DenyCapV2`
    }

    from(arg: DenyCapV2) {
        this.id = arg.id;
        this.allow_global_pause = arg.allow_global_pause;
    }

    static from_bcs(arg: {
        id: UID,
        allow_global_pause: boolean
    }): DenyCapV2 {
        return new DenyCapV2(arg.id, arg.allow_global_pause)
    }

    static from_bcs_vector(args: {
        id: UID,
        allow_global_pause: boolean
    } []): DenyCapV2[] {
        return args.map(function(arg) {
            return new DenyCapV2(arg.id, arg.allow_global_pause)
        })
    }

    static get bcs() {
        return bcs_import.struct("DenyCapV2", {
            id: UID.bcs,
            allow_global_pause: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new DenyCapV2(val.id, val.allow_global_pause),
        });
    };
}

/* ============================== CurrencyCreated =============================== */

export class CurrencyCreated implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::CurrencyCreated`;

    decimals: number;

    constructor(decimals: number) {
        this.decimals = decimals;
    }

    into_value() {
        return {
            decimals: (this.decimals as unknown as StructClass).into_value ? (this.decimals as unknown as StructClass).into_value() : this.decimals
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
        return CurrencyCreated.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return CurrencyCreated.from_bcs_vector(args)
    }

    get_bcs() {
        return CurrencyCreated.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::CurrencyCreated`
    }

    from(arg: CurrencyCreated) {
        this.decimals = arg.decimals;
    }

    static from_bcs(arg: {
        decimals: number
    }): CurrencyCreated {
        return new CurrencyCreated(arg.decimals)
    }

    static from_bcs_vector(args: {
        decimals: number
    } []): CurrencyCreated[] {
        return args.map(function(arg) {
            return new CurrencyCreated(arg.decimals)
        })
    }

    static get bcs() {
        return bcs_import.struct("CurrencyCreated", {
            decimals: bcs_import.u8(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new CurrencyCreated(val.decimals),
        });
    };
}

/* ============================== DenyCap =============================== */

export class DenyCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::DenyCap`;

    id: UID;

    constructor(id: UID) {
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
        return DenyCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return DenyCap.from_bcs_vector(args)
    }

    get_bcs() {
        return DenyCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new DenyCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new DenyCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::DenyCap`
    }

    from(arg: DenyCap) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: UID
    }): DenyCap {
        return new DenyCap(arg.id)
    }

    static from_bcs_vector(args: {
        id: UID
    } []): DenyCap[] {
        return args.map(function(arg) {
            return new DenyCap(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("DenyCap", {
            id: UID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new DenyCap(val.id),
        });
    };
}

function take < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take`,
        typeArguments: type_args,
        arguments: args,
    })
}

function value < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::value`,
        typeArguments: type_args,
        arguments: args,
    })
}

function balance < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::balance`,
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

function join < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::join`,
        typeArguments: type_args,
        arguments: args,
    })
}

function split < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::split`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_zero < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_zero`,
        typeArguments: type_args,
        arguments: args,
    })
}

function total_supply < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::total_supply`,
        typeArguments: type_args,
        arguments: args,
    })
}

function treasury_into_supply < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::treasury_into_supply`,
        typeArguments: type_args,
        arguments: args,
    })
}

function supply_immut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::supply_immut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function supply_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::supply_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function balance_mut < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::balance_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function from_balance < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::from_balance`,
        typeArguments: type_args,
        arguments: args,
    })
}

function into_balance < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::into_balance`,
        typeArguments: type_args,
        arguments: args,
    })
}

function put < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Balance | TransactionArgument, arg1: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as Balance).serialize((arg0 as Balance).into_value())), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::put`,
        typeArguments: type_args,
        arguments: args,
    })
}

function divide_into_n < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Coin | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Coin).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::divide_into_n`,
        typeArguments: type_args,
        arguments: args,
    })
}

function create_currency < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: number | TransactionArgument, arg2: U8[] | TransactionArgument, arg3: U8[] | TransactionArgument, arg4: U8[] | TransactionArgument, arg5: Option < Url > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(has_arr(arg2) ? into_arr_bcs_vector((arg2 as U8[])).serialize(into_arr_value((arg2 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg3) ? arg3 : tx.pure(has_arr(arg3) ? into_arr_bcs_vector((arg3 as U8[])).serialize(into_arr_value((arg3 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg4) ? arg4 : tx.pure(has_arr(arg4) ? into_arr_bcs_vector((arg4 as U8[])).serialize(into_arr_value((arg4 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg5) ? arg5 : tx.pure((arg5 as Option < Url > ).serialize((arg5 as Option < Url > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_currency`,
        typeArguments: type_args,
        arguments: args,
    })
}

function create_regulated_currency_v2 < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: number | TransactionArgument, arg2: U8[] | TransactionArgument, arg3: U8[] | TransactionArgument, arg4: U8[] | TransactionArgument, arg5: Option < Url > | TransactionArgument, arg6: boolean | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(has_arr(arg2) ? into_arr_bcs_vector((arg2 as U8[])).serialize(into_arr_value((arg2 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg3) ? arg3 : tx.pure(has_arr(arg3) ? into_arr_bcs_vector((arg3 as U8[])).serialize(into_arr_value((arg3 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg4) ? arg4 : tx.pure(has_arr(arg4) ? into_arr_bcs_vector((arg4 as U8[])).serialize(into_arr_value((arg4 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg5) ? arg5 : tx.pure((arg5 as Option < Url > ).serialize((arg5 as Option < Url > ).into_value())), isTransactionArgument(arg6) ? arg6 : tx.pure(bcs_import.bool().serialize((arg6 as boolean)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_regulated_currency_v2`,
        typeArguments: type_args,
        arguments: args,
    })
}

function migrate_regulated_currency_to_v2 < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: DenyCap | TransactionArgument, arg2: boolean | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as DenyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bool().serialize((arg2 as boolean)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::migrate_regulated_currency_to_v2`,
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

function mint_balance < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::mint_balance`,
        typeArguments: type_args,
        arguments: args,
    })
}

function burn < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::burn`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_add < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: DenyCapV2 | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as DenyCapV2).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: DenyCapV2 | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as DenyCapV2).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_contains_current_epoch(tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_contains_current_epoch`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_contains_next_epoch(tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_contains_next_epoch`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_enable_global_pause < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: DenyCapV2 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as DenyCapV2).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_enable_global_pause`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_disable_global_pause < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: DenyCapV2 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as DenyCapV2).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_disable_global_pause`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_is_global_pause_enabled_current_epoch(tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_is_global_pause_enabled_current_epoch`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_v2_is_global_pause_enabled_next_epoch(tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_v2_is_global_pause_enabled_next_epoch`,
        typeArguments: type_args,
        arguments: args,
    })
}

function mint_and_transfer < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::mint_and_transfer`,
        typeArguments: type_args,
        arguments: args,
    })
}

function update_name < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: CoinMetadata | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as CoinMetadata).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_name`,
        typeArguments: type_args,
        arguments: args,
    })
}

function update_symbol < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: CoinMetadata | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as CoinMetadata).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_symbol`,
        typeArguments: type_args,
        arguments: args,
    })
}

function update_description < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: CoinMetadata | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as CoinMetadata).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_description`,
        typeArguments: type_args,
        arguments: args,
    })
}

function update_icon_url < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument, arg1: CoinMetadata | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as CoinMetadata).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_icon_url`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_decimals < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: CoinMetadata | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as CoinMetadata).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_decimals`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_name < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: CoinMetadata | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as CoinMetadata).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_name`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_symbol < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: CoinMetadata | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as CoinMetadata).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_symbol`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_description < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: CoinMetadata | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as CoinMetadata).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_description`,
        typeArguments: type_args,
        arguments: args,
    })
}

function get_icon_url < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: CoinMetadata | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as CoinMetadata).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_icon_url`,
        typeArguments: type_args,
        arguments: args,
    })
}

function supply < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: TreasuryCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as TreasuryCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::supply`,
        typeArguments: type_args,
        arguments: args,
    })
}

function create_regulated_currency < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: number | TransactionArgument, arg2: U8[] | TransactionArgument, arg3: U8[] | TransactionArgument, arg4: U8[] | TransactionArgument, arg5: Option < Url > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(has_arr(arg2) ? into_arr_bcs_vector((arg2 as U8[])).serialize(into_arr_value((arg2 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg3) ? arg3 : tx.pure(has_arr(arg3) ? into_arr_bcs_vector((arg3 as U8[])).serialize(into_arr_value((arg3 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg4) ? arg4 : tx.pure(has_arr(arg4) ? into_arr_bcs_vector((arg4 as U8[])).serialize(into_arr_value((arg4 as U8[]))) : new Uint8Array([0])), isTransactionArgument(arg5) ? arg5 : tx.pure((arg5 as Option < Url > ).serialize((arg5 as Option < Url > ).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_regulated_currency`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_add < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: DenyCap | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as DenyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: DenyCap | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as DenyCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function deny_list_contains(tx: Transaction, type_args: string[], arg0: DenyList | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as DenyList).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deny_list_contains`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const coin = {
    Coin,
    CoinMetadata,
    RegulatedCoinMetadata,
    TreasuryCap,
    DenyCapV2,
    CurrencyCreated,
    DenyCap,
    take,
    value,
    balance,
    zero,
    join,
    split,
    destroy_zero,
    total_supply,
    treasury_into_supply,
    supply_immut,
    supply_mut,
    balance_mut,
    from_balance,
    into_balance,
    put,
    divide_into_n,
    create_currency,
    create_regulated_currency_v2,
    migrate_regulated_currency_to_v2,
    mint,
    mint_balance,
    burn,
    deny_list_v2_add,
    deny_list_v2_remove,
    deny_list_v2_contains_current_epoch,
    deny_list_v2_contains_next_epoch,
    deny_list_v2_enable_global_pause,
    deny_list_v2_disable_global_pause,
    deny_list_v2_is_global_pause_enabled_current_epoch,
    deny_list_v2_is_global_pause_enabled_next_epoch,
    mint_and_transfer,
    update_name,
    update_symbol,
    update_description,
    update_icon_url,
    get_decimals,
    get_name,
    get_symbol,
    get_description,
    get_icon_url,
    supply,
    create_regulated_currency,
    deny_list_add,
    deny_list_remove,
    deny_list_contains
}