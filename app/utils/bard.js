import { DIPLOMATS_PACK, ENTERTAINERS_PACK } from './equipment/packs';
import { ARMORS } from './equipment/armors';
import { getAllMusicalInstruments } from './equipment/tools';
import { getAllSimpleMelee, WEAPONS } from './equipment/weapons';

export const BARD_EQUIPMENT = [
  { or: [WEAPONS.rapier(), WEAPONS.longsword(), ...getAllSimpleMelee()] },
  { or: [DIPLOMATS_PACK, ENTERTAINERS_PACK] },
  { or: getAllMusicalInstruments() },
  ARMORS.leather(),
  WEAPONS.dagger(),
];
