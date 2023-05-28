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
