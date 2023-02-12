import { SCHOLARS_PACK, DUNGEONEERS_PACK } from './equipment/packs';
import { ARMORS } from './equipment/armors';
import { TOOLS } from './equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from './equipment/weapons';

export const WARLOCK_EQUIPMENT = [
  {
    or: [
      { and: [WEAPONS.lightCrossbow(), TOOLS.crossbowBolts({ amount: 20 })] },
      { or: [...getAllSimpleMelee(), ...getAllSimpleRanged()] },
    ],
  },
  { or: [TOOLS.componentPouch(), TOOLS.arcaneFocus()] },
  { or: [SCHOLARS_PACK, DUNGEONEERS_PACK] },
  ARMORS.leather(),
  { or: getAllSimpleMelee() },
  WEAPONS.dagger({ amount: 2 }),
];
