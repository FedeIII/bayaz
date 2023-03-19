import { EXPLORERS_PACK } from '../equipment/packs';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from '../equipment/weapons';
import { CLASSES, hasToImproveAbilityScore } from '../characters';

import sheetStyles from '~/components/sheet.module.css';

export function getPrimalPathTraits(pc) {
  const { level, classAttrs: { primalPath } = {} } = pc;

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

export function getPrimalPath(pc) {
  return pc.classAttrs?.primalPath;
}

export function getAspectOfTheBeastTotem(pc) {
  return pc.classAttrs?.aspectOfTheBeast?.totemType;
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
        !pc.classAttrs?.primalPath && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'totemSpirit': {
      const { totemType, animal } = pc.classAttrs?.spiritTotem || {};
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

    case 'abilityScoreImprovement':
      if (!hasToImproveAbilityScore(pc)) {
        return null;
      }
      return (
        <>
          <strong>{trait}</strong>
          <span className={sheetStyles.pendingTrait}>(!)</span>
        </>
      );

    case 'aspectOfTheBeast': {
      const { totemType, animal } = pc.classAttrs?.aspectOfTheBeast || {};
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
      const { totemType, animal } = pc.classAttrs?.totemicAttunement || {};
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
