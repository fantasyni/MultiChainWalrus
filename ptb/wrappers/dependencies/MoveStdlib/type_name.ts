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

let PACKAGE_NAME: string = "MoveStdlib";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000001";
let MODULE_NAME: string = "type_name";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== TypeName =============================== */

export class TypeName implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::TypeName`;

    name: string;

    constructor(name: string) {
        this.name = name;
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
        return TypeName.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return TypeName.from_bcs_vector(args)
    }

    get_bcs() {
        return TypeName.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::TypeName`
    }

    from(arg: TypeName) {
        this.name = arg.name;
    }

    static from_bcs(arg: {
        name: string
    }): TypeName {
        return new TypeName(arg.name)
    }

    static from_bcs_vector(args: {
        name: string
    } []): TypeName[] {
        return args.map(function(arg) {
            return new TypeName(arg.name)
        })
    }

    static get bcs() {
        return bcs_import.struct("TypeName", {
            name: bcs_import.string(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new TypeName(val.name),
        });
    };
}

export function is_primitive(tx: Transaction, arg0: TypeName | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(TypeName.bcs.serialize((arg0 as TypeName)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_primitive`,
        arguments: args,
    })
}

export function borrow_string(tx: Transaction, arg0: TypeName | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(TypeName.bcs.serialize((arg0 as TypeName)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_string`,
        arguments: args,
    })
}

export function get_address(tx: Transaction, arg0: TypeName | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(TypeName.bcs.serialize((arg0 as TypeName)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_address`,
        arguments: args,
    })
}

export function get_module(tx: Transaction, arg0: TypeName | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(TypeName.bcs.serialize((arg0 as TypeName)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::get_module`,
        arguments: args,
    })
}

export function into_string(tx: Transaction, arg0: TypeName | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.pure(TypeName.bcs.serialize((arg0 as TypeName)))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::into_string`,
        arguments: args,
    })
}

export const type_name = {
    TypeName,
    is_primitive,
    borrow_string,
    get_address,
    get_module,
    into_string
}