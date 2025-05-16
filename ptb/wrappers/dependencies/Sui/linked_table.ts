import {
    Option
} from "../MoveStdlib/option";
import {
    UID
} from "./object";
import {
    StructClass,
    TypeArgument,
    get_object_address,
    get_package_address,
    isTransactionArgument,
    to_arr_value,
    u64 as u64_import
} from "@deepmove/sui";
import {
    BcsType,
    bcs as bcs_import
} from "@mysten/sui/bcs";
import {
    Transaction,
    TransactionArgument
} from "@mysten/sui/transactions";

let PACKAGE_NAME: string = "Sui";
let PACKAGE_ADDRESS: string = "0x0000000000000000000000000000000000000000000000000000000000000002";
let MODULE_NAME: string = "linked_table";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== LinkedTable =============================== */

export class LinkedTable < T0 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::LinkedTable`;

    id: UID;
    size ? : u64_import;
    head ? : Option < T0 > ;
    tail ? : Option < T0 > ;

    T0_bcs: any;

    constructor(id: UID, size ? : u64_import, head ? : Option < T0 > , tail ? : Option < T0 > ) {
        this.id = id;
        this.size = size;
        this.head = head;
        this.tail = tail;
    }

    into_value() {
        return {
            id: (this.id as unknown as StructClass).into_value ? (this.id as unknown as StructClass).into_value() : this.id,
            size: (this.size as unknown as StructClass).into_value ? (this.size as unknown as StructClass).into_value() : this.size,
            head: (this.head as unknown as StructClass).into_value ? (this.head as unknown as StructClass).into_value() : this.head,
            tail: (this.tail as unknown as StructClass).into_value ? (this.tail as unknown as StructClass).into_value() : this.tail
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.head) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.head) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.head) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.head) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.head) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return LinkedTable.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return LinkedTable.from_bcs_vector(args)
    }

    get_bcs() {
        return LinkedTable.bcs
    }

    get_value() {
        return this
    }

    $id() {
        return this.id.id.bytes;
    }

    static from_key(key: string) {
        let id = get_object_address(key);
        return new LinkedTable(UID.from_id(id));
    }

    static from_id(id: string) {
        return new LinkedTable(UID.from_id(id));
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::LinkedTable`
    }

    from(arg: LinkedTable < T0 > ) {
        this.id = arg.id;
        this.size = arg.size;
        this.head = arg.head;
        this.tail = arg.tail;
    }

    static from_bcs < T0 extends TypeArgument > (arg: {
        id: UID,
        size: u64_import,
        head: Option < T0 > ,
        tail: Option < T0 >
    }): LinkedTable < T0 > {
        return new LinkedTable(arg.id, arg.size, arg.head, arg.tail)
    }

    static from_bcs_vector < T0 extends TypeArgument > (args: {
        id: UID,
        size: u64_import,
        head: Option < T0 > ,
        tail: Option < T0 >
    } []): LinkedTable < T0 > [] {
        return args.map(function(arg) {
            return new LinkedTable(arg.id, arg.size, arg.head, arg.tail)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0 > (T0: BcsType < T0, input0 > ) =>
            bcs_import.struct(`LinkedTable<${T0.name}>`, {
                id: UID.bcs,
                size: bcs_import.u64(),
                head: Option.bcs(T0),
                tail: Option.bcs(T0),
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new LinkedTable(val.id, val.size, val.head, val.tail),
            });
    };
}

/* ============================== Node =============================== */

export class Node < T0 extends TypeArgument, T1 extends TypeArgument > implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::Node`;

    prev: Option < T0 > ;
    next: Option < T0 > ;
    value: T1;

    T0_bcs: any;
    T1_bcs: any;

    constructor(prev: Option < T0 > , next: Option < T0 > , value: T1) {
        this.prev = prev;
        this.next = next;
        this.value = value;
    }

    into_value() {
        return {
            prev: (this.prev as unknown as StructClass).into_value ? (this.prev as unknown as StructClass).into_value() : this.prev,
            next: (this.next as unknown as StructClass).into_value ? (this.next as unknown as StructClass).into_value() : this.next,
            value: (this.value as StructClass).into_value ? (this.value as StructClass).into_value() : this.value
        }
    }

    from_bcs_vector_t(bytes: Uint8Array) {
        let args = this.from_bcs_vector(bcs_import.vector(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.prev) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        )).parse(bytes));
        var self = this;
        return args.map(function(arg) {
            arg.$type = self.$type;
            return arg;
        })
    }

    from_bcs_t(bytes: Uint8Array) {
        let result = this.from_bcs(this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.prev) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        ).parse(bytes));
        result.$type = this.$type;
        return result;
    }

    serialize(arg: any) {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.prev) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        ).serialize(arg);
    }

    serialize_bcs() {
        return this.get_bcs()(
            this.T0_bcs ? this.T0_bcs : (to_arr_value(this.prev) as StructClass).return_bcs(),
            this.T1_bcs ? this.T1_bcs : (to_arr_value(this.value) as StructClass).return_bcs()
        )
    }

    return_bcs() {
        return this.get_bcs()((to_arr_value(this.prev) as StructClass).get_bcs(), (to_arr_value(this.value) as StructClass).get_bcs())
    }

    from_bcs(arg: any) {
        return Node.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return Node.from_bcs_vector(args)
    }

    get_bcs() {
        return Node.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::Node`
    }

    from(arg: Node < T0, T1 > ) {
        this.prev = arg.prev;
        this.next = arg.next;
        this.value = arg.value;
    }

    static from_bcs < T0 extends TypeArgument,
    T1 extends TypeArgument > (arg: {
        prev: Option < T0 > ,
        next: Option < T0 > ,
        value: T1
    }): Node < T0,
    T1 > {
        return new Node(arg.prev, arg.next, arg.value)
    }

    static from_bcs_vector < T0 extends TypeArgument,
    T1 extends TypeArgument > (args: {
        prev: Option < T0 > ,
        next: Option < T0 > ,
        value: T1
    } []): Node < T0,
    T1 > [] {
        return args.map(function(arg) {
            return new Node(arg.prev, arg.next, arg.value)
        })
    }

    static get bcs() {
        return < T0 extends TypeArgument, input0, T1 extends TypeArgument, input1 > (T0: BcsType < T0, input0 > , T1: BcsType < T1, input1 > ) =>
            bcs_import.struct(`Node<${T0.name}, ${T1.name}>`, {
                prev: Option.bcs(T0),
                next: Option.bcs(T0),
                value: T1,
            }).transform({
                input: (val: any) => {
                    return val
                },
                output: (val) => new Node(val.prev, val.next, val.value),
            });
    };
}

function length < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::length`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow`,
        typeArguments: type_args,
        arguments: args,
    })
}

function push_back < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument, arg2: T1 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_back`,
        typeArguments: type_args,
        arguments: args,
    })
}

function borrow_mut < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::borrow_mut`,
        typeArguments: type_args,
        arguments: args,
    })
}

function pop_back < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pop_back`,
        typeArguments: type_args,
        arguments: args,
    })
}

function destroy_empty < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::destroy_empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function is_empty < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::is_empty`,
        typeArguments: type_args,
        arguments: args,
    })
}

function contains < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::contains`,
        typeArguments: type_args,
        arguments: args,
    })
}

function remove < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::remove`,
        typeArguments: type_args,
        arguments: args,
    })
}

function new_(tx: Transaction, type_args: string[]) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::new`,
        typeArguments: type_args,
        arguments: args,
    })
}

function drop < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::drop`,
        typeArguments: type_args,
        arguments: args,
    })
}

function front < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::front`,
        typeArguments: type_args,
        arguments: args,
    })
}

function back < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::back`,
        typeArguments: type_args,
        arguments: args,
    })
}

function push_front < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument, arg2: T1 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value())), isTransactionArgument(arg2) ? arg2 : tx.pure((arg2 as T1).serialize((arg2 as T1).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::push_front`,
        typeArguments: type_args,
        arguments: args,
    })
}

function prev < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::prev`,
        typeArguments: type_args,
        arguments: args,
    })
}

function next < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument, arg1: T0 | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id()), isTransactionArgument(arg1) ? arg1 : tx.pure((arg1 as T0).serialize((arg1 as T0).into_value()))
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::next`,
        typeArguments: type_args,
        arguments: args,
    })
}

function pop_front < T0 extends StructClass, T1 extends StructClass > (tx: Transaction, type_args: string[], arg0: LinkedTable < T0 > | TransactionArgument) {
    let args: any[] = [
        isTransactionArgument(arg0) ? arg0 : tx.object((arg0 as LinkedTable < T0 > ).$id())
    ]

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::pop_front`,
        typeArguments: type_args,
        arguments: args,
    })
}

export const linked_table = {
    LinkedTable,
    Node,
    length,
    borrow,
    push_back,
    borrow_mut,
    pop_back,
    destroy_empty,
    is_empty,
    contains,
    remove,
    new_,
    drop,
    front,
    back,
    push_front,
    prev,
    next,
    pop_front
}