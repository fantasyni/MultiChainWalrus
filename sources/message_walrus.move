module multichain_walrus::message_walrus {
    use std::vector::{Self};

    use wormhole::bytes::{Self};
    use wormhole::cursor::{Self};
    use multichain_walrus::bytes4::{Self};

    const E_PAYLOAD_TOO_LONG: u64 = 0;
    const E_INCORRECT_PREFIX: u64 = 1;
    const MESSAGE_WALRUS_PREFIX: vector<u8> = x"9945FF10";

    friend multichain_walrus::multichain_walrus;

    struct MessageWalrus {
        payloadID: u8,
        message: vector<u8>
    }

    public(friend) fun into_message(
        message: MessageWalrus
    ): (u8, vector<u8>) {
        let MessageWalrus {
            payloadID,
            message
        } = message;

        (payloadID, message)
    }

    fun encode_message_walrus(
        message: MessageWalrus
    ): vector<u8> {
        let MessageWalrus {
            payloadID,
            message
        } = message;
        let payload_length: u16 = (vector::length(&message) as u16);

        assert!(payload_length < (((1<<16)-1) as u16), E_PAYLOAD_TOO_LONG);

        let buf: vector<u8> = vector::empty<u8>();

        bytes::push_u8(&mut buf, payloadID);
        // vector::append(&mut buf, MESSAGE_WALRUS_PREFIX);
        bytes::push_u16_be(&mut buf, payload_length);
        vector::append(&mut buf, message);

        buf
    }

    public(friend) fun build_and_encode_message_walrus(
        payloadID: u8,
        message: vector<u8>
    ): vector<u8> {
        let transeiver_message = MessageWalrus {
            payloadID,
            message
        };

        encode_message_walrus(transeiver_message)
    }

    public(friend) fun parse_message_walrus(
        encoded: vector<u8>
    ): MessageWalrus {
        let cur = cursor::new(encoded);

        // let transceiver_prefix = bytes4::take(&mut cur);
        // let transceiver_prefix_bytes = bytes4::to_bytes(transceiver_prefix);
        // assert!(transceiver_prefix_bytes == MESSAGE_WALRUS_PREFIX, E_INCORRECT_PREFIX);

        let payloadID = bytes::take_u8(&mut cur);
        let payload_length = bytes::take_u16_be(&mut cur);
        let payload = bytes::take_bytes(&mut cur, (payload_length as u64));

        cursor::destroy_empty(cur);

        MessageWalrus {
            payloadID,
            message: payload
        }
    }
}
