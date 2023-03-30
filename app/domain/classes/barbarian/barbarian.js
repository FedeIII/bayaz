import { EXPLORERS_PACK } from '../../equipment/packs';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from '../../equipment/weapons';
import { CLASSES } from '../../characters';

import sheetStyles from '~/components/sheet.module.css';

export function getPrimalPath(pc) {
  return pc.classAttrs?.barbarian?.primalPath;
}

export function getSpiritTotem(pc) {
  return pc.classAttrs?.barbarian?.spiritTotem || {};
}

export function getAspectOfTheBeast(pc) {
  return pc.classAttrs?.barbarian?.aspectOfTheBeast || {};
}

export function getAspectOfTheBeastTotem(pc) {
  return getAspectOfTheBeast(pc).totemType;
}

export function getTotemicAttunement(pc) {
  return pc.classAttrs?.barbarian?.totemicAttunement || {};
}

export function getPrimalPathTraits(pc) {
  const { level } = pc;
  const primalPath = getPrimalPath(pc);

  return Object.entries(
    Object.entries(CLASSES.barbarian.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.primalPath?.[primalPath]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export const PRIMAL_PATHS = ['berserker', 'totem-warrior'];

export function translatePrimalPath(primalPath) {
  if (primalPath === 'berserker') return 'Berserker';
  if (primalPath === 'totem-warrior') return 'Guerrero Totémico';
  return 'unknown primal path';
}

export const BARBARIAN_EQUIPMENT = [
  { or: getAllMartialMelee() },
  {
    or: [WEAPONS.handaxe({ amount: 2 }), ...getAllSimpleMelee()],
  },
  EXPLORERS_PACK,
  WEAPONS.javelin({ amount: 4 }),
];

export function displayBarbarianTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'primalPath':
      return (
        !getPrimalPath(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'totemSpirit': {
      const { totemType, animal } = getSpiritTotem(pc);
      return (
        <>
          {trait}
          {!totemType && <span className={sheetStyles.pendingTrait}>(!)</span>}
          {!!animal && (
            <>
              {': '}
              <strong>{animal}</strong>
            </>
          )}
        </>
      );
    }

    case 'aspectOfTheBeast': {
      const { totemType, animal } = getAspectOfTheBeast(pc);
      return (
        <>
          <strong>{trait}</strong>
          {!totemType && <span className={sheetStyles.pendingTrait}>(!)</span>}
          {!!animal && (
            <>
              {': '}
              <strong>{animal}</strong>
            </>
          )}
        </>
      );
    }

    case 'brutalCritical': {
      const { level } = pc;
      return (
        <>
          <u>{trait}:</u>{' '}
          {level >= 17 ? '+3 Dados' : level >= 13 ? '+2 Dados' : '+1 Dado'}
        </>
      );
    }

    case 'totemicAttunement': {
      const { totemType, animal } = getTotemicAttunement(pc);
      return (
        <>
          <strong>{trait}</strong>
          {!totemType && <span className={sheetStyles.pendingTrait}>(!)</span>}
          {!!animal && (
            <>
              {': '}
              <strong>{animal}</strong>
            </>
          )}
        </>
      );
    }

    default:
  }

  return null;
}
