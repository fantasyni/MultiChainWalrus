module multichain_walrus::state {
    use sui::object;
    use sui::event::emit;
    use sui::object::{UID, ID};
    use sui::table::{Self, Table};
    use sui::tx_context::TxContext;

    use wormhole::state::chain_id;
    use wormhole::consumed_vaas::{Self, ConsumedVAAs};
    use wormhole::external_address::{Self, ExternalAddress};

    const E_INVALID_PEER_CHAIN_ID_ZERO: u64 = 0;
    const E_INVALID_PEER_ZERO_ADDRESS: u64 = 1;
    const E_INVALID_PEER_SAME_CHAIN_ID: u64 = 2;

    friend multichain_walrus::multichain_walrus;
    friend multichain_walrus::setup;

    struct State has key, store {
        id: UID,
        transceiver_peers: Table<u16, TransceiverPeer>,
        consumed_vaas: ConsumedVAAs,
    }

    struct TransceiverPeer has copy, store {
        peer_contract: ExternalAddress
    }

    struct TransceiverPeerUpdate has copy, drop {
        chian_id: u16,
        old_peer_contract: ExternalAddress,
        peer_contract: ExternalAddress,
    }

    public(friend) fun new(
        ctx: &mut TxContext
    ): State {
        State {
            id: object::new(ctx),
            transceiver_peers: table::new(ctx),
            consumed_vaas: consumed_vaas::new(ctx),
        }
    }

    public(friend) fun state_id(self: &State): ID {
        object::uid_to_inner(&self.id)
    }

    /// Store `VAA` hash as a way to claim a VAA. This method prevents a VAA
    /// from being replayed.
    public(friend) fun borrow_mut_consumed_vaas(
        self: &mut State
    ): &mut ConsumedVAAs {
        &mut self.consumed_vaas
    }

    public(friend) fun get_transceiver_peer_address(state: &State, chain_id: u16): ExternalAddress {
        table::borrow(&state.transceiver_peers, chain_id).peer_contract
    }

    public(friend) fun check_transceiver_peer(
        state: &State,
        peer_chain_id: u16
    ): bool {
        table::contains(&state.transceiver_peers, peer_chain_id)
    }

    public(friend) fun set_transceiver_peer(
        state: &mut State,
        peer_chain_id: u16,
        peer_contract: ExternalAddress,
    ) {
        assert!(peer_chain_id > 0, E_INVALID_PEER_CHAIN_ID_ZERO);
        assert!(external_address::is_nonzero(&peer_contract), E_INVALID_PEER_ZERO_ADDRESS);
        assert!(peer_chain_id != chain_id(), E_INVALID_PEER_SAME_CHAIN_ID);

        if (table::contains(&state.transceiver_peers, peer_chain_id)) {
            let peer_info = table::borrow_mut(&mut state.transceiver_peers, peer_chain_id);
            emit(TransceiverPeerUpdate {
                chian_id: peer_chain_id,
                old_peer_contract: peer_info.peer_contract,
                peer_contract
            });

            peer_info.peer_contract = peer_contract;
        } else {
            table::add(&mut state.transceiver_peers, peer_chain_id, TransceiverPeer { peer_contract });
        }
    }
}
