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

let PACKAGE_NAME: string = "MoveStdlib";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000001";
let MODULE_NAME: string = "ascii";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== String =============================== */

export class String implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::String`;

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
        return String.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return String.from_bcs_vector(args)
    }

    get_bcs() {
        return String.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::String`
    }

    from(arg: String) {
        this.bytes = arg.bytes;
    }

    static from_bcs(arg: {
        bytes: number[]
    }): String {
        return new String(arg.bytes)
    }

    static from_bcs_vector(args: {
        bytes: number[]
    } []): String[] {
        return args.map(function(arg) {
            return new String(arg.bytes)
        })
    }

    static get bcs() {
        return bcs_import.struct("String", {
            bytes: bcs_import.vector(bcs_import.u8()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new String(val.bytes),
        });
    };
}

/* ============================== Char =============================== */

export class Char implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Char`;

    byte: number;

    constructor(byte: number) {
        this.byte = byte;
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
        return Char.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Char.from_bcs_vector(args)
    }

    get_bcs() {
        return Char.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Char`
    }

    from(arg: Char) {
        this.byte = arg.byte;
    }

    static from_bcs(arg: {
        byte: number
    }): Char {
        return new Char(arg.byte)
    }

    static from_bcs_vector(args: {
        byte: number
    } []): Char[] {
        return args.map(function(arg) {
            return new Char(arg.byte)
        })
    }

    static get bcs() {
        return bcs_import.struct("Char", {
            byte: bcs_import.u8(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Char(val.byte),
        });
    };
}

export function length(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::length`,
        arguments: args,
    })
}

export function append(tx: Transaction, arg0: string | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.string().serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::append`,
        arguments: args,
    })
}

export function is_empty(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_empty`,
        arguments: args,
    })
}

export function index_of(tx: Transaction, arg0: string | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.string().serialize((arg1 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::index_of`,
        arguments: args,
    })
}

export function insert(tx: Transaction, arg0: string | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.string().serialize((arg2 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::insert`,
        arguments: args,
    })
}

export function char(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::char`,
        arguments: args,
    })
}

export function string(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::string`,
        arguments: args,
    })
}

export function try_string(tx: Transaction, arg0: number[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.vector(bcs_import.u8()).serialize((arg0 as number[])))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::try_string`,
        arguments: args,
    })
}

export function all_characters_printable(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::all_characters_printable`,
        arguments: args,
    })
}

export function push_char(tx: Transaction, arg0: string | TransactionArgument, arg1: Char | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string))), isTransactionArgument(arg1) ? arg1 : tx.pure(Char.bcs.serialize((arg1 as Char)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_char`,
        arguments: args,
    })
}

export function pop_char(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pop_char`,
        arguments: args,
    })
}

export function substring(tx: Transaction, arg0: string | TransactionArgument, arg1: u64_import | TransactionArgument, arg2: u64_import | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string))), isTransactionArgument(arg1) ? arg1 : tx.pure(bcs_import.u64().serialize((arg1 as u64_import))), isTransactionArgument(arg2) ? arg2 : tx.pure(bcs_import.u64().serialize((arg2 as u64_import)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::substring`,
        arguments: args,
    })
}

export function as_bytes(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::as_bytes`,
        arguments: args,
    })
}

export function into_bytes(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::into_bytes`,
        arguments: args,
    })
}

export function byte(tx: Transaction, arg0: Char | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(Char.bcs.serialize((arg0 as Char)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::byte`,
        arguments: args,
    })
}

export function is_valid_char(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_valid_char`,
        arguments: args,
    })
}

export function is_printable_char(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_printable_char`,
        arguments: args,
    })
}

export function to_uppercase(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_uppercase`,
        arguments: args,
    })
}

export function to_lowercase(tx: Transaction, arg0: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.string().serialize((arg0 as string)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::to_lowercase`,
        arguments: args,
    })
}

export function char_to_uppercase(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::char_to_uppercase`,
        arguments: args,
    })
}

export function char_to_lowercase(tx: Transaction, arg0: number | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(bcs_import.u8().serialize((arg0 as number)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::char_to_lowercase`,
        arguments: args,
    })
}

export const ascii = {
    String,
    Char,
    length,
    append,
    is_empty,
    index_of,
    insert,
    char,
    string,
    try_string,
    all_characters_printable,
    push_char,
    pop_char,
    substring,
    as_bytes,
    into_bytes,
    byte,
    is_valid_char,
    is_printable_char,
    to_uppercase,
    to_lowercase,
    char_to_uppercase,
    char_to_lowercase
}