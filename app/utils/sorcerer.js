import { DUNGEONEERS_PACK, EXPLORERS_PACK } from './equipment/packs';
import { getAllArcaneFocus, TOOLS } from './equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from './equipment/weapons';

export const SORCERER_ORIGIN = {
  ['draconic-bloodline']: {
    extraHitPoints: pc => pc.level,
  },
  ['wild-magic']: {},
};

export function translateSorcererOrigin(origin) {
  switch (origin) {
    case 'draconic-bloodline':
      return 'Línea de sangre Dracónica';
    case 'wild-magic':
      return 'Magia Salvaje';

    default:
      return 'unknown sorcerer origin';
  }
}

export function getSorcererOrigin(pc) {
  return pc.classAttrs?.sorcererOrigin;
}

export const DRAGON_ANCESTORS = ['acid', 'cold', 'fire', 'lightning', 'poison'];

export function translateDragonAncestor(ancestor) {
  switch (ancestor) {
    case 'acid':
      return 'Dragón de Ácido';
    case 'cold':
      return 'Dragón de Frío';
    case 'fire':
      return 'Dragón de Fuego';
    case 'lightning':
      return 'Dragón Eléctrico';
    case 'poison':
      return 'Dragón Venenoso';

    default:
      return 'unknown dragon ancestor';
  }
}

export function getDragonAncestor(pc) {
  return pc.classAttrs?.dragonAncestor;
}

export const SORCERER_EQUIPMENT = [
  {
    or: [
      { and: [WEAPONS.lightCrossbow(), TOOLS.crossbowBolts({ amount: 20 })] },
      ...getAllSimpleMelee(),
      ...getAllSimpleRanged(),
    ],
  },
  { or: [TOOLS.componentPouch(), ...getAllArcaneFocus()] },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
];
