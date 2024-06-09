import { LockedLP } from "../../generated/lockedLP/lockedLP";
import { LockedLPEvent } from '../../generated/schema';
import { Bytes } from "@graphprotocol/graph-ts";

export function handleLPLocking(event: LockedLP): void {
  let id = event.params.tokenId.toString();
  
  // Fetch the existing entry with the same tokenId
  let lpLockingEvent = LockedLPEvent.load(id);

  if (lpLockingEvent == null) {
    // If no existing entry, create a new one
    lpLockingEvent = new LockedLPEvent(id);
  } else {
    // If existing entry found, update it
    lpLockingEvent = lpLockingEvent as LockedLPEvent;
  }

  // Set or update the fields 
  lpLockingEvent.id = id;
  lpLockingEvent._owner = event.params._owner;
  lpLockingEvent.tokenId = event.params.tokenId;
  lpLockingEvent.lockedPeriod = event.params.lockedPeriod;
  lpLockingEvent.lockerAddress = event.params.lockerAddress;
  lpLockingEvent.transactionHash = event.transaction.hash;
  lpLockingEvent.released = false;

  // Save the entity
  lpLockingEvent.save();
}
