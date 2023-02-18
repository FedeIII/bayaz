import { ARMORS } from './equipment/armors';
import { EXPLORERS_PACK, PRIESTS_PACK } from './equipment/packs';
import { TOOLS } from './equipment/tools';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from './equipment/weapons';

export const PALADIN_EQUIPMENT = [
  {
    or: [
      ...getAllMartialMelee().map(weapon => [weapon, ARMORS.shield()]),
      ...getAllMartialMelee({ amount: 2 }),
    ],
  },
  { or: [WEAPONS.javelin({ amount: 5 }), ...getAllSimpleMelee()] },
  { or: [PRIESTS_PACK, EXPLORERS_PACK] },
  ARMORS.chainMail(),
  TOOLS.holySymbol(),
];
