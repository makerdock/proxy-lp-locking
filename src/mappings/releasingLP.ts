import { ERC721Released } from "../../generated/templates/LpLocker/lpLocker";
import { ERC721ReleasedEvent, LockedLPEvent } from '../../generated/schema';


export function handleLpRelease(event: ERC721Released): void {
  const id = event.params.amount.toString();
  
  // Fetch the existing entry with the same tokenId
    const lpLockingEvent = LockedLPEvent.load(id);
    const releasingEvent = new ERC721ReleasedEvent(id)

    if (lpLockingEvent != null) {
        lpLockingEvent.released = true;

        lpLockingEvent.save();
    }

    releasingEvent.amount = event.params.amount;
    releasingEvent.token = event.params.token;

  // Save the entity
  releasingEvent.save();
}
