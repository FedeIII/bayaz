import { ARMORS } from './equipment/armors';
import {
  BURGLARS_PACK,
  DUNGEONEERS_PACK,
  EXPLORERS_PACK,
} from './equipment/packs';
import { TOOLS } from './equipment/tools';
import { WEAPONS } from './equipment/weapons';

export const ROGUE_EQUIPMENT = [
  { or: [WEAPONS.rapier(), WEAPONS.shortsword()] },
  { or: [WEAPONS.rapier(), WEAPONS.shortsword()] },
  {
    or: [
      { and: [WEAPONS.shortbow(), TOOLS.arrows({ amount: 20 })] },
      WEAPONS.shortsword(),
    ],
  },
  { or: [BURGLARS_PACK, DUNGEONEERS_PACK, EXPLORERS_PACK] },
  ARMORS.leather(),
  WEAPONS.dagger({ amount: 2 }),
  TOOLS.thievesTools(),
];
