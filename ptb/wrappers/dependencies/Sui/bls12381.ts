import {
    Element
} from "./group_ops";
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
let MODULE_NAME: string = "bls12381";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Scalar =============================== */

export class Scalar implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Scalar`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
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
        return Scalar.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Scalar.from_bcs_vector(args)
    }

    get_bcs() {
        return Scalar.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Scalar`
    }

    from(arg: Scalar) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): Scalar {
        return new Scalar(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): Scalar[] {
        return args.map(function(arg) {
            return new Scalar(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("Scalar", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Scalar(val.dummy_field),
        });
    };
}

/* ============================== G1 =============================== */

export class G1 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::G1`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
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
        return G1.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return G1.from_bcs_vector(args)
    }

    get_bcs() {
        return G1.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::G1`
    }

    from(arg: G1) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): G1 {
        return new G1(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): G1[] {
        return args.map(function(arg) {
            return new G1(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("G1", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new G1(val.dummy_field),
        });
    };
}

/* ============================== G2 =============================== */

export class G2 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::G2`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
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
        return G2.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return G2.from_bcs_vector(args)
    }

    get_bcs() {
        return G2.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::G2`
    }

    from(arg: G2) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): G2 {
        return new G2(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): G2[] {
        return args.map(function(arg) {
            return new G2(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("G2", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new G2(val.dummy_field),
        });
    };
}

/* ============================== GT =============================== */

export class GT implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::GT`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
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
        return GT.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return GT.from_bcs_vector(args)
    }

    get_bcs() {
        return GT.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::GT`
    }

    from(arg: GT) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): GT {
        return new GT(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): GT[] {
        return args.map(function(arg) {
            return new GT(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("GT", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new GT(val.dummy_field),
        });
    };
}

/* ============================== UncompressedG1 =============================== */

export class UncompressedG1 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::UncompressedG1`;

    dummy_field: boolean;

    constructor(dummy_field: boolean) {
        this.dummy_field = dummy_field;
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
        return UncompressedG1.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return UncompressedG1.from_bcs_vector(args)
    }

    get_bcs() {
        return UncompressedG1.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::UncompressedG1`
    }

    from(arg: UncompressedG1) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): UncompressedG1 {
        return new UncompressedG1(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): UncompressedG1[] {
        return args.map(function(arg) {
            return new UncompressedG1(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("UncompressedG1", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new UncompressedG1(val.dummy_field),
        });
    };
}

export function pairing(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pairing`,
        arguments: args,
    })
}

export function scalar_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_from_bytes`,
        arguments: args,
    })
}

export function scalar_from_u64(tx: Transaction, arg0: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u64().serialize((arg0 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_from_u64`,
        arguments: args,
    })
}

export function scalar_zero(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_zero`,
        arguments: args,
    })
}

export function scalar_one(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_one`,
        arguments: args,
    })
}

export function scalar_add(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_add`,
        arguments: args,
    })
}

export function scalar_sub(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_sub`,
        arguments: args,
    })
}

export function scalar_mul(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_mul`,
        arguments: args,
    })
}

export function scalar_div(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_div`,
        arguments: args,
    })
}

export function scalar_neg(tx: Transaction, arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_neg`,
        arguments: args,
    })
}

export function scalar_inv(tx: Transaction, arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::scalar_inv`,
        arguments: args,
    })
}

export function g1_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_from_bytes`,
        arguments: args,
    })
}

export function g1_identity(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_identity`,
        arguments: args,
    })
}

export function g1_generator(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_generator`,
        arguments: args,
    })
}

export function g1_add(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_add`,
        arguments: args,
    })
}

export function g1_sub(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_sub`,
        arguments: args,
    })
}

export function g1_mul(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_mul`,
        arguments: args,
    })
}

export function g1_div(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_div`,
        arguments: args,
    })
}

export function g1_neg(tx: Transaction, arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_neg`,
        arguments: args,
    })
}

export function hash_to_g1(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::hash_to_g1`,
        arguments: args,
    })
}

export function g1_multi_scalar_multiplication(tx: Transaction, arg0: Element[] | TransactionArgument, arg1: Element[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(Element.bcs).serialize((arg0 as Element[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(Element.bcs).serialize((arg1 as Element[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_multi_scalar_multiplication`,
        arguments: args,
    })
}

export function g1_to_uncompressed_g1(tx: Transaction, arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g1_to_uncompressed_g1`,
        arguments: args,
    })
}

export function g2_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_from_bytes`,
        arguments: args,
    })
}

export function g2_identity(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_identity`,
        arguments: args,
    })
}

export function g2_generator(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_generator`,
        arguments: args,
    })
}

export function g2_add(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_add`,
        arguments: args,
    })
}

export function g2_sub(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_sub`,
        arguments: args,
    })
}

export function g2_mul(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_mul`,
        arguments: args,
    })
}

export function g2_div(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_div`,
        arguments: args,
    })
}

export function g2_neg(tx: Transaction, arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_neg`,
        arguments: args,
    })
}

export function hash_to_g2(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::hash_to_g2`,
        arguments: args,
    })
}

export function g2_multi_scalar_multiplication(tx: Transaction, arg0: Element[] | TransactionArgument, arg1: Element[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(Element.bcs).serialize((arg0 as Element[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(Element.bcs).serialize((arg1 as Element[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::g2_multi_scalar_multiplication`,
        arguments: args,
    })
}

export function gt_identity(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt_identity`,
        arguments: args,
    })
}

export function gt_generator(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt_generator`,
        arguments: args,
    })
}

export function gt_add(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt_add`,
        arguments: args,
    })
}

export function gt_sub(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt_sub`,
        arguments: args,
    })
}

export function gt_mul(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt_mul`,
        arguments: args,
    })
}

export function gt_div(tx: Transaction, arg0: Element | TransactionArgument, arg1: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element))), isTransactionArgument(arg1) ? arg1 : tx.pure(Element.bcs.serialize((arg1 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt_div`,
        arguments: args,
    })
}

export function gt_neg(tx: Transaction, arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::gt_neg`,
        arguments: args,
    })
}

export function uncompressed_g1_to_g1(tx: Transaction, arg0: Element | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Element.bcs.serialize((arg0 as Element)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uncompressed_g1_to_g1`,
        arguments: args,
    })
}

export function uncompressed_g1_sum(tx: Transaction, arg0: Element[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(Element.bcs).serialize((arg0 as Element[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::uncompressed_g1_sum`,
        arguments: args,
    })
}

export const bls12381 = {
    Scalar,
    G1,
    G2,
    GT,
    UncompressedG1,
    pairing,
    scalar_from_bytes,
    scalar_from_u64,
    scalar_zero,
    scalar_one,
    scalar_add,
    scalar_sub,
    scalar_mul,
    scalar_div,
    scalar_neg,
    scalar_inv,
    g1_from_bytes,
    g1_identity,
    g1_generator,
    g1_add,
    g1_sub,
    g1_mul,
    g1_div,
    g1_neg,
    hash_to_g1,
    g1_multi_scalar_multiplication,
    g1_to_uncompressed_g1,
    g2_from_bytes,
    g2_identity,
    g2_generator,
    g2_add,
    g2_sub,
    g2_mul,
    g2_div,
    g2_neg,
    hash_to_g2,
    g2_multi_scalar_multiplication,
    gt_identity,
    gt_generator,
    gt_add,
    gt_sub,
    gt_mul,
    gt_div,
    gt_neg,
    uncompressed_g1_to_g1,
    uncompressed_g1_sum
}