module multichain_walrus::setup {
    use sui::transfer::{Self};
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};

    use wormhole::bytes32::{Self};
    use wormhole::external_address;
    use multichain_walrus::state::{Self, State};

    const E_INVALID_ADMIN_CAP: u64 = 0;

    /// Capability for admin role actions
    struct AdminCap has key, store {
        id: UID,
        state_id: ID,
    }

    #[allow(lint(self_transfer))]
    public fun create_state(
        ctx: &mut TxContext
    ) {
        let state = state::new(
            ctx
        );

        let admin_cap = AdminCap {
            id: object::new(ctx),
            state_id: state::state_id(&state),
        };

        // Share new state.
        transfer::public_share_object(state);
        transfer::public_transfer(admin_cap, tx_context::sender(ctx));
    }

    public fun set_transceiver_peer(
        cap: &AdminCap,
        state: &mut State,
        peer_chain_id: u16,
        peer_contract: vector<u8>,
    ) {
        assert_admin_cap(cap, state);

        let peer_contract_address = external_address::new(bytes32::from_bytes(peer_contract));
        state::set_transceiver_peer(state, peer_chain_id, peer_contract_address);
    }

    public fun check_transceiver_peer(
        state: &mut State,
        peer_chain_id: u16,
    ): bool {
        state::check_transceiver_peer(state, peer_chain_id)
    }

    fun assert_admin_cap(cap: &AdminCap, state: &State) {
        assert!(cap.state_id == state::state_id(state), E_INVALID_ADMIN_CAP)
    }
}
