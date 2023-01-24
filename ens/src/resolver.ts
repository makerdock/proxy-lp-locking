import * as airstack from "../modules/airstack";
import {
  AddrChanged as AddrChangedEvent,
  VersionChanged as VersionChangedEvent,
} from "../generated/Resolver/Resolver";
import { log } from "@graphprotocol/graph-ts";
import { ETHEREUM_MAINNET_ID } from "../modules/airstack/utils";

export function handleAddrChanged(event: AddrChangedEvent): void {
  log.info("handleAddrChanged: node {} addr {} resolver {} txhash {}", [event.params.node.toHexString(), event.params.a.toHexString(), event.address.toHexString(), event.transaction.hash.toHexString()]);
  airstack.domain.trackAddrChangedTransaction(
    ETHEREUM_MAINNET_ID,
    event.logIndex,
    event.address.toHexString(),
    event.params.a.toHexString(),
    event.params.node.toHexString(),
    event.block.number,
    event.block.hash.toHexString(),
    event.block.timestamp,
    event.transaction.hash,
  );
}

export function handleVersionChanged(event: VersionChangedEvent): void {
  log.info("handleVersionChanged: node {} resolver {} txhash {}", [event.params.node.toHexString(), event.address.toHexString(), event.transaction.hash.toHexString()]);
  airstack.domain.trackResolverVersionChange(
    ETHEREUM_MAINNET_ID,
    event.block.number,
    event.block.hash.toHexString(),
    event.block.timestamp,
    event.params.node.toHexString(),
    event.address.toHexString(),
  );
}
