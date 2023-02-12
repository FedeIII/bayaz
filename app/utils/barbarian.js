import { EXPLORERS_PACK } from './equipment/adventure';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from './equipment/weapons';

export const PRIMAL_PATHS = ['berserker', 'totem-warrior'];

export function translatePrimalPath(primalPath) {
  if (primalPath === 'berserker') return 'Berserker';
  if (primalPath === 'totem-warrior') return 'Guerrero Totémico';
  return 'unknown primal path';
}

export function getPrimalPath(pc) {
  return pc.classAttrs?.primalPath;
}

export const BARBARIAN_EQUIPMENT = [
  { or: getAllMartialMelee() },
  {
    or: [WEAPONS.handaxe({ amount: 2 }), ...getAllSimpleMelee()],
  },
  EXPLORERS_PACK,
  WEAPONS.javelin({ amount: 4 }),
];
