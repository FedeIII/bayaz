import { DUNGEONEERS_PACK, EXPLORERS_PACK } from './equipment/packs';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from './equipment/weapons';

export const MONK_EQUIPMENT = [
  {
    or: [WEAPONS.shortsword(), ...getAllSimpleMelee(), ...getAllSimpleRanged()],
  },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
  WEAPONS.dart({ amount: 10 }),
];
