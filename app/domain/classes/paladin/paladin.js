import { ARMORS } from '~/domain/equipment/armors';
import { EXPLORERS_PACK, PRIESTS_PACK } from '~/domain/equipment/packs';
import { TOOLS } from '~/domain/equipment/tools';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from '~/domain/equipment/weapons';

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

export const PALADIN_FIGHTING_STYLES = [
  'defense',
  'dueling',
  'great-Weapon-fighting',
  'protection',
];

export function getPaladinFightingStyle(pc) {
  return pc.classAttrs?.paladin?.fightingStyle || null;
}
