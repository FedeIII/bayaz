import { DIPLOMATS_PACK, ENTERTAINERS_PACK } from '../equipment/packs';
import { ARMORS, getAllMediumArmors } from '../equipment/armors';
import { getAllMusicalInstruments } from '../equipment/tools';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  WEAPONS,
} from '../equipment/weapons';
import { CLASSES, getExpertSkills, getStat, getStatMod } from '../characters';

import sheetStyles from '~/components/sheet.module.css';

export const BARD_EQUIPMENT = [
  { or: [WEAPONS.rapier(), WEAPONS.longsword(), ...getAllSimpleMelee()] },
  { or: [DIPLOMATS_PACK, ENTERTAINERS_PACK] },
  { or: getAllMusicalInstruments() },
  ARMORS.leather(),
  WEAPONS.dagger(),
];

export function getBardCollege(pc) {
  return pc.classAttrs?.bardCollege;
}

export const BARD_COLLEGES = {
  lore: {
    pickSkills: 3,
  },
  valor: {
    proficientItems: [
      ...getAllMediumArmors().map(i => i.name),
      'shield',
      ...getAllMartialMelee().map(i => i.name),
      ...getAllMartialRanged().map(i => i.name),
    ],
  },
};

export function getBardCollegeTraits(pc) {
  const { level, classAttrs: { bardCollege } = {} } = pc;

  return Object.entries(
    Object.entries(CLASSES.bard.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.bardCollege?.[bardCollege]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export function translateBardCollege(bardCollege) {
  if (bardCollege === 'lore') return 'Conocimiento';
  if (bardCollege === 'valor') return 'Valor';
  return 'unknown bard college';
}

export function displayBardTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'bardicInspiration': {
      const { level } = pc;
      const die =
        level >= 15
          ? '1d12'
          : level >= 10
          ? '1d10'
          : level >= 5
          ? '1d8'
          : '1d6';
      return (
        <>
          <u>Inspiración de Bardo:</u> {getStatMod(getStat(pc, 'cha'))} veces al
          día. {die}
        </>
      );
    }

    case 'songOfRest':
      return (
        <>
          <u>{trait}.</u> +{' '}
          {pc.level >= 17
            ? '1d12'
            : pc.level >= 13
            ? '1d10'
            : pc.level >= 9
            ? '1d8'
            : '1d6'}{' '}
          Puntos de Golpe
        </>
      );

    case 'bardCollege':
      return (
        !pc.classAttrs?.bardCollege && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'loreBonusProficiencies':
      return (
        <>
          {trait}
          {!pc.classAttrs?.loreCollegeProficiencies?.length && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
        </>
      );

    case 'expertise':
      return (
        <>
          {trait}
          {!getExpertSkills(pc).length && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
        </>
      );

    default:
  }

  return null;
}
