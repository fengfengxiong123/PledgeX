module usdc_faucet::usdc_faucet;
use sui::tx_context::{sender};
use sui::coin::{Self, Coin, TreasuryCap};
use std::option::{none};

public struct USDC_FAUCET has drop{}
#[allow(lint(share_owned))]
fun init (otw: USDC_FAUCET,ctx: &mut TxContext){
    let (treasuryCap, coinMetadata) = coin::create_currency(
        otw,
        10,
        b"USDC",
        b"USDC",
        b"USDC",
        none(),
        ctx,
    );
    transfer::public_transfer(treasuryCap, sender(ctx));
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