module ns_faucet::ns_faucet;
use sui::tx_context::{sender};
use sui::coin::{Self, Coin, TreasuryCap};
use std::option::{none};

public struct NS_FAUCET has drop{}
#[allow(lint(share_owned))]
fun init (otw: NS_FAUCET,ctx: &mut TxContext){
    let (treasuryCap, coinMetadata) = coin::create_currency(
        otw,
        10,
        b"NS",
        b"NS",
        b"NS",
        none(),
        ctx,
    );
    transfer::public_share_object(treasuryCap);
    transfer::public_share_object(coinMetadata);
}

public entry fun mint<T>(
    cap: &mut TreasuryCap<T>,
    value: u64,
    receiver: address,
    ctx: &mut TxContext)
{
    let mint_coin = coin::mint<T>(
        cap,
        value,
        ctx,
    );
    transfer::public_transfer(mint_coin, receiver);
}

public entry fun burn<T>(
    cap: &mut TreasuryCap<T>,
    input_coin: Coin<T>,
){
    coin::burn<T>(cap, input_coin);
}

