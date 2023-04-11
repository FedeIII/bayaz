import { ARMORS } from '../../equipment/armors';
import { DUNGEONEERS_PACK, EXPLORERS_PACK } from '../../equipment/packs';
import { TOOLS } from '../../equipment/tools';
import { getAllMartialMelee, WEAPONS } from '../../equipment/weapons';

export const FIGHTING_STYLES = [
  'archery',
  'defense',
  'dueling',
  'great-Weapon-fighting',
  'protection',
  'two-weapon-fighting',
];

export function translateFightingStyle(fightingStyle) {
  switch (fightingStyle) {
    case 'archery':
      return 'A distancia';
    case 'defense':
      return 'Defensa';
    case 'dueling':
      return 'Duelista';
    case 'great-Weapon-fighting':
      return 'Lucha con Arma a dos Manos';
    case 'protection':
      return 'Protección';
    case 'two-weapon-fighting':
      return 'Lucha con Dos Armas';

    default:
      return 'unknown fighting style';
  }
}

export function getFightingStyle(pc) {
  return pc.classAttrs?.fighter?.fightingStyle;
}

export const FIGHTER_EQUIPMENT = [
  {
    or: [
      ARMORS.chainMail(),
      {
        and: [
          ARMORS.leather(),
          WEAPONS.longbow(),
          TOOLS.arrows({ amount: 20 }),
        ],
      },
    ],
  },
  {
    or: [
      ...getAllMartialMelee().map(weapon => [weapon, ARMORS.shield()]),
      ...getAllMartialMelee({ amount: 2 }),
    ],
  },
  {
    or: [
      { and: [WEAPONS.lightCrossbow(), TOOLS.crossbowBolts({ amount: 20 })] },
      WEAPONS.handaxe({ amount: 2 }),
    ],
  },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
];
