import { getEquippedArmor } from '~/domain/equipment/equipment';
import { DUNGEONEERS_PACK, EXPLORERS_PACK } from '../../equipment/packs';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from '../../equipment/weapons';

export const MONK_EQUIPMENT = [
  {
    or: [WEAPONS.shortsword(), ...getAllSimpleMelee(), ...getAllSimpleRanged()],
  },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
  WEAPONS.dart({ amount: 10 }),
  WEAPONS.martialArts({ amount: 1 }),
];

export function isMonkWeapon(weapon) {
  const {
    name,
    subtype,
    properties: { twoHanded, heavy },
  } = weapon;

  return (
    name === 'shortsword' || (subtype === 'simpleMelee' && !twoHanded && !heavy)
  );
}

export function getMartialArtsDice(pc) {
  const { level } = pc;

  return level >= 17
    ? '1d10'
    : level >= 11
    ? '1d8'
    : level >= 5
    ? '1d6'
    : '1d4';
}

export function getKiPoints(pc) {
  const { level } = pc;

  return level === 1 ? 0 : level > 20 ? 20 : level;
}

export function getExtraUnarmoredMovement(pc) {
  const { level } = pc;

  if (getEquippedArmor(pc)) return 0;

  return [
    /*  1 */ 0, /*  2 */ 3, /*  3 */ 3, /*  4 */ 3, /*  5 */ 3, /*  6 */ 5,
    /*  7 */ 5, /*  8 */ 5, /*  9 */ 5, /* 10 */ 6, /* 11 */ 6, /* 12 */ 6,
    /* 13 */ 6, /* 14 */ 8, /* 15 */ 8, /* 16 */ 8, /* 17 */ 8, /* 18 */ 10,
    /* 19 */ 10, /* 20 */ 10,
  ][level - 1];
}
