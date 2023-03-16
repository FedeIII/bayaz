import { EXPLORERS_PACK } from '../equipment/packs';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from '../equipment/weapons';

export const BARBARIAN_TRAITS = {
  traits: {
    rage: 'Furia',
    unarmoredDefense: 'Defensa sin armadura',
  },
  leveling: {
    2: {
      traits: {
        recklessAttack: 'Ataque temerario',
        dangerSense: 'Sentido del peligro',
      },
    },
    3: {
      traits: {
        primalPath: 'Senda primaria',
      },
    },
  },
};

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
