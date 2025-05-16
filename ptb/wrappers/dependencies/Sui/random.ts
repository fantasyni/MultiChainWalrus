import {
    UID
} from "./object";
import {
    Versioned
} from "./versioned";
import {
    StructClass,
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

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "random";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Random =============================== */

export class Random implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Random`;

    id: UID;
    inner ? : Versioned;

    constructor(id: UID, inner ? : Versioned) {
        this.id = id;
        this.inner = inner;
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
        return Random.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Random.from_bcs_vector(args)
    }

    get_bcs() {
        return Random.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Random(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Random(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Random`
    }

    from(arg: Random) {
        this.id = arg.id;
        this.inner = arg.inner;
    }

    static from_bcs(arg: {
        id: UID,
        inner: Versioned
    }): Random {
        return new Random(arg.id, arg.inner)
    }

    static from_bcs_vector(args: {
        id: UID,
        inner: Versioned
    } []): Random[] {
        return args.map(function(arg) {
            return new Random(arg.id, arg.inner)
        })
    }

    static get bcs() {
        return bcs_import.struct("Random", {
            id: UID.bcs,
            inner: Versioned.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Random(val.id, val.inner),
        });
    };
}

/* ============================== RandomInner =============================== */

export class RandomInner implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::RandomInner`;

    version: u64_import;
    epoch: u64_import;
    randomness_round: u64_import;
    random_bytes: number[];

    constructor(version: u64_import, epoch: u64_import, randomness_round: u64_import, random_bytes: number[]) {
        this.version = version;
        this.epoch = epoch;
        this.randomness_round = randomness_round;
        this.random_bytes = random_bytes;
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
        return RandomInner.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return RandomInner.from_bcs_vector(args)
    }

    get_bcs() {
        return RandomInner.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::RandomInner`
    }

    from(arg: RandomInner) {
        this.version = arg.version;
        this.epoch = arg.epoch;
        this.randomness_round = arg.randomness_round;
        this.random_bytes = arg.random_bytes;
    }

    static from_bcs(arg: {
        version: u64_import,
        epoch: u64_import,
        randomness_round: u64_import,
        random_bytes: number[]
    }): RandomInner {
        return new RandomInner(arg.version, arg.epoch, arg.randomness_round, arg.random_bytes)
    }

    static from_bcs_vector(args: {
        version: u64_import,
        epoch: u64_import,
        randomness_round: u64_import,
        random_bytes: number[]
    } []): RandomInner[] {
        return args.map(function(arg) {
            return new RandomInner(arg.version, arg.epoch, arg.randomness_round, arg.random_bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("RandomInner", {
            version: bcs_import.u64(),
            epoch: bcs_import.u64(),
            randomness_round: bcs_import.u64(),
            random_bytes: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new RandomInner(val.version, val.epoch, val.randomness_round, val.random_bytes),
        });
    };
}

/* ============================== RandomGenerator =============================== */

export class RandomGenerator implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::RandomGenerator`;

    seed: number[];
    counter: number;
    buffer: number[];

    constructor(seed: number[], counter: number, buffer: number[]) {
        this.seed = seed;
        this.counter = counter;
        this.buffer = buffer;
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
        return RandomGenerator.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return RandomGenerator.from_bcs_vector(args)
    }

    get_bcs() {
        return RandomGenerator.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::RandomGenerator`
    }

    from(arg: RandomGenerator) {
        this.seed = arg.seed;
        this.counter = arg.counter;
        this.buffer = arg.buffer;
    }

    static from_bcs(arg: {
        seed: number[],
        counter: number,
        buffer: number[]
    }): RandomGenerator {
        return new RandomGenerator(arg.seed, arg.counter, arg.buffer)
    }

    static from_bcs_vector(args: {
        seed: number[],
        counter: number,
        buffer: number[]
    } []): RandomGenerator[] {
        return args.map(function(arg) {
            return new RandomGenerator(arg.seed, arg.counter, arg.buffer)
        })
    }

    static get bcs() {
        return bcs_import.struct("RandomGenerator", {
            seed: bcs_import.vector(bcs_import.u8()),
            counter: bcs_import.u16(),
            buffer: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new RandomGenerator(val.seed, val.counter, val.buffer),
        });
    };
}

export function create(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create`,
        arguments: args,
    })
}

export function load_inner_mut(tx: Transaction, arg0: Random | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Random).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::load_inner_mut`,
        arguments: args,
    })
}

export function load_inner(tx: Transaction, arg0: Random | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Random).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::load_inner`,
        arguments: args,
    })
}

export function update_randomness_state(tx: Transaction, arg0: Random | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Random).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_randomness_state`,
        arguments: args,
    })
}

export function new_generator(tx: Transaction, arg0: Random | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Random).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_generator`,
        arguments: args,
    })
}

export function derive_next_block(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::derive_next_block`,
        arguments: args,
    })
}

export function generate_bytes(tx: Transaction, arg0: RandomGenerator | TransactionArgument, arg1: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_bytes`,
        arguments: args,
    })
}

export function generate_u256(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u256`,
        arguments: args,
    })
}

export function generate_u128(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u128`,
        arguments: args,
    })
}

export function generate_u64(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u64`,
        arguments: args,
    })
}

export function generate_u32(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u32`,
        arguments: args,
    })
}

export function generate_u16(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u16`,
        arguments: args,
    })
}

export function generate_u8(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u8`,
        arguments: args,
    })
}

export function generate_bool(tx: Transaction, arg0: RandomGenerator | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_bool`,
        arguments: args,
    })
}

export function generate_u128_in_range(tx: Transaction, arg0: RandomGenerator | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u128().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u128().serialize((arg2 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u128_in_range`,
        arguments: args,
    })
}

export function generate_u64_in_range(tx: Transaction, arg0: RandomGenerator | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u64().serialize((arg2 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u64_in_range`,
        arguments: args,
    })
}

export function generate_u32_in_range(tx: Transaction, arg0: RandomGenerator | TransactionArgument, arg1: number | TransactionArgument, arg2: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u32().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u32().serialize((arg2 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u32_in_range`,
        arguments: args,
    })
}

export function generate_u16_in_range(tx: Transaction, arg0: RandomGenerator | TransactionArgument, arg1: number | TransactionArgument, arg2: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u16().serialize((arg2 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u16_in_range`,
        arguments: args,
    })
}

export function generate_u8_in_range(tx: Transaction, arg0: RandomGenerator | TransactionArgument, arg1: number | TransactionArgument, arg2: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(RandomGenerator.bcs.serialize((arg0 as RandomGenerator))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u8().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u8().serialize((arg2 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::generate_u8_in_range`,
        arguments: args,
    })
}

function shuffle < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: RandomGenerator | TransactionArgument, arg1: T0[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as RandomGenerator).serialize((arg0 as RandomGenerator).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as T0[])).serialize(into_arr_value((arg1 as T0[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::shuffle`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const random = {
    Random,
    RandomInner,
    RandomGenerator,
    create,
    load_inner_mut,
    load_inner,
    update_randomness_state,
    new_generator,
    derive_next_block,
    generate_bytes,
    generate_u256,
    generate_u128,
    generate_u64,
    generate_u32,
    generate_u16,
    generate_u8,
    generate_bool,
    generate_u128_in_range,
    generate_u64_in_range,
    generate_u32_in_range,
    generate_u16_in_range,
    generate_u8_in_range,
    shuffle
}