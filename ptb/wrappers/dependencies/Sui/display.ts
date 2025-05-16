import {
    ID,
    UID
} from "./object";
import {
    Publisher
} from "./package";
import {
    VecMap
} from "./vec_map";
import {
    StructClass,
    get_object_address,
    get_package_address,
    has_arr,
    into_arr_bcs_vector,
    into_arr_value,
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
let MODULE_NAME: string = "display";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== Display =============================== */

export class Display implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Display`;

    id: UID;
    fields ? : VecMap < string,
    string > ;
    version ? : number;

    constructor(id: UID, fields ? : VecMap < string, string > , version ? : number) {
        this.id = id;
        this.fields = fields;
        this.version = version;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            fields: (this.fields as unknown as StructClass).into_value ? (this.fields as unknown as StructClass).into_value() : this.fields,
            version: (this.version as unknown as StructClass).into_value ? (this.version as unknown as StructClass).into_value() : this.version
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
        return Display.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Display.from_bcs_vector(args)
    }

    get_bcs() {
        return Display.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new Display(UID.from_id(id));
    }

    static from_id(id: string) {
        return new Display(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Display`
    }

    from(arg: Display) {
        this.id = arg.id;
        this.fields = arg.fields;
        this.version = arg.version;
    }

    static from_bcs(arg: {
        id: UID,
        fields: VecMap < string,
        string > ,
        version: number
    }): Display {
        return new Display(arg.id, arg.fields, arg.version)
    }

    static from_bcs_vector(args: {
        id: UID,
        fields: VecMap < string,
        string > ,
        version: number
    } []): Display[] {
        return args.map(function(arg) {
            return new Display(arg.id, arg.fields, arg.version)
        })
    }

    static get bcs() {
        return bcs_import.struct("Display", {
            id: UID.bcs,
            fields: VecMap.bcs(bcs_import.string(), bcs_import.string()),
            version: bcs_import.u16(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new Display(val.id, val.fields, val.version),
        });
    };
}

/* ============================== DisplayCreated =============================== */

export class DisplayCreated implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::DisplayCreated`;

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
        return DisplayCreated.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return DisplayCreated.from_bcs_vector(args)
    }

    get_bcs() {
        return DisplayCreated.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::DisplayCreated`
    }

    from(arg: DisplayCreated) {
        this.id = arg.id;
    }

    static from_bcs(arg: {
        id: ID
    }): DisplayCreated {
        return new DisplayCreated(arg.id)
    }

    static from_bcs_vector(args: {
        id: ID
    } []): DisplayCreated[] {
        return args.map(function(arg) {
            return new DisplayCreated(arg.id)
        })
    }

    static get bcs() {
        return bcs_import.struct("DisplayCreated", {
            id: ID.bcs,
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new DisplayCreated(val.id),
        });
    };
}

/* ============================== VersionUpdated =============================== */

export class VersionUpdated implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::VersionUpdated`;

    id: ID;
    version: number;
    fields: VecMap < string,
    string > ;

    constructor(id: ID, version: number, fields: VecMap < string, string > ) {
        this.id = id;
        this.version = version;
        this.fields = fields;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            version: (this.version as unknown as StructClass).into_value ? (this.version as unknown as StructClass).into_value() : this.version,
            fields: (this.fields as unknown as StructClass).into_value ? (this.fields as unknown as StructClass).into_value() : this.fields
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
        return VersionUpdated.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return VersionUpdated.from_bcs_vector(args)
    }

    get_bcs() {
        return VersionUpdated.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::VersionUpdated`
    }

    from(arg: VersionUpdated) {
        this.id = arg.id;
        this.version = arg.version;
        this.fields = arg.fields;
    }

    static from_bcs(arg: {
        id: ID,
        version: number,
        fields: VecMap < string,
        string >
    }): VersionUpdated {
        return new VersionUpdated(arg.id, arg.version, arg.fields)
    }

    static from_bcs_vector(args: {
        id: ID,
        version: number,
        fields: VecMap < string,
        string >
    } []): VersionUpdated[] {
        return args.map(function(arg) {
            return new VersionUpdated(arg.id, arg.version, arg.fields)
        })
    }

    static get bcs() {
        return bcs_import.struct("VersionUpdated", {
            id: ID.bcs,
            version: bcs_import.u16(),
            fields: VecMap.bcs(bcs_import.string(), bcs_import.string()),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new VersionUpdated(val.id, val.version, val.fields),
        });
    };
}

function remove < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument, arg1: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as string).serialize((arg1 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove`,
        typeArguments: type_args,
        arguments: args,
    })
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

function version < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::version`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument, arg1: string | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as string).serialize((arg1 as string).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_with_fields(tx: Transaction, type_args: string[], arg0: Publisher | TransactionArgument, arg1: string[] | TransactionArgument, arg2: string[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as string[])).serialize(into_arr_value((arg1 as string[]))) : new Uint8Array([0])), isTransactionArgument(arg2) ? arg2 : tx.pure(has_arr(arg2) ? into_arr_bcs_vector((arg2 as string[])).serialize(into_arr_value((arg2 as string[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new_with_fields`,
        typeArguments: type_args,
        arguments: args,
    })
}

function create_and_keep(tx: Transaction, type_args: string[], arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_and_keep`,
        typeArguments: type_args,
        arguments: args,
    })
}

function update_version < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::update_version`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_multiple < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument, arg1: string[] | TransactionArgument, arg2: string[] | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure(has_arr(arg1) ? into_arr_bcs_vector((arg1 as string[])).serialize(into_arr_value((arg1 as string[]))) : new Uint8Array([0])), isTransactionArgument(arg2) ? arg2 : tx.pure(has_arr(arg2) ? into_arr_bcs_vector((arg2 as string[])).serialize(into_arr_value((arg2 as string[]))) : new Uint8Array([0]))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_multiple`,
        typeArguments: type_args,
        arguments: args,
    })
}

function edit < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument, arg1: string | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as string).serialize((arg1 as string).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::edit`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_authorized(tx: Transaction, type_args: string[], arg0: Publisher | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Publisher).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_authorized`,
        typeArguments: type_args,
        arguments: args,
    })
}

function fields < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::fields`,
        typeArguments: type_args,
        arguments: args,
    })
}

function create_internal(tx: Transaction, type_args: string[]) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::create_internal`,
        typeArguments: type_args,
        arguments: args,
    })
}

function add_internal < T0 extends StructClass > (tx: Transaction, type_args: string[], arg0: Display | TransactionArgument, arg1: string | TransactionArgument, arg2: string | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as Display).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as string).serialize((arg1 as string).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as string).serialize((arg2 as string).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::add_internal`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const display = {
    Display,
    DisplayCreated,
    VersionUpdated,
    remove,
    new_,
    version,
    add,
    new_with_fields,
    create_and_keep,
    update_version,
    add_multiple,
    edit,
    is_authorized,
    fields,
    create_internal,
    add_internal
}