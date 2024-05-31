import { NewToken } from "../generated/tokenLaunchpad/tokenLaunchpad";
import { NewTokenEvent } from '../generated/schema';
import { Bytes } from "@graphprotocol/graph-ts";

export function handleLPLocking(event: NewToken): void {
  let id = event.transaction.hash.toHex();

  const newTokenEvent = new NewTokenEvent(id);

  newTokenEvent.id = id;
  newTokenEvent.tokenAddress = event.params.tokenAddress;
  newTokenEvent.tokenName = event.params.tokenName;
  newTokenEvent.tokenSymbol = event.params.tokenSymbol;
  newTokenEvent.maxSupply = event.params.maxSupply;
  newTokenEvent.creator = event.params.creator;

  newTokenEvent.timestamp = event.block.timestamp;
  newTokenEvent.transactionHash = event.transaction.hash;
  
  newTokenEvent.save();
}
