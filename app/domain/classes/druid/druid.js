import { ARMORS } from '../../equipment/armors';
import { EXPLORERS_PACK } from '../../equipment/packs';
import { getAllDruidicFocus } from '../../equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from '../../equipment/weapons';

export const DRUID_EQUIPMENT = [
  { or: [ARMORS.shield(), ...getAllSimpleMelee(), ...getAllSimpleRanged()] },
  {
    or: [WEAPONS.scimitar(), ...getAllSimpleMelee()],
  },
  ARMORS.leather(),
  EXPLORERS_PACK,
  { or: getAllDruidicFocus() },
];
