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
let MODULE_NAME: string = "groth16";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Curve =============================== */

export class Curve implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Curve`;

    id: number;

    constructor(id: number) {
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
        return Curve.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Curve.from_bcs_vector(args)
    }

    get_bcs() {
        return Curve.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Curve`
    }

    from(arg: Curve) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: number
    }): Curve {
        return new Curve(arg.id)
    }

    static from_bcs_vector(args: {
        id: number
    } []): Curve[] {
        return args.map(function(arg) {
            return new Curve(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("Curve", {
            id: bcs_import.u8(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Curve(val.id),
        });
    };
}

/* ============================== PreparedVerifyingKey =============================== */

export class PreparedVerifyingKey implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::PreparedVerifyingKey`;

    vk_gamma_abc_g1_bytes: number[];
    alpha_g1_beta_g2_bytes: number[];
    gamma_g2_neg_pc_bytes: number[];
    delta_g2_neg_pc_bytes: number[];

    constructor(vk_gamma_abc_g1_bytes: number[], alpha_g1_beta_g2_bytes: number[], gamma_g2_neg_pc_bytes: number[], delta_g2_neg_pc_bytes: number[]) {
        this.vk_gamma_abc_g1_bytes = vk_gamma_abc_g1_bytes;
        this.alpha_g1_beta_g2_bytes = alpha_g1_beta_g2_bytes;
        this.gamma_g2_neg_pc_bytes = gamma_g2_neg_pc_bytes;
        this.delta_g2_neg_pc_bytes = delta_g2_neg_pc_bytes;
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
        return PreparedVerifyingKey.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return PreparedVerifyingKey.from_bcs_vector(args)
    }

    get_bcs() {
        return PreparedVerifyingKey.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::PreparedVerifyingKey`
    }

    from(arg: PreparedVerifyingKey) {
        this.vk_gamma_abc_g1_bytes = arg.vk_gamma_abc_g1_bytes;
        this.alpha_g1_beta_g2_bytes = arg.alpha_g1_beta_g2_bytes;
        this.gamma_g2_neg_pc_bytes = arg.gamma_g2_neg_pc_bytes;
        this.delta_g2_neg_pc_bytes = arg.delta_g2_neg_pc_bytes;
    }

    static from_bcs(arg: {
        vk_gamma_abc_g1_bytes: number[],
        alpha_g1_beta_g2_bytes: number[],
        gamma_g2_neg_pc_bytes: number[],
        delta_g2_neg_pc_bytes: number[]
    }): PreparedVerifyingKey {
        return new PreparedVerifyingKey(arg.vk_gamma_abc_g1_bytes, arg.alpha_g1_beta_g2_bytes, arg.gamma_g2_neg_pc_bytes, arg.delta_g2_neg_pc_bytes)
    }

    static from_bcs_vector(args: {
        vk_gamma_abc_g1_bytes: number[],
        alpha_g1_beta_g2_bytes: number[],
        gamma_g2_neg_pc_bytes: number[],
        delta_g2_neg_pc_bytes: number[]
    } []): PreparedVerifyingKey[] {
        return args.map(function(arg) {
            return new PreparedVerifyingKey(arg.vk_gamma_abc_g1_bytes, arg.alpha_g1_beta_g2_bytes, arg.gamma_g2_neg_pc_bytes, arg.delta_g2_neg_pc_bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("PreparedVerifyingKey", {
            vk_gamma_abc_g1_bytes: bcs_import.vector(bcs_import.u8()),
            alpha_g1_beta_g2_bytes: bcs_import.vector(bcs_import.u8()),
            gamma_g2_neg_pc_bytes: bcs_import.vector(bcs_import.u8()),
            delta_g2_neg_pc_bytes: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new PreparedVerifyingKey(val.vk_gamma_abc_g1_bytes, val.alpha_g1_beta_g2_bytes, val.gamma_g2_neg_pc_bytes, val.delta_g2_neg_pc_bytes),
        });
    };
}

/* ============================== PublicProofInputs =============================== */

export class PublicProofInputs implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::PublicProofInputs`;

    bytes: number[];

    constructor(bytes: number[]) {
        this.bytes = bytes;
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
        return PublicProofInputs.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return PublicProofInputs.from_bcs_vector(args)
    }

    get_bcs() {
        return PublicProofInputs.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::PublicProofInputs`
    }

    from(arg: PublicProofInputs) {
        this.bytes = arg.bytes;
    }

    static from_bcs(arg: {
        bytes: number[]
    }): PublicProofInputs {
        return new PublicProofInputs(arg.bytes)
    }

    static from_bcs_vector(args: {
        bytes: number[]
    } []): PublicProofInputs[] {
        return args.map(function(arg) {
            return new PublicProofInputs(arg.bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("PublicProofInputs", {
            bytes: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new PublicProofInputs(val.bytes),
        });
    };
}

/* ============================== ProofPoints =============================== */

export class ProofPoints implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::ProofPoints`;

    bytes: number[];

    constructor(bytes: number[]) {
        this.bytes = bytes;
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
        return ProofPoints.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return ProofPoints.from_bcs_vector(args)
    }

    get_bcs() {
        return ProofPoints.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::ProofPoints`
    }

    from(arg: ProofPoints) {
        this.bytes = arg.bytes;
    }

    static from_bcs(arg: {
        bytes: number[]
    }): ProofPoints {
        return new ProofPoints(arg.bytes)
    }

    static from_bcs_vector(args: {
        bytes: number[]
    } []): ProofPoints[] {
        return args.map(function(arg) {
            return new ProofPoints(arg.bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("ProofPoints", {
            bytes: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new ProofPoints(val.bytes),
        });
    };
}

export function bls12381(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::bls12381`,
        arguments: args,
    })
}

export function bn254(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::bn254`,
        arguments: args,
    })
}

export function pvk_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument, arg1: number[] | TransactionArgument, arg2: number[] | TransactionArgument, arg3: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[]))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[]))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg2 as number[]))), isTransactionArgument(arg3) ? arg3 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg3 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pvk_from_bytes`,
        arguments: args,
    })
}

export function pvk_to_bytes(tx: Transaction, arg0: PreparedVerifyingKey | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(PreparedVerifyingKey.bcs.serialize((arg0 as PreparedVerifyingKey)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pvk_to_bytes`,
        arguments: args,
    })
}

export function public_proof_inputs_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::public_proof_inputs_from_bytes`,
        arguments: args,
    })
}

export function proof_points_from_bytes(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::proof_points_from_bytes`,
        arguments: args,
    })
}

export function prepare_verifying_key(tx: Transaction, arg0: Curve | TransactionArgument, arg1: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Curve.bcs.serialize((arg0 as Curve))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg1 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::prepare_verifying_key`,
        arguments: args,
    })
}

export function verify_groth16_proof(tx: Transaction, arg0: Curve | TransactionArgument, arg1: PreparedVerifyingKey | TransactionArgument, arg2: PublicProofInputs | TransactionArgument, arg3: ProofPoints | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Curve.bcs.serialize((arg0 as Curve))), isTransactionArgument(arg1) ? arg1 : tx.pure(PreparedVerifyingKey.bcs.serialize((arg1 as PreparedVerifyingKey))), isTransactionArgument(arg2) ? arg2 : tx.pure(PublicProofInputs.bcs.serialize((arg2 as PublicProofInputs))), isTransactionArgument(arg3) ? arg3 : tx.pure(ProofPoints.bcs.serialize((arg3 as ProofPoints)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::verify_groth16_proof`,
        arguments: args,
    })
}

export const groth16 = {
    Curve,
    PreparedVerifyingKey,
    PublicProofInputs,
    ProofPoints,
    bls12381,
    bn254,
    pvk_from_bytes,
    pvk_to_bytes,
    public_proof_inputs_from_bytes,
    proof_points_from_bytes,
    prepare_verifying_key,
    verify_groth16_proof
}