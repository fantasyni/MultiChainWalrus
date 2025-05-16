import {
    Option
} from "../MoveStdlib/option";
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
    TransferPolicy
} from "./transfer_policy";
import {
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
let MODULE_NAME: string = "kiosk";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Borrow =============================== */

export class Borrow implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Borrow`;

    kiosk_id: ID;
    item_id: ID;

    constructor(kiosk_id: ID, item_id: ID) {
        this.kiosk_id = kiosk_id;
        this.item_id = item_id;
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
        return Borrow.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Borrow.from_bcs_vector(args)
    }

    get_bcs() {
        return Borrow.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Borrow`
    }

    from(arg: Borrow) {
        this.kiosk_id = arg.kiosk_id;
        this.item_id = arg.item_id;
    }

    static from_bcs(arg: {
        kiosk_id: ID,
        item_id: ID
    }): Borrow {
        return new Borrow(arg.kiosk_id, arg.item_id)
    }

    static from_bcs_vector(args: {
        kiosk_id: ID,
        item_id: ID
    } []): Borrow[] {
        return args.map(function(arg) {
            return new Borrow(arg.kiosk_id, arg.item_id)
        })
    }

    static get bcs() {
        return bcs_import.struct("Borrow", {
            kiosk_id: ID.bcs,
            item_id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Borrow(val.kiosk_id, val.item_id),
        });
    };
}

/* ============================== Kiosk =============================== */

export class Kiosk implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Kiosk`;

    id: UID;
    profits ? : Balance;
    owner ? : string;
    item_count ? : number;
    allow_extensions ? : boolean;

    constructor(id: UID, profits ? : Balance, owner ? : string, item_count ? : number, allow_extensions ? : boolean) {
        this.id = id;
        this.profits = profits;
        this.owner = owner;
        this.item_count = item_count;
        this.allow_extensions = allow_extensions;
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
        return Kiosk.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Kiosk.from_bcs_vector(args)
    }

    get_bcs() {
        return Kiosk.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Kiosk(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Kiosk(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Kiosk`
    }

    from(arg: Kiosk) {
        this.id = arg.id;
        this.profits = arg.profits;
        this.owner = arg.owner;
        this.item_count = arg.item_count;
        this.allow_extensions = arg.allow_extensions;
    }

    static from_bcs(arg: {
        id: UID,
        profits: Balance,
        owner: string,
        item_count: number,
        allow_extensions: boolean
    }): Kiosk {
        return new Kiosk(arg.id, arg.profits, arg.owner, arg.item_count, arg.allow_extensions)
    }

    static from_bcs_vector(args: {
        id: UID,
        profits: Balance,
        owner: string,
        item_count: number,
        allow_extensions: boolean
    } []): Kiosk[] {
        return args.map(function(arg) {
            return new Kiosk(arg.id, arg.profits, arg.owner, arg.item_count, arg.allow_extensions)
        })
    }

    static get bcs() {
        return bcs_import.struct("Kiosk", {
            id: UID.bcs,
            profits: Balance.bcs,
            owner: bcs_import.bytes(32).transform({
                input: (val: string) => fromHEX(val),
                output: (val: Uint8Array) => toHEX(val),
            }),
            item_count: bcs_import.u32(),
            allow_extensions: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Kiosk(val.id, val.profits, val.owner, val.item_count, val.allow_extensions),
        });
    };
}

/* ============================== KioskOwnerCap =============================== */

export class KioskOwnerCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::KioskOwnerCap`;

    id: UID;
    for_ ? : ID;

    constructor(id: UID, for_ ? : ID) {
        this.id = id;
        this.for_ = for_;
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
        return KioskOwnerCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return KioskOwnerCap.from_bcs_vector(args)
    }

    get_bcs() {
        return KioskOwnerCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new KioskOwnerCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new KioskOwnerCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::KioskOwnerCap`
    }

    from(arg: KioskOwnerCap) {
        this.id = arg.id;
        this.for_ = arg.for_;
    }

    static from_bcs(arg: {
        id: UID,
        for_: ID
    }): KioskOwnerCap {
        return new KioskOwnerCap(arg.id, arg.for_)
    }

    static from_bcs_vector(args: {
        id: UID,
        for_: ID
    } []): KioskOwnerCap[] {
        return args.map(function(arg) {
            return new KioskOwnerCap(arg.id, arg.for_)
        })
    }

    static get bcs() {
        return bcs_import.struct("KioskOwnerCap", {
            id: UID.bcs,
            for_: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new KioskOwnerCap(val.id, val.for_),
        });
    };
}

/* ============================== PurchaseCap =============================== */

export class PurchaseCap implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::PurchaseCap`;

    id: UID;
    kiosk_id ? : ID;
    item_id ? : ID;
    min_price ? : u64_import;

    constructor(id: UID, kiosk_id ? : ID, item_id ? : ID, min_price ? : u64_import) {
        this.id = id;
        this.kiosk_id = kiosk_id;
        this.item_id = item_id;
        this.min_price = min_price;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            kiosk_id: (this.kiosk_id as unknown as StructClass).into_value ? (this.kiosk_id as unknown as StructClass).into_value() : this.kiosk_id,
            item_id: (this.item_id as unknown as StructClass).into_value ? (this.item_id as unknown as StructClass).into_value() : this.item_id,
            min_price: (this.min_price as unknown as StructClass).into_value ? (this.min_price as unknown as StructClass).into_value() : this.min_price
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
        return PurchaseCap.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return PurchaseCap.from_bcs_vector(args)
    }

    get_bcs() {
        return PurchaseCap.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new PurchaseCap(UID.from_id(id));
    }

    static from_id(id: string) {
        return new PurchaseCap(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::PurchaseCap`
    }

    from(arg: PurchaseCap) {
        this.id = arg.id;
        this.kiosk_id = arg.kiosk_id;
        this.item_id = arg.item_id;
        this.min_price = arg.min_price;
    }

    static from_bcs(arg: {
        id: UID,
        kiosk_id: ID,
        item_id: ID,
        min_price: u64_import
    }): PurchaseCap {
        return new PurchaseCap(arg.id, arg.kiosk_id, arg.item_id, arg.min_price)
    }

    static from_bcs_vector(args: {
        id: UID,
        kiosk_id: ID,
        item_id: ID,
        min_price: u64_import
    } []): PurchaseCap[] {
        return args.map(function(arg) {
            return new PurchaseCap(arg.id, arg.kiosk_id, arg.item_id, arg.min_price)
        })
    }

    static get bcs() {
        return bcs_import.struct("PurchaseCap", {
            id: UID.bcs,
            kiosk_id: ID.bcs,
            item_id: ID.bcs,
            min_price: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new PurchaseCap(val.id, val.kiosk_id, val.item_id, val.min_price),
        });
    };
}

/* ============================== Item =============================== */

export class Item implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Item`;

    id: ID;

    constructor(id: ID) {
        this.id = id;
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
        return Item.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Item.from_bcs_vector(args)
    }

    get_bcs() {
        return Item.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Item`
    }

    from(arg: Item) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: ID
    }): Item {
        return new Item(arg.id)
    }

    static from_bcs_vector(args: {
        id: ID
    } []): Item[] {
        return args.map(function(arg) {
            return new Item(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("Item", {
            id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Item(val.id),
        });
    };
}

/* ============================== Listing =============================== */

export class Listing implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Listing`;

    id: ID;
    is_exclusive: boolean;

    constructor(id: ID, is_exclusive: boolean) {
        this.id = id;
        this.is_exclusive = is_exclusive;
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
        return Listing.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Listing.from_bcs_vector(args)
    }

    get_bcs() {
        return Listing.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Listing`
    }

    from(arg: Listing) {
        this.id = arg.id;
        this.is_exclusive = arg.is_exclusive;
    }

    static from_bcs(arg: {
        id: ID,
        is_exclusive: boolean
    }): Listing {
        return new Listing(arg.id, arg.is_exclusive)
    }

    static from_bcs_vector(args: {
        id: ID,
        is_exclusive: boolean
    } []): Listing[] {
        return args.map(function(arg) {
            return new Listing(arg.id, arg.is_exclusive)
        })
    }

    static get bcs() {
        return bcs_import.struct("Listing", {
            id: ID.bcs,
            is_exclusive: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Listing(val.id, val.is_exclusive),
        });
    };
}

/* ============================== Lock =============================== */

export class Lock implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Lock`;

    id: ID;

    constructor(id: ID) {
        this.id = id;
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
        return Lock.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Lock.from_bcs_vector(args)
    }

    get_bcs() {
        return Lock.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Lock`
    }

    from(arg: Lock) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: ID
    }): Lock {
        return new Lock(arg.id)
    }

    static from_bcs_vector(args: {
        id: ID
    } []): Lock[] {
        return args.map(function(arg) {
            return new Lock(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("Lock", {
            id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Lock(val.id),
        });
    };
}

/* ============================== ItemListed =============================== */

export class ItemListed implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ItemListed`;

    kiosk: ID;
    id: ID;
    price: u64_import;

    constructor(kiosk: ID, id: ID, price: u64_import) {
        this.kiosk = kiosk;
        this.id = id;
        this.price = price;
    }

    into_value() {
        return {
            kiosk: (this.kiosk as unknown as StructClass).into_value ? (this.kiosk as unknown as StructClass).into_value() : this.kiosk,
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            price: (this.price as unknown as StructClass).into_value ? (this.price as unknown as StructClass).into_value() : this.price
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
        return ItemListed.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ItemListed.from_bcs_vector(args)
    }

    get_bcs() {
        return ItemListed.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ItemListed`
    }

    from(arg: ItemListed) {
        this.kiosk = arg.kiosk;
        this.id = arg.id;
        this.price = arg.price;
    }

    static from_bcs(arg: {
        kiosk: ID,
        id: ID,
        price: u64_import
    }): ItemListed {
        return new ItemListed(arg.kiosk, arg.id, arg.price)
    }

    static from_bcs_vector(args: {
        kiosk: ID,
        id: ID,
        price: u64_import
    } []): ItemListed[] {
        return args.map(function(arg) {
            return new ItemListed(arg.kiosk, arg.id, arg.price)
        })
    }

    static get bcs() {
        return bcs_import.struct("ItemListed", {
            kiosk: ID.bcs,
            id: ID.bcs,
            price: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ItemListed(val.kiosk, val.id, val.price),
        });
    };
}

/* ============================== ItemPurchased =============================== */

export class ItemPurchased implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ItemPurchased`;

    kiosk: ID;
    id: ID;
    price: u64_import;

    constructor(kiosk: ID, id: ID, price: u64_import) {
        this.kiosk = kiosk;
        this.id = id;
        this.price = price;
    }

    into_value() {
        return {
            kiosk: (this.kiosk as unknown as StructClass).into_value ? (this.kiosk as unknown as StructClass).into_value() : this.kiosk,
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            price: (this.price as unknown as StructClass).into_value ? (this.price as unknown as StructClass).into_value() : this.price
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
        return ItemPurchased.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ItemPurchased.from_bcs_vector(args)
    }

    get_bcs() {
        return ItemPurchased.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ItemPurchased`
    }

    from(arg: ItemPurchased) {
        this.kiosk = arg.kiosk;
        this.id = arg.id;
        this.price = arg.price;
    }

    static from_bcs(arg: {
        kiosk: ID,
        id: ID,
        price: u64_import
    }): ItemPurchased {
        return new ItemPurchased(arg.kiosk, arg.id, arg.price)
    }

    static from_bcs_vector(args: {
        kiosk: ID,
        id: ID,
        price: u64_import
    } []): ItemPurchased[] {
        return args.map(function(arg) {
            return new ItemPurchased(arg.kiosk, arg.id, arg.price)
        })
    }

    static get bcs() {
        return bcs_import.struct("ItemPurchased", {
            kiosk: ID.bcs,
            id: ID.bcs,
            price: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ItemPurchased(val.kiosk, val.id, val.price),
        });
    };
}

/* ============================== ItemDelisted =============================== */

export class ItemDelisted implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ItemDelisted`;

    kiosk: ID;
    id: ID;

    constructor(kiosk: ID, id: ID) {
        this.kiosk = kiosk;
        this.id = id;
    }

    into_value() {
        return {
            kiosk: (this.kiosk as unknown as StructClass).into_value ? (this.kiosk as unknown as StructClass).into_value() : this.kiosk,
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
        return ItemDelisted.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ItemDelisted.from_bcs_vector(args)
    }

    get_bcs() {
        return ItemDelisted.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ItemDelisted`
    }

    from(arg: ItemDelisted) {
        this.kiosk = arg.kiosk;
        this.id = arg.id;
    }

    static from_bcs(arg: {
        kiosk: ID,
        id: ID
    }): ItemDelisted {
        return new ItemDelisted(arg.kiosk, arg.id)
    }

    static from_bcs_vector(args: {
        kiosk: ID,
        id: ID
    } []): ItemDelisted[] {
        return args.map(function(arg) {
            return new ItemDelisted(arg.kiosk, arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("ItemDelisted", {
            kiosk: ID.bcs,
            id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ItemDelisted(val.kiosk, val.id),
        });
    };
}

function borrow(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_mut(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function new_(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        arguments: args,
    })
}

export function default_(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::default`,
        arguments: args,
    })
}

function take(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function withdraw(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: Option < u64_import > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(Option.bcs(bcs_import.u64()).serialize((arg2 as Option < u64_import > )))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::withdraw`,
        arguments: args,
    })
}

export function uid(tx: Transaction, arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid`,
        arguments: args,
    })
}

export function uid_mut_as_owner(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_mut_as_owner`,
        arguments: args,
    })
}

export function close_and_withdraw(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::close_and_withdraw`,
        arguments: args,
    })
}

export function set_owner(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_owner`,
        arguments: args,
    })
}

export function set_owner_custom(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bytes(32).transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
        }).serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_owner_custom`,
        arguments: args,
    })
}

function place < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T0).serialize((arg2 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::place`,
        typeArguments: type_args,
        arguments: args,
    })
}

function lock < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: TransferPolicy | TransactionArgument, arg3: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as TransferPolicy).$id()), isTransactionArgument(arg3) ? arg3 : tx.pure((arg3 as T0).serialize((arg3 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::lock`,
        typeArguments: type_args,
        arguments: args,
    })
}

function list(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: ID | TransactionArgument, arg3: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value())), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.u64().serialize((arg3 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::list`,
        typeArguments: type_args,
        arguments: args,
    })
}

function place_and_list < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: T0 | TransactionArgument, arg3: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T0).serialize((arg2 as T0).into_value())), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.u64().serialize((arg3 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::place_and_list`,
        typeArguments: type_args,
        arguments: args,
    })
}

function delist(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::delist`,
        typeArguments: type_args,
        arguments: args,
    })
}

function purchase(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: ID | TransactionArgument, arg2: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as ID).serialize((arg1 as ID).into_value())), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::purchase`,
        typeArguments: type_args,
        arguments: args,
    })
}

function list_with_purchase_cap(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: ID | TransactionArgument, arg3: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value())), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.u64().serialize((arg3 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::list_with_purchase_cap`,
        typeArguments: type_args,
        arguments: args,
    })
}

function purchase_with_cap < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: PurchaseCap | TransactionArgument, arg2: Coin | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as PurchaseCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.object((arg2 as Coin).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::purchase_with_cap`,
        typeArguments: type_args,
        arguments: args,
    })
}

function return_purchase_cap < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: PurchaseCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as PurchaseCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::return_purchase_cap`,
        typeArguments: type_args,
        arguments: args,
    })
}

function lock_internal < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::lock_internal`,
        typeArguments: type_args,
        arguments: args,
    })
}

function place_internal < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::place_internal`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function uid_mut_internal(tx: Transaction, arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_mut_internal`,
        arguments: args,
    })
}

export function has_item(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(ID.bcs.serialize((arg1 as ID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::has_item`,
        arguments: args,
    })
}

function has_item_with_type(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as ID).serialize((arg1 as ID).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::has_item_with_type`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function is_locked(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(ID.bcs.serialize((arg1 as ID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_locked`,
        arguments: args,
    })
}

export function is_listed(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(ID.bcs.serialize((arg1 as ID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_listed`,
        arguments: args,
    })
}

export function is_listed_exclusively(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(ID.bcs.serialize((arg1 as ID)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_listed_exclusively`,
        arguments: args,
    })
}

export function has_access(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::has_access`,
        arguments: args,
    })
}

export function set_allow_extensions(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: boolean | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.bool().serialize((arg2 as boolean)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::set_allow_extensions`,
        arguments: args,
    })
}

export function uid_mut(tx: Transaction, arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uid_mut`,
        arguments: args,
    })
}

export function owner(tx: Transaction, arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::owner`,
        arguments: args,
    })
}

export function item_count(tx: Transaction, arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::item_count`,
        arguments: args,
    })
}

export function profits_amount(tx: Transaction, arg0: Kiosk | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::profits_amount`,
        arguments: args,
    })
}

export function profits_mut(tx: Transaction, arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::profits_mut`,
        arguments: args,
    })
}

function borrow_val(tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: KioskOwnerCap | TransactionArgument, arg2: ID | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.object((arg1 as KioskOwnerCap).$id()), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ID).serialize((arg2 as ID).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_val`,
        typeArguments: type_args,
        arguments: args,
    })
}

function return_val < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Kiosk | TransactionArgument, arg1: T0 | TransactionArgument, arg2: Borrow | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Kiosk).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as Borrow).serialize((arg2 as Borrow).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::return_val`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function kiosk_owner_cap_for(tx: Transaction, arg0: KioskOwnerCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as KioskOwnerCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::kiosk_owner_cap_for`,
        arguments: args,
    })
}

function purchase_cap_kiosk < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: PurchaseCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as PurchaseCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::purchase_cap_kiosk`,
        typeArguments: type_args,
        arguments: args,
    })
}

function purchase_cap_item < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: PurchaseCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as PurchaseCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::purchase_cap_item`,
        typeArguments: type_args,
        arguments: args,
    })
}

function purchase_cap_min_price < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: PurchaseCap | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as PurchaseCap).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::purchase_cap_min_price`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const kiosk = {
    Borrow,
    Kiosk,
    KioskOwnerCap,
    PurchaseCap,
    Item,
    Listing,
    Lock,
    ItemListed,
    ItemPurchased,
    ItemDelisted,
    borrow,
    borrow_mut,
    new_,
    default_,
    take,
    withdraw,
    uid,
    uid_mut_as_owner,
    close_and_withdraw,
    set_owner,
    set_owner_custom,
    place,
    lock,
    list,
    place_and_list,
    delist,
    purchase,
    list_with_purchase_cap,
    purchase_with_cap,
    return_purchase_cap,
    lock_internal,
    place_internal,
    uid_mut_internal,
    has_item,
    has_item_with_type,
    is_locked,
    is_listed,
    is_listed_exclusively,
    has_access,
    set_allow_extensions,
    uid_mut,
    owner,
    item_count,
    profits_amount,
    profits_mut,
    borrow_val,
    return_val,
    kiosk_owner_cap_for,
    purchase_cap_kiosk,
    purchase_cap_item,
    purchase_cap_min_price
}