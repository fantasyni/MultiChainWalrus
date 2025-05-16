import {
    StructClass,
    get_package_address
} from "@deepmove/sui";
import {
    bcs as bcs_import
} from "@mysten/sui/bcs";
import {
    Transaction
} from "@mysten/sui/transactions";

let PACKAGE_NAME: string = "Wormhole";
let PACKAGE_ADDRESS: string = "0xf47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94";
let MODULE_NAME: string = "version_control";

function do_get_package_address() {
    let package_address: string = get_package_address(PACKAGE_NAME);
    if (package_address) {
        return package_address;
    } else {
        return PACKAGE_ADDRESS;
    }
}

/* ============================== V__0_2_0 =============================== */

export class V__0_2_0 implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::V__0_2_0`;

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
        return V__0_2_0.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return V__0_2_0.from_bcs_vector(args)
    }

    get_bcs() {
        return V__0_2_0.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::V__0_2_0`
    }

    from(arg: V__0_2_0) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): V__0_2_0 {
        return new V__0_2_0(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): V__0_2_0[] {
        return args.map(function(arg) {
            return new V__0_2_0(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("V__0_2_0", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new V__0_2_0(val.dummy_field),
        });
    };
}

/* ============================== V__DUMMY =============================== */

export class V__DUMMY implements StructClass {
    $type: string = `${do_get_package_address()}::${MODULE_NAME}::V__DUMMY`;

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
        return V__DUMMY.from_bcs(arg)
    }

    from_bcs_vector(args: any) {
        return V__DUMMY.from_bcs_vector(args)
    }

    get_bcs() {
        return V__DUMMY.bcs
    }

    get_value() {
        return this
    }

    static $type() {
        return `${do_get_package_address()}::${MODULE_NAME}::V__DUMMY`
    }

    from(arg: V__DUMMY) {
        this.dummy_field = arg.dummy_field;
    }

    static from_bcs(arg: {
        dummy_field: boolean
    }): V__DUMMY {
        return new V__DUMMY(arg.dummy_field)
    }

    static from_bcs_vector(args: {
        dummy_field: boolean
    } []): V__DUMMY[] {
        return args.map(function(arg) {
            return new V__DUMMY(arg.dummy_field)
        })
    }

    static get bcs() {
        return bcs_import.struct("V__DUMMY", {
            dummy_field: bcs_import.bool(),
        }).transform({
            input: (val: any) => {
                return val
            },
            output: (val) => new V__DUMMY(val.dummy_field),
        });
    };
}

export function current_version(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::current_version`,
        arguments: args,
    })
}

export function previous_version(tx: Transaction) {
    let args: any[] = []

    return tx.moveCall({
        target: `${do_get_package_address()}::${MODULE_NAME}::previous_version`,
        arguments: args,
    })
}

export const version_control = {
    V__0_2_0,
    V__DUMMY,
    current_version,
    previous_version
}