import { CLASSES } from '~/domain/characters';
import { ARMORS } from '../../equipment/armors';
import { EXPLORERS_PACK } from '../../equipment/packs';
import { getAllDruidicFocus } from '../../equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from '../../equipment/weapons';

export const DRUID_EQUIPMENT = [
  { or: [ARMORS.shield(), ...getAllSimpleMelee(), ...getAllSimpleRanged()] },
  {
    or: [WEAPONS.scimitar(), ...getAllSimpleMelee()],
  },
  ARMORS.leather(),
  EXPLORERS_PACK,
  { or: getAllDruidicFocus() },
];

export const DRUID_CIRCLES = ['land', 'moon'];

export function translateDruidCircle(circle) {
  if (circle === 'land') return 'Círculo de la Tierra';
  if (circle === 'moon') return 'Círculo de la Luna';
  return 'unknown druid circle';
}

export function getDruidCircle(pc) {
  return pc.classAttrs?.druid?.druidCircle || null;
}

export function getDruidCircleTraits(pc) {
  const { level } = pc;
  const druidCircle = getDruidCircle(pc);

  return Object.entries(
    Object.entries(CLASSES.druid.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.druidCircle?.[druidCircle]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export function getBonusCantrip(pc) {
  return (
    (getDruidCircle(pc) === 'land' && pc.classAttrs?.druid?.bonusCantrip) ||
    null
  );
}

export const LAND_CIRCLES = [
  'forest',
  'desert',
  'underdark',
  'arctic',
  'coast',
  'swamp',
  'grassland',
  'mountain',
];

export function translateDruidLandCircle(circle) {
  switch (circle) {
    case 'forest':
      return 'Bosque';
    case 'desert':
      return 'Desierto';
    case 'underdark':
      return 'Infraoscuridad';
    case 'arctic':
      return 'Ártico';
    case 'coast':
      return 'Costa';
    case 'swamp':
      return 'Pantano';
    case 'grassland':
      return 'Pradera';
    case 'mountain':
      return 'Montaña';
  }
}

export function getDruidLandCircle(pc) {
  return pc.classAttrs?.druid?.landCircle || null;
}
