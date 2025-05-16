import {
    Bytes32
} from "./bytes32";
import {
    ConsumedVAAs
} from "./consumed_vaas";
import {
    ExternalAddress
} from "./external_address";
import {
    State
} from "./state";
import {
    VAA
} from "./vaa";
import {
    StructClass,
    get_package_address,
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

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "governance_message";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== DecreeTicket =============================== */

export class DecreeTicket implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::DecreeTicket`;

    governance_chain: number;
    governance_contract: ExternalAddress;
    module_name: Bytes32;
    action: number;
    global: boolean;

    constructor(governance_chain: number, governance_contract: ExternalAddress, module_name: Bytes32, action: number, global: boolean) {
        this.governance_chain = governance_chain;
        this.governance_contract = governance_contract;
        this.module_name = module_name;
        this.action = action;
        this.global = global;
    }

    into_value() {
        return {
            governance_chain: (this.governance_chain as unknown as StructClass).into_value ? (this.governance_chain as unknown as StructClass).into_value() : this.governance_chain,
            governance_contract: (this.governance_contract as unknown as StructClass).into_value ? (this.governance_contract as unknown as StructClass).into_value() : this.governance_contract,
            module_name: (this.module_name as unknown as StructClass).into_value ? (this.module_name as unknown as StructClass).into_value() : this.module_name,
            action: (this.action as unknown as StructClass).into_value ? (this.action as unknown as StructClass).into_value() : this.action,
            global: (this.global as unknown as StructClass).into_value ? (this.global as unknown as StructClass).into_value() : this.global
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
        return DecreeTicket.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return DecreeTicket.from_bcs_vector(args)
    }

    get_bcs() {
        return DecreeTicket.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::DecreeTicket`
    }

    from(arg: DecreeTicket) {
        this.governance_chain = arg.governance_chain;
        this.governance_contract = arg.governance_contract;
        this.module_name = arg.module_name;
        this.action = arg.action;
        this.global = arg.global;
    }

    static from_bcs(arg: {
        governance_chain: number,
        governance_contract: ExternalAddress,
        module_name: Bytes32,
        action: number,
        global: boolean
    }): DecreeTicket {
        return new DecreeTicket(arg.governance_chain, arg.governance_contract, arg.module_name, arg.action, arg.global)
    }

    static from_bcs_vector(args: {
        governance_chain: number,
        governance_contract: ExternalAddress,
        module_name: Bytes32,
        action: number,
        global: boolean
    } []): DecreeTicket[] {
        return args.map(function(arg) {
            return new DecreeTicket(arg.governance_chain, arg.governance_contract, arg.module_name, arg.action, arg.global)
        })
    }

    static get bcs() {
        return bcs_import.struct("DecreeTicket", {
            governance_chain: bcs_import.u16(),
            governance_contract: ExternalAddress.bcs,
            module_name: Bytes32.bcs,
            action: bcs_import.u8(),
            global: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new DecreeTicket(val.governance_chain, val.governance_contract, val.module_name, val.action, val.global),
        });
    };
}

/* ============================== DecreeReceipt =============================== */

export class DecreeReceipt implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::DecreeReceipt`;

    payload: number[];
    digest: Bytes32;
    sequence: u64_import;

    constructor(payload: number[], digest: Bytes32, sequence: u64_import) {
        this.payload = payload;
        this.digest = digest;
        this.sequence = sequence;
    }

    into_value() {
        return {
            payload: into_arr_value(this.payload),
            digest: (this.digest as unknown as StructClass).into_value ? (this.digest as unknown as StructClass).into_value() : this.digest,
            sequence: (this.sequence as unknown as StructClass).into_value ? (this.sequence as unknown as StructClass).into_value() : this.sequence
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
        return DecreeReceipt.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return DecreeReceipt.from_bcs_vector(args)
    }

    get_bcs() {
        return DecreeReceipt.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::DecreeReceipt`
    }

    from(arg: DecreeReceipt) {
        this.payload = arg.payload;
        this.digest = arg.digest;
        this.sequence = arg.sequence;
    }

    static from_bcs(arg: {
        payload: number[],
        digest: Bytes32,
        sequence: u64_import
    }): DecreeReceipt {
        return new DecreeReceipt(arg.payload, arg.digest, arg.sequence)
    }

    static from_bcs_vector(args: {
        payload: number[],
        digest: Bytes32,
        sequence: u64_import
    } []): DecreeReceipt[] {
        return args.map(function(arg) {
            return new DecreeReceipt(arg.payload, arg.digest, arg.sequence)
        })
    }

    static get bcs() {
        return bcs_import.struct("DecreeReceipt", {
            payload: bcs_import.vector(bcs_import.u8()),
            digest: Bytes32.bcs,
            sequence: bcs_import.u64(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new DecreeReceipt(val.payload, val.digest, val.sequence),
        });
    };
}

function payload < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DecreeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as DecreeReceipt).serialize((arg0 as DecreeReceipt).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::payload`,
        typeArguments: type_args,
        arguments: args,
    })
}

function sequence < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DecreeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as DecreeReceipt).serialize((arg0 as DecreeReceipt).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::sequence`,
        typeArguments: type_args,
        arguments: args,
    })
}

function take_payload < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: ConsumedVAAs | TransactionArgument, arg1: DecreeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as ConsumedVAAs).serialize((arg0 as ConsumedVAAs).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as DecreeReceipt).serialize((arg1 as DecreeReceipt).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::take_payload`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: DecreeReceipt | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as DecreeReceipt).serialize((arg0 as DecreeReceipt).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy`,
        typeArguments: type_args,
        arguments: args,
    })
}

function authorize_verify_global < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: number | TransactionArgument, arg2: ExternalAddress | TransactionArgument, arg3: Bytes32 | TransactionArgument, arg4: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ExternalAddress).serialize((arg2 as ExternalAddress).into_value())), isTransactionArgument(arg3) ? arg3 : tx.pure((arg3 as Bytes32).serialize((arg3 as Bytes32).into_value())), isTransactionArgument(arg4) ? arg4 : tx.pure(bcs_import.u8().serialize((arg4 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authorize_verify_global`,
        typeArguments: type_args,
        arguments: args,
    })
}

function authorize_verify_local < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: T0 | TransactionArgument, arg1: number | TransactionArgument, arg2: ExternalAddress | TransactionArgument, arg3: Bytes32 | TransactionArgument, arg4: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure((arg0 as T0).serialize((arg0 as T0).into_value())), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u16().serialize((arg1 as number))), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as ExternalAddress).serialize((arg2 as ExternalAddress).into_value())), isTransactionArgument(arg3) ? arg3 : tx.pure((arg3 as Bytes32).serialize((arg3 as Bytes32).into_value())), isTransactionArgument(arg4) ? arg4 : tx.pure(bcs_import.u8().serialize((arg4 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::authorize_verify_local`,
        typeArguments: type_args,
        arguments: args,
    })
}

function verify_vaa < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: State | TransactionArgument, arg1: VAA | TransactionArgument, arg2: DecreeTicket | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as State).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as VAA).serialize((arg1 as VAA).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as DecreeTicket).serialize((arg2 as DecreeTicket).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::verify_vaa`,
        typeArguments: type_args,
        arguments: args,
    })
}

export function deserialize(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::deserialize`,
        arguments: args,
    })
}

export const governance_message = {
    DecreeTicket,
    DecreeReceipt,
    payload,
    sequence,
    take_payload,
    destroy,
    authorize_verify_global,
    authorize_verify_local,
    verify_vaa,
    deserialize
}