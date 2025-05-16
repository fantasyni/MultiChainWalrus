/// Module: multichainwalrus
module multichain_walrus::multichain_walrus {
    use std::string::{Self, String};
    use multichain_walrus::message_walrus::MessageWalrus;
    use multichain_walrus::message_walrus;
    use multichain_walrus::state;
    use multichain_walrus::state::State;
    use wormhole::vaa::{Self, VAA};

    const E_INVALID_TRANSCEIVER_PEER: u64 = 1;

    struct WalrusMessageRedeemed has drop, copy {
        message: String
    }

    public fun redeem_walrus_message(
        state: &mut State,
        verified_vaa: VAA
    ) {
        // This capability ensures that the current build version is used.
        // First parse and verify VAA using Wormhole. This also consumes the VAA
        // hash to prevent replay.
        vaa::consume(
            state::borrow_mut_consumed_vaas(state),
            &verified_vaa
        );

        // Take emitter info, sequence and payload.
        let _sequence = vaa::sequence(&verified_vaa);
        let (
            emitter_chain,
            emitter_address,
            payload
        ) = vaa::take_emitter_info_and_payload(verified_vaa);

        let transceiver_peer_address = state::get_transceiver_peer_address(state, emitter_chain);
        assert!(transceiver_peer_address == emitter_address, E_INVALID_TRANSCEIVER_PEER);

        let message = message_walrus::parse_message_walrus(payload);

        let (_, message_content) = message_walrus::into_message(message);

        let payload_string = string::utf8(message_content);

        sui::event::emit(WalrusMessageRedeemed {
            message: payload_string
        });
    }
}