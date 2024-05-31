import { LockedLP } from "../generated/lockedLP/lockedLP";
import { LockedLPEvent } from '../generated/schema';
import { Bytes } from "@graphprotocol/graph-ts";

export function handleLPLocking(event: LockedLP): void {
  let id = event.transaction.hash.toHex();

  const newLockedLPEvent = new LockedLPEvent(id);

  newLockedLPEvent.id = id;
  newLockedLPEvent._owner = event.params._owner;
  newLockedLPEvent.tokenId = event.params.tokenId;
  newLockedLPEvent.lockedPeriod = event.params.lockedPeriod;
  newLockedLPEvent.lockerAddress = event.params.lockerAddress;

  newLockedLPEvent.transactionHash = event.transaction.hash;
  
  newLockedLPEvent.save();
}
