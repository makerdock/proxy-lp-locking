import { deployed } from "../../generated/lockedLP/lockedLP";
import { LockedLPEvent } from '../../generated/schema';
import { Bytes } from "@graphprotocol/graph-ts";

export function handleLPLocking(event: deployed): void {
  let id = event.params.tokenId.toString();
  
  const lpLockingEvent = new LockedLPEvent(id);

  // Set or update the fields 
  lpLockingEvent.id = id;
  lpLockingEvent.owner = event.params.owner;
  lpLockingEvent.tokenId = event.params.tokenId;
  lpLockingEvent.lockingPeriod = event.params.lockingPeriod;
  lpLockingEvent.lockerAddress = event.params.lockerAddress;
  lpLockingEvent.transactionHash = event.transaction.hash;
  lpLockingEvent.released = false;

  // Save the entity
  lpLockingEvent.save();
}
